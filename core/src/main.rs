#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;
mod exploit;
mod trait_impl;

use commands::{authenticate, download_file, get_processes, greet};
use exploit::comms::CommsServer;
use exploit::injection::get_roblox_processes;

use tauri::Manager;

#[macro_use]
extern crate lazy_static;

#[tokio::main]
async fn main() {
    tokio::spawn(async move {
        let mut server = CommsServer::new().await.unwrap();
        println!("Listening on: {}", server.listener.local_addr().unwrap());
        loop {
            server.accept().await.unwrap();
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
            get_processes
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
