use std::io::{Read, Write};
use std::str::FromStr;
use std::sync::Mutex;
use std::thread;
use std::{collections::HashMap, sync::Arc};
use tauri::Manager;

use std::net::{TcpListener, TcpStream};

use crate::core::state::AuthState;

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
    type Err = anyhow::Error;

    fn from_str(input: &str) -> anyhow::Result<Self> {
        match input {
            "H" => Ok(CommEvents::Hello),
            "S" => Ok(CommEvents::ScriptAck),
            "C" => Ok(CommEvents::ConsoleMessage),
            "I" => Ok(CommEvents::ConsoleRequestInput),
            _ => Err(anyhow::anyhow!("Invalid event type")),
        }
    }
}

impl FromStr for SocketEvents {
    type Err = anyhow::Error;

    fn from_str(input: &str) -> anyhow::Result<Self> {
        match input {
            "s" => Ok(SocketEvents::RunScript),
            "c" => Ok(SocketEvents::ConsoleSend),
            "a" => Ok(SocketEvents::Authenticate),
            _ => Err(anyhow::anyhow!("Invalid event type")),
        }
    }
}

pub struct CommsServer {
    /// The TcpListener
    pub listener: TcpListener,

    /// A hashmap of all the connections, pid -> socket
    pub connections: Arc<Mutex<HashMap<i32, Arc<Mutex<TcpStream>>>>>,

    /// a handle of the app
    pub handle: tauri::AppHandle,
}

impl CommsServer {
    pub fn new(handle: tauri::AppHandle) -> anyhow::Result<Arc<Self>> {
        let listener = TcpListener::bind("127.0.0.1:56914")?;

        Ok(Arc::new(Self {
            listener,
            connections: Arc::new(Mutex::new(HashMap::new())),
            handle,
        }))
    }

    /// Accepts a new connection
    pub fn accept(self: Arc<CommsServer>) -> anyhow::Result<()> {
        let (mut socket, _) = self.listener.accept()?;

        thread::spawn(move || {
            let mut buf = vec![0; 1024];
            let bytes_read = socket.read(&mut buf)?;

            loop {
                let mut message = String::from_utf8_lossy(&buf[..bytes_read])
                    .trim_end_matches('\0')
                    .to_owned();

                let event = CommEvents::from_str(message.remove(0).to_string().as_str())?;
                debug!("Got event: {:?}, msg: {message}", event);

                let clone = socket.try_clone()?;
                if let Err(why) = self.handle_event(clone, event, message.clone()) {
                    error!("[Comms] Event `{}` errored: {why}", message);
                }

                return Ok::<(), anyhow::Error>(());
            }
        });

        Ok(())
    }

    fn handle_event(
        self: Arc<CommsServer>,
        mut socket: TcpStream,
        event: CommEvents,
        message: String,
    ) -> anyhow::Result<()> {
        match event {
            CommEvents::Hello => {
                let pid = message.parse::<i32>()?;
                debug!("Got pid: {}", pid);
                debug!("Buf string: {}", message);

                let token = self.handle.state::<AuthState>().get_token();
                if let Some(token) = token {
                    let message = format!("a{}", token).replace("\0", "");
                    trace!("[Comms] Hello: Sending token: {}", message);
                    socket.write(message.as_bytes())?;
                } else {
                    anyhow::bail!("[Comms] Must be authenticated to connect to Script-Ware Core")
                }

                self.connections
                    .lock()
                    .unwrap()
                    .insert(pid, Arc::new(Mutex::new(socket)));
            }
            _ => {}
        }

        Ok(())
    }
}

// match event {
//     CommEvents::Hello => {
//         let pid = buf_str.parse::<i128>()?;
//         debug!("Got pid: {}", 1);
//         debug!("Buf string: {}", buf_str);

//         self.connections
//             .lock()
//             .unwrap()
//             .insert(2, Arc::new(Mutex::new(socket.try_clone()?)));
//     }
//     _ => {}
// }
