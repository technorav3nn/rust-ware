use std::os::unix::prelude::PermissionsExt;

use futures_util::{StreamExt, TryStreamExt};
use tauri::Manager;
use tokio::{fs, io::AsyncWriteExt};

use crate::exploit::{
    auth::authenticate_user,
    injection::{get_roblox_processes, Process},
};

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
pub fn authenticate(username: &str, password: &str) -> Result<(), String> {
    authenticate_user(username, password);
    Ok(())
}

#[tauri::command]
pub fn get_processes() -> Result<Vec<Process>, String> {
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
