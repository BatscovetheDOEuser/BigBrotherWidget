const {contextBridge, ipcRenderer, clipboard} = require("electron");


contextBridge.exposeInMainWorld('TextQueue', {
    checkQueue: async ()=> {
        return ipcRenderer.send("getText");
    },
    getResponse: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    readClipboard: () => {
        return clipboard.readText();
      },
    lockPointer: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
});