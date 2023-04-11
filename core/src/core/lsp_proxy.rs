use std::process::Command;

use anyhow::Result;

pub fn start_proxy() -> Result<()> {
    let cp = Command::new("lsp-ws-proxy")
        .arg("--")
        .arg("luau-lsp lsp")
        .spawn()?;

    info!("LSP proxy started with pid {}, port 9999", cp.id());

    Ok(())
}
