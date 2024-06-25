use api::error::Error as ApiError;
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct Error(String);

impl From<ApiError> for Error {
    fn from(value: ApiError) -> Self {
        Error(value.to_string())
    }
}

pub type Result<T, E = Error> = std::result::Result<T, E>;
