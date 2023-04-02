use std::sync::Mutex;

pub struct AuthState(pub Mutex<Auth>);

#[derive(Default)]
pub struct Auth {
    token: Option<String>,
}

impl AuthState {
    pub fn set_token(&self, token: String) {
        let mut auth = self.0.lock().unwrap();
        auth.token = Some(token);
    }

    pub fn get_token(&self) -> Option<String> {
        let auth = self.0.lock().unwrap();
        auth.token.clone()
    }

    pub fn is_authenticated(&self) -> bool {
        let auth = self.0.lock().unwrap();
        auth.token.is_some()
    }
}
