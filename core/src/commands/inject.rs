use crate::core::injection::inject;

#[tauri::command]
pub async fn try_inject(pid: u32, args: Vec<String>) -> Result<(), String> {
    if let Err(why) = inject(pid.try_into().unwrap(), args) {
        return Err(why.to_string());
    }
    Ok(())
}
