use crate::{error::Result, AppState};
use api::abi::{prelude::*, uuid::Uuid};
use tauri::{command, State};

#[command]
pub async fn get_project_list(
    app_state: State<'_, AppState>,
) -> Result<StarterProjectListResponse> {
    let app_state = app_state.inner();

    let res = app_state.get_project_list().await?;

    Ok(res)
}

#[command]
pub async fn excute_project(uuid: Uuid, app_state: State<'_, AppState>) -> Result<()> {
    let app_state = app_state.inner();

    app_state.excute_project(&uuid).await?;

    Ok(())
}
