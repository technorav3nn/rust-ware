use std::{
    fs::{self, File},
    io::Write,
    os::unix::prelude::PermissionsExt,
    sync::Mutex,
};

use base64::{engine::general_purpose, Engine};
use sw_auth::{AuthCodes, Authenticator};
use tauri::api::process::{Command, Output};

use crate::util::consts;

lazy_static! {
    static ref AUTH: Mutex<Authenticator> = {
        let unsafe_auth = sw_auth::Authenticator::new();
        Mutex::new(unsafe_auth)
    };
}

pub fn authenticate_user(username: &str, password: &str) -> Result<String, AuthCodes> {
    let enc_username = general_purpose::STANDARD.encode(username.as_bytes());
    let enc_password = general_purpose::STANDARD.encode(password.as_bytes());

    // TODO: Handle 2FA
    let Output { stdout, .. } = Command::new_sidecar("SWMAuth2")
        .expect("failed to create auth")
        .args(&[enc_username, enc_password])
        .output()
        .expect("failed to run auth");

    let auth = AUTH.lock().unwrap();

    match auth.authenticate(stdout) {
        Ok((success, code, token)) => {
            if success {
                debug!("[Auth] Attempting Authentication...");
                if let Err(why) = write_to_auth_file(&token) {
                    error!("[Auth] Error writing to auth file: {:?}", why);

                    return Err(AuthCodes::UnknownError(
                        "Error writing to auth file".to_string(),
                    ));
                }
                debug!("[Auth] Successfully authenticated!");

                return Ok(token);
            }

            Err(code)
        }
        Err(e) => {
            error!("[Auth] Error in auth with code: {:?}", e);
            Err(e)
        }
    }
}

fn write_to_auth_file(token: &str) -> anyhow::Result<()> {
    let mut file = File::create(consts::SW_IPC_AUTH_PATH)?;
    file.write_all(token.as_bytes())?;

    fs::set_permissions(consts::SW_IPC_AUTH_PATH, fs::Permissions::from_mode(0o777))?;

    Ok(())
}
