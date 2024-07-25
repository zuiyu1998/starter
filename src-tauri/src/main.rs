// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod dto;
mod error;
mod project;
mod storage;

use api::abi::config::Config;
use api::abi::tokio;
use api::storage::Persistent;
use api::State as AppState;

#[tokio::main]
async fn main() {
    let config = Config::default();

    let state = AppState::from_config(&config)
        .await
        .expect("state init fail.");

    let persistent = Persistent::from_config(&config)
        .await
        .expect("persistent init fail.");

    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .manage(state)
        .manage(persistent)
        .invoke_handler(tauri::generate_handler![
            project::get_project_list,
            project::create_project,
            project::delete_project,
            project::excute_project,
            project::get_executer_options,
            project::update_project,
            storage::persistent_clear,
            storage::persistent_remove_item,
            storage::persistent_set_item,
            storage::persistent_get_item,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
