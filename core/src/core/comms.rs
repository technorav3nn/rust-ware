use std::collections::HashMap;
use std::str::FromStr;

use anyhow::Context;

use tauri::async_runtime::TokioJoinHandle;
use tokio::net::{TcpListener, TcpStream};

use crate::util::Shift;

#[derive(Debug, PartialEq)]
pub enum CommEvents {
    Hello,
    ScriptAck,
    ConsoleMessage,
    ConsoleRequestInput,
}

#[derive(Debug, PartialEq)]
pub enum SocketEvents {
    RunScript,
    ConsoleSend,
    Authenticate,
}

impl FromStr for CommEvents {
    type Err = ();

    fn from_str(input: &str) -> anyhow::Result<Self, Self::Err> {
        match input {
            "H" => Ok(CommEvents::Hello),
            "S" => Ok(CommEvents::ScriptAck),
            "C" => Ok(CommEvents::ConsoleMessage),
            "I" => Ok(CommEvents::ConsoleRequestInput),
            _ => Err(()),
        }
    }
}

impl FromStr for SocketEvents {
    type Err = ();

    fn from_str(input: &str) -> anyhow::Result<Self, Self::Err> {
        match input {
            "s" => Ok(SocketEvents::RunScript),
            "c" => Ok(SocketEvents::ConsoleSend),
            "a" => Ok(SocketEvents::Authenticate),
            _ => Err(()),
        }
    }
}

pub struct CommsServer {
    pub listener: TcpListener,
    pub connections: HashMap<i32, TcpStream>,
}

impl CommsServer {
    pub async fn new() -> anyhow::Result<Self> {
        let listener = TcpListener::bind("127.0.0.1:56914").await?;

        Ok(Self {
            listener,
            connections: HashMap::new(),
        })
    }

    /// Accepts a new connection
    pub async fn accept(&mut self) -> anyhow::Result<TokioJoinHandle<anyhow::Result<()>>> {
        let (_socket, _) = self.listener.accept().await?;

        Ok(tokio::spawn(async move {
            let buf = vec![0; 1024];

            loop {
                let buf_str = String::from_utf8(buf.clone())?;
                let mut split_zero = buf_str.split("\0").collect::<Vec<&str>>();

                while split_zero.len() > 1 {
                    let msg = &split_zero.shift().context("Couldn't shift split_zero!")?;

                    trace!("[Comms] Got message: {}", msg);

                    match &msg[0..1] {
                        "H" => {
                            debug!("[Comms] Got H Message");
                        }
                        _ => debug!("[Comms] Got unknown message: {}", msg),
                    }
                }
            }
        }))
    }
}
