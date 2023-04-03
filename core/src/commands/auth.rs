use sw_auth::AuthCodes;

use crate::core::{auth::authenticate_user, state::AuthState};

#[tauri::command]
pub async fn authenticate(
    username: &str,
    password: &str,
    state: tauri::State<'_, AuthState>,
) -> Result<String, String> {
    match authenticate_user(username, password) {
        Ok(token) => {
            state.set_token(token.clone());
            Ok(token)
        }
        Err(code) => match code {
            //
            AuthCodes::AccountBlacklisted => {
                Err("Account is blacklisted! 🤓💀💀💀💀💀💀 retard".to_string())
            }
            AuthCodes::BadCredentials => Err("Incorrect username or password!".to_string()),
            AuthCodes::BadServerResponse => {
                Err("Bad server response! Please contact the developers.".to_string())
            }
            AuthCodes::BadSystemTime => {
                Err("Bad system time! Please check if your system time is correct!".to_string())
            }
            AuthCodes::Emergency => Err(
                "Emergency! Script-Ware is in emergency mode. Please wait until it is unlocked."
                    .to_string(),
            ),
            AuthCodes::HwidChanged => Err("HWID changed, please wait 24 hours".to_string()),
            AuthCodes::InternalServerError => {
                Err("Internal server error with Script-Ware API".to_string())
            }
            AuthCodes::NoSavedLogin => Err("No saved login".to_string()),
            AuthCodes::TooManySystemChanges => {
                Err("Too many system changes! Please wait 24 hrs.".to_string())
            }
            AuthCodes::UnknownError(error) => Err(format!("Unknown error: {error}").to_string()),

            // this should never happen
            _ => unreachable!(),
        },
    }
}
