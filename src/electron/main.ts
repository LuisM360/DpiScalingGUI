import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { execFile } from "child_process";
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";

function getSetDpiPath() {
  if (app.isPackaged) {
    // Adjust if electron-builder puts SetDPI.exe elsewhere
    return path.join(process.resourcesPath, "SetDPI.exe");
  } else {
    console.log(app.getAppPath());
    return path.resolve(app.getAppPath(), "SetDpi.exe");
  }
}

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 480,
    height: 580,
    useContentSize: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123/");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "dist-react/index.html"));
  }
});

// IPC: Get Current Scale
ipcMain.handle("ipc-get-current-scale", async (_event, monitorId: string) => {
  if (!["1", "2", "3"].includes(monitorId)) {
    return { scale: null, error: "Invalid monitor ID" };
  }
  const setDpiPath = getSetDpiPath();
  const args = monitorId === "1" ? ["value"] : ["value", monitorId];
  return new Promise((resolve) => {
    execFile(setDpiPath, args, (error, stdout, stderr) => {
      if (error || stderr) {
        resolve({
          scale: null,
          error: stderr || (error ? error.message : undefined),
        });
        return;
      }
      // Try to extract a number from stdout
      const match = stdout.match(/(\d{2,3})/);
      if (match) {
        resolve({ scale: Number(match[1]), error: null });
      } else {
        resolve({ scale: null, error: "Could not parse scale value" });
      }
    });
  });
});

// IPC: Set Scale
ipcMain.handle(
  "ipc-set-scale",
  async (_event, monitorId: string, scale: number) => {
    if (!["1", "2", "3"].includes(monitorId)) {
      return { success: false, message: "Invalid monitor ID" };
    }
    if (![100, 125, 150, 175, 200].includes(scale)) {
      return { success: false, message: "Invalid scale value" };
    }
    const setDpiPath = getSetDpiPath();
    const args =
      monitorId === "1" ? [scale.toString()] : [scale.toString(), monitorId];
    return new Promise((resolve) => {
      execFile(setDpiPath, args, (error, stdout, stderr) => {
        if (error || stderr) {
          resolve({
            success: false,
            message:
              stderr ||
              (error ? error.message : "Failed to execute SetDPI.exe"),
          });
          return;
        }
        resolve({
          success: true,
          message: `Successfully applied ${scale}% scale to Monitor ${monitorId}`,
        });
      });
    });
  }
);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
