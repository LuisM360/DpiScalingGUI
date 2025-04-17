/// <reference types="vite/client" />

interface ElectronAPI {
  getCurrentScale: (
    monitorId: string
  ) => Promise<{ scale: number | null; error: string | null }>;
  setScale: (
    monitorId: string,
    scale: number
  ) => Promise<{ success: boolean; message: string }>;
}

interface Window {
  electronAPI: ElectronAPI;
}
