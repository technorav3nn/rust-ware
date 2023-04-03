use tokio::sync::Mutex;

use sysinfo::{System, SystemExt};

pub const SW_IPC_AUTH_PATH: &str = "/tmp/sw-ipc-auth";
lazy_static! {
    pub static ref SYS_INFO: Mutex<System> = {
        let unsafe_sys_info = System::new_all();
        Mutex::new(unsafe_sys_info)
    };
}
