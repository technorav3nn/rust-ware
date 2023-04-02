use std::os::unix::prelude::PermissionsExt;

use futures_util::{StreamExt, TryStreamExt};
use sw_auth::AuthCodes;
use sysinfo::{Pid, ProcessExt, System, SystemExt};
use tauri::Manager;
use tokio::sync::Mutex;
use tokio::{fs, io::AsyncWriteExt};

use crate::exploit::injection::Injector;
use crate::{
    exploit::{
        auth::authenticate_user,
        injection::{get_roblox_processes, Process},
    },
    state::AuthState,
};

lazy_static! {
    static ref SYS_INFO: Mutex<System> = {
        let unsafe_sys_info = System::new_all();
        Mutex::new(unsafe_sys_info)
    };
}

#[derive(Clone, serde::Serialize)]
struct LoadingPayload {
    progress: u64,
    size: u64,
}

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

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
            AuthCodes::UnknownError => Err("Unknown error.".to_string()),

            // this should never happen
            _ => unreachable!(),
        },
    }
}

#[tauri::command]
pub async fn try_inject(pid: u32, args: Vec<String>) -> Result<(), String> {
    if let Err(why) = Injector::inject(pid.try_into().unwrap(), args) {
        return Err(why.to_string());
    }
    Ok(())
}

#[tauri::command]
pub async fn get_processes() -> Result<Vec<Process>, String> {
    let processes = get_roblox_processes();
    println!("{:?}", processes);

    Ok(processes)
}

fn convert_error(_err: reqwest::Error) -> std::io::Error {
    todo!();
}

// this was so hard to replicate
#[tauri::command]
pub async fn download_file(
    app_handle: tauri::AppHandle,
    url: &str,
    file_path: &str,
    file_name_alias: &str,
) -> Result<(), String> {
    let response = reqwest::get(url).await.map_err(|e| e.to_string())?;
    let size = response.content_length().unwrap_or(0);

    let mut progress: u64 = 0;

    println!("{}", size);
    println!("{:?}", response);

    // stream the bytes into the file_path
    let mut dest = fs::File::create(format!("{}", file_path))
        .await
        .map_err(|e| e.to_string())?;

    let mut stream = response.bytes_stream().map_err(convert_error);

    while let Some(item) = stream.next().await {
        let bytes = item.map_err(|e| e.to_string())?;

        dest.write_all(&bytes).await.map_err(|e| e.to_string())?;
        progress += bytes.len() as u64;

        println!("Downloading {file_name_alias}, {progress} / {size}",);

        if progress == 0 || progress == size || progress % 15 == 0 {
            app_handle
                .emit_all("download_file_loading", LoadingPayload { progress, size })
                .unwrap();
        }
    }

    // make it executable
    fs::set_permissions(file_path, PermissionsExt::from_mode(0o777))
        .await
        .unwrap();

    Ok(())
}

#[tauri::command]
pub async fn kill_process(pid: usize) -> Result<(), String> {
    // kill the process

    SYS_INFO
        .lock()
        .await
        .process(Pid::from(pid))
        .unwrap()
        .kill();

    Ok(())
}
