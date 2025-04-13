# DPI Scaling GUI

A simple Electron-based desktop application for Windows to quickly view and change the display scaling (DPI percentage) for connected monitors. This utility provides a graphical user interface for the `SetDPI.exe` command-line tool.

![App Screenshot](placeholder.png)
_(Placeholder)_

## Features

- **Monitor Selection:** Choose the target monitor (initially supports up to 3 monitors, identified by index).
- **Current Scale Display:** View the current DPI scaling percentage applied to the selected monitor.
- **Quick Scale Buttons:** Apply common scaling percentages (100%, 125%, 150%, 175%, 200%) with a single click.
- **Status Feedback:** Get clear messages about the success or failure of operations.
- **Modern Interface:** Built with Electron and styled using TailwindCSS for a clean look.

## Prerequisites

- **Windows Operating System:** Required because the core functionality relies on `SetDPI.exe`.
- **`SetDPI.exe`:** This command-line tool must be available.
  - Download or build it from [its repository](https://github.com/imniko/SetDPI).
  - Place `SetDPI.exe` either in the **root directory** of this project or in a location included in your system's **PATH environment variable**. The application expects to be able to execute `SetDPI.exe` directly.
- **Node.js and npm (or yarn):** Required for running and developing the Electron application. Download from [nodejs.org](https://nodejs.org/).

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder-name>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Ensure `SetDPI.exe` is accessible:** Place the executable in the project root directory.

## Usage

To run the application in development mode:

```bash
npm run dev
# or
yarn dev
```
