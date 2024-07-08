use api::abi::project::ExecuterOption;
use serde::{Deserialize, Serialize};

#[derive(Clone, Deserialize, Serialize)]
pub struct ExecuterOptions(pub Vec<ExecuterOption>);
