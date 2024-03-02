const {app, BrowserWindow, screen, } = require("electron");
const os = require(
    "os"
);
const {exec} = require("child_process");

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
    // console.log(os.platform());
    // shutdown();
});

function shutdown() {
    let command;
    if (os.platform() === 'win32') {
      command = 'shutdown /s /t 0';
    } else if (os.platform() === 'darwin') {
      command = 'sudo shutdown -h now';
    } else if (os.platform() === 'linux') {
      command = 'sudo shutdown -h now';
    } else {
      console.error('Unsupported platform');
      return;
    }
  
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }