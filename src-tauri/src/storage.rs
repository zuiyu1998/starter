use crate::error::Result;
use api::storage::Persistent;
use tauri::{command, State};

#[command(rename_all = "snake_case")]
pub async fn persistent_clear(persistent: State<'_, Persistent>) -> Result<()> {
    let persistent = persistent.inner();

    persistent.get_storage().clear().await;

    Ok(())
}

#[command(rename_all = "snake_case")]
pub async fn persistent_remove_item(
    persistent: State<'_, Persistent>,
    key: String,
) -> Result<Option<String>> {
    let persistent = persistent.inner();

    let v = persistent.get_storage().remove_item(&key).await;

    Ok(v)
}

#[command(rename_all = "snake_case")]
pub async fn persistent_set_item(
    persistent: State<'_, Persistent>,
    key: String,
    value: String,
) -> Result<()> {
    let persistent = persistent.inner();

    persistent.get_storage().set_item(&key, &value).await;

    Ok(())
}

#[command(rename_all = "snake_case")]
pub async fn persistent_get_item(
    persistent: State<'_, Persistent>,
    key: String,
) -> Result<Option<String>> {
    let persistent = persistent.inner();

    let v = persistent.get_storage().get_item(&key).await;

    Ok(v)
}
