use sysinfo::{Pid, ProcessExt, SystemExt};

use crate::{
    core::injection::{get_roblox_processes, Process},
    util::consts::SYS_INFO,
};

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

#[tauri::command]
pub async fn get_processes() -> Result<Vec<Process>, String> {
    let processes = get_roblox_processes();

    Ok(processes)
}
