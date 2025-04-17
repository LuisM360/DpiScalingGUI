import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  getCurrentScale: (monitorId: string) =>
    ipcRenderer.invoke("ipc-get-current-scale", monitorId),
  setScale: (monitorId: string, scale: number) =>
    ipcRenderer.invoke("ipc-set-scale", monitorId, scale),
});
