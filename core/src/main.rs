mod commands;
mod core;
mod util;

#[macro_use]
extern crate lazy_static;

#[macro_use]
extern crate log;

use chrono::Local;
use colored::Colorize;
use fern::colors::{Color, ColoredLevelConfig};
use tauri::Manager;

use crate::commands::{
    authenticate, download_file, get_processes, get_version, greet, kill_process, try_inject,
};
use crate::core::comms::CommsServer;
use crate::core::state::AuthState;

fn initalize_logger() -> anyhow::Result<()> {
    let colors = ColoredLevelConfig::new()
        .debug(Color::BrightBlue)
        .trace(Color::Cyan)
        .error(Color::Red)
        .warn(Color::Yellow)
        .info(Color::BrightGreen);

    let dispatch = fern::Dispatch::new();

    dispatch
        .format(move |out, message, record| {
            out.finish(format_args!(
                "[{} {} => {}] {}",
                Local::now()
                    .format("%Y-%m-%d %H:%M:%S%.3f")
                    .to_string()
                    .dimmed(),
                colors.color(record.level()).to_string().bold(),
                record.target().bold().blue(),
                message
            ))
        })
        .level(log::LevelFilter::Trace)
        .level_for("mio", log::LevelFilter::Off)
        .level_for("tao", log::LevelFilter::Off)
        .level_for("want", log::LevelFilter::Off)
        .chain(std::io::stdout())
        .apply()?;

    Ok(())
}

async fn start_tcp_pipe() -> anyhow::Result<()> {
    let mut server = CommsServer::new().await?;
    info!(
        "[CommsServer] TcpListener listening on port {}",
        server
            .listener
            .local_addr()
            .unwrap()
            .to_string()
            .bold()
            .underline()
    );
    loop {
        if let Err(why) = server.accept().await {
            error!("Error accepting connection: {}", why);
        }

        info!(
            "Accepted new connection! Current amount: {}",
            server.connections.len()
        );
    }
}

#[tokio::main]
async fn main() {
    if let Err(why) = initalize_logger() {
        error!("Error initalizing logger: {}", why);
    }

    info!("Initalizing application...");

    info!("Initalizing TCP Server...");
    tokio::spawn(async move {
        if let Err(why) = start_tcp_pipe().await {
            error!("Error starting TCP Server: {}", why);
        }
    });

    tauri::Builder::default()
        .setup(|app| {
            let _window = app.get_window("main").unwrap();

            info!("Setup complete. Application started.");

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            authenticate,
            download_file,
            get_processes,
            kill_process,
            try_inject,
            get_version
        ])
        .manage(AuthState(Default::default()))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
