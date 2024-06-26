// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod error;
mod project;

use api::abi::config::Config;
use api::abi::tokio;
use api::State as AppState;

#[tokio::main]
async fn main() {
    let config = Config::default();

    let state = AppState::from_config(&config)
        .await
        .expect("state init fail.");

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            project::get_project_list,
            project::excute_project
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
