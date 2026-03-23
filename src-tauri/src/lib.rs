use tauri::{
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager,
    menu::{MenuBuilder, MenuItemBuilder},
};

#[tauri::command]
fn store_key(key: String, value: String) -> Result<String, String> {
    // Placeholder: in production, use tauri-plugin-store or OS keychain
    // For now, just acknowledge the request
    println!("[keystore] store_key: {} = {}...", key, &value[..value.len().min(20)]);
    Ok("stored".to_string())
}

#[tauri::command]
fn retrieve_key(key: String) -> Result<Option<String>, String> {
    // Placeholder: in production, retrieve from tauri-plugin-store or OS keychain
    println!("[keystore] retrieve_key: {}", key);
    Ok(None)
}

#[tauri::command]
fn delete_key(key: String) -> Result<(), String> {
    println!("[keystore] delete_key: {}", key);
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            // Build tray menu
            let show = MenuItemBuilder::with_id("show", "Show Window").build(app)?;
            let quit = MenuItemBuilder::with_id("quit", "Quit Ghost Chat").build(app)?;
            let menu = MenuBuilder::new(app)
                .items(&[&show, &quit])
                .build()?;

            // Build system tray
            let _tray = TrayIconBuilder::new()
                .menu(&menu)
                .tooltip("Ghost Chat — Encrypted Comms")
                .on_menu_event(move |app, event| {
                    match event.id().as_ref() {
                        "show" => {
                            if let Some(window) = app.get_webview_window("main") {
                                let _ = window.show();
                                let _ = window.set_focus();
                            }
                        }
                        "quit" => {
                            app.exit(0);
                        }
                        _ => {}
                    }
                })
                .on_tray_icon_event(|tray, event| {
                    // Double-click / left-click to show window
                    if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up,
                        ..
                    } = event
                    {
                        let app = tray.app_handle();
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                })
                .build(app)?;

            Ok(())
        })
        .on_window_event(|window, event| {
            // Minimize to tray on close (instead of quitting)
            if let tauri::WindowEvent::CloseRequested { api, .. } = event {
                let _ = window.hide();
                api.prevent_close();
            }
        })
        .invoke_handler(tauri::generate_handler![store_key, retrieve_key, delete_key])
        .run(tauri::generate_context!())
        .expect("error while running Ghost Chat");
}
