pub trait Shift<T> {
    fn shift(&mut self) -> Option<T>;
}

impl<T> Shift<T> for Vec<T> {
    fn shift(&mut self) -> Option<T> {
        if !self.is_empty() {
            Some(self.remove(0))
        } else {
            None
        }
    }
}
