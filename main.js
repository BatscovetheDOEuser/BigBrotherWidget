const {app, BrowserWindow, screen, ipcMain, } = require("electron");
const os = require(
    "os"
);
const {exec} = require("child_process");
const path = require("path");
const retText = require("./textQueue");
const processWatcher = require("./processShaming")


const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    // console.log(width,height);
    // Specify the size and position of the window
    const windowWidth = 450;
    const windowHeight = 500;
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
        webPreferences : {
          nodeIntegration:true,
          preload : path.join(__dirname, "preload.js")
        }
        
    });
    win.setAlwaysOnTop(true);
    win.loadFile('index.html');
    return win;
}

app.whenReady().then(() => {
    let pw = processWatcher();
    createWindow();
    // console.log(os.platform());
    // shutdown();
    console.log(retText());
    ipcMain.on ('getText',(event, args) => {
      // console.log("rpc (real)");
      let text = retText();
      console.log("text " + text)
      event.reply('textResponse', text);
    } )
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