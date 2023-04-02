mod commands;
mod consts;
mod exploit;
mod state;
mod trait_impl;

#[macro_use]
extern crate lazy_static;

use tauri::Manager;

use commands::{authenticate, download_file, get_processes, greet, kill_process, try_inject};

use exploit::comms::CommsServer;
use exploit::injection::get_roblox_processes;

use state::AuthState;

#[tokio::main]
async fn main() {
    tokio::spawn(async move {
        let mut server = CommsServer::new().await.unwrap();
        println!("Listening on: {}", server.listener.local_addr().unwrap());
        loop {
            server.accept().await.expect("Failed to accept connection");
        }
    });

    tauri::Builder::default()
        .setup(|app| {
            let _window = app.get_window("main").unwrap();
            let processes = get_roblox_processes();
            println!("{:?}", processes);

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            authenticate,
            download_file,
            get_processes,
            kill_process,
            try_inject
        ])
        .manage(AuthState(Default::default()))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
