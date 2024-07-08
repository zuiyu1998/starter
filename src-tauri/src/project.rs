use crate::{error::Result, AppState};
use api::abi::{prelude::*, uuid::Uuid};
use tauri::{command, State};

#[command(rename_all = "snake_case")]
pub async fn delete_project(uuid: Uuid, app_state: State<'_, AppState>) -> Result<()> {
    let app_state = app_state.inner();

    app_state.delete_project(uuid).await?;

    Ok(())
}

#[command(rename_all = "snake_case")]
pub async fn create_project(
    create: StarterProjectCreate,
    app_state: State<'_, AppState>,
) -> Result<()> {
    let app_state = app_state.inner();

    app_state.create_project(create).await?;

    Ok(())
}

#[command(rename_all = "snake_case")]
pub async fn get_project_list(
    page: i32,
    page_size: i32,
    tags: Option<String>,
    app_state: State<'_, AppState>,
) -> Result<StarterProjectListResponse> {
    let app_state = app_state.inner();

    let res = app_state
        .get_project_list(GetProjectListParams {
            page,
            page_size,
            tags,
        })
        .await?;

    Ok(res)
}

#[command]
pub async fn excute_project(uuid: Uuid, app_state: State<'_, AppState>) -> Result<()> {
    let app_state = app_state.inner();

    app_state.excute_project(&uuid).await?;

    Ok(())
}
