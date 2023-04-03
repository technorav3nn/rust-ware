use std::os::unix::prelude::PermissionsExt;

use futures_util::{StreamExt, TryStreamExt};
use tokio::{fs, io::AsyncWriteExt};

use serde::Serialize;
use tauri::Manager;

#[derive(Clone, Serialize)]
struct LoadingPayload {
    progress: u64,
    size: u64,
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

    debug!("[DownloadFile] Downloading {file_name_alias} to {file_path}, {size} bytes");

    // stream the bytes into the file_path
    let mut dest = fs::File::create(format!("{}", file_path))
        .await
        .map_err(|e| e.to_string())?;

    let mut stream = response.bytes_stream().map_err(convert_error);

    while let Some(item) = stream.next().await {
        let bytes = item.map_err(|e| e.to_string())?;

        dest.write_all(&bytes).await.map_err(|e| e.to_string())?;
        progress += bytes.len() as u64;

        if progress == 0 || progress == size || progress % 15 == 0 {
            app_handle
                .emit_all("download_file_loading", LoadingPayload { progress, size })
                .unwrap();
        }
    }

    debug!("[DownloadFile] Successfully downloaded {file_name_alias} to {file_path}");

    // make it executable
    fs::set_permissions(file_path, PermissionsExt::from_mode(0o777))
        .await
        .unwrap();

    Ok(())
}
