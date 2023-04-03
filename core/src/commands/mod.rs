mod auth;
mod download;
mod inject;
mod process;

pub use auth::*;
pub use download::*;
pub use inject::*;
pub use process::*;

#[tauri::command]
pub async fn get_version() -> Result<String, String> {
    Ok(env!("CARGO_PKG_VERSION").to_string())
}

#[tauri::command]
pub async fn greet(name: String) -> Result<String, String> {
    Ok(format!("Hello {}!", name))
}
