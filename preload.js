const {contextBridge, ipcRenderer} = require("electron");


contextBridge.exposeInMainWorld('TextQueue', {
    checkQueue: async ()=> {
        return ipcRenderer.send("getText");
    },
    getResponse: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
});