use std::{
    process::{Child, Command, Stdio},
    sync::Mutex,
};

use anyhow::bail;
use serde::{Deserialize, Serialize};
use sysinfo::{Pid, PidExt, ProcessExt, System, SystemExt};

lazy_static! {
    static ref SYS_INFO: Mutex<System> = {
        let unsafe_sys_info = System::new_all();
        Mutex::new(unsafe_sys_info)
    };
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Process {
    pub pid: u32,
    pub command: String,
    pub arguments: Vec<String>,
}

pub fn inject(pid: usize, args: Vec<String>) -> anyhow::Result<Child> {
    let mut sys = SYS_INFO.lock().unwrap();
    sys.refresh_processes();

    match sys.process(Pid::from(pid)) {
        Some(process) => {
            process.kill();
            let child = Command::new("/Applications/Roblox.app/Contents/MacOS/RobloxPlayer")
                .args(args)
                .env(
                    "DYLD_INSERT_LIBRARIES",
                    "/Users/Shared/ScriptWare/libScriptWare.dylib",
                )
                .stdin(Stdio::null())
                .spawn()?;

            Ok(child)
        }
        None => bail!("Process not found!"),
    }
}

/// Gets all the Roblox processes running on the system.
/// Returns a vector of  `Process`es.
pub fn get_roblox_processes() -> Vec<Process> {
    let mut result: Vec<Process> = Vec::new();

    let mut sys = SYS_INFO.lock().unwrap();

    sys.refresh_processes();

    for process in sys.processes_by_name("RobloxPlayer") {
        let args = process.cmd().to_vec();
        let filtered_args = args
            .into_iter()
            .filter(|e| return e.find("--crashHandler").is_none());

        // convert the command line args into a full string
        let args_as_string = filtered_args.clone().collect::<Vec<String>>().join(" ");

        result.push(Process {
            pid: process.pid().as_u32(),
            command: args_as_string,
            arguments: filtered_args.collect(),
        });
    }

    result
}
