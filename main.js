const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 500,
    height: 500,
    maxWidth: 500,
    maxHeight: 500,
  });
  win.setMenu(null);

  // and load the index.html of the app.
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "/dist/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
}

app.disableHardwareAcceleration();
app.commandLine.appendSwitch("disable-software-rasterizer");

app.on("ready", createWindow);
