const {app, BrowserWindow, screen } = require("electron")

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    console.log(width,height);
    // Specify the size and position of the window
    const windowWidth = 600;
    const windowHeight = 600;
    const x = width - windowWidth; // position from the right
    const y = height - windowHeight; // position from the bottom

    const win = new BrowserWindow({
        width: windowHeight,
        height: windowHeight,
        transparent: true,
        frame: false,
        resizable:false,
        x: width,
        y: height,
    });
    win.setAlwaysOnTop(true);
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
});