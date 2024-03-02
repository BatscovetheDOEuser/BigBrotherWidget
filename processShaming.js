let processWindows = require("node-process-windows");
let tQ = require("./textQueue.js");
let t = require("./text.js");
const { ipcMain, BrowserWindow } = require("electron");

function printWindows() {
    var activeProcesses = processWindows.getProcesses(function(err, processes) {
        processes.forEach(function (p) {
            if(p.pid.toString() != "") {
                console.log("PID: " + p.pid.toString());
                console.log("MainWindowTitle: " + p.mainWindowTitle);
                console.log("ProcessName: " + p.processName);
            }
        });
    });
}

function getWindows() {
    let ret = [];
    var activeProcesses = processWindows.getProcesses(function(err, processes) {
        console.log(processes);
        processes.forEach(function (p) {
            if(p.processName != "") {
                console.log(p.processName);
                ret.push(p.processName);
            }
        });
    });
    return ret;
}

function processWatcher() {
    console.log()
    return setInterval(() => {
        BrowserWindow.getAllWindows()[0].webContents.send("textResponse", "ball");
    })
    // return setInterval(() => {
    //     let processArr = getWindows();
    //     // console.log(processArr);
    //     for(let i = 0; i < processArr.length; i++) {
    //         if(processArr[i].toLowerCase().includes("chrome")) {
    //             tQ.textQueue.push(t.textbank.chrome[Math.floor(Math.random()*t.chrome.length)]);
    //         }
    //         if(processArr[i].toLowerCase().includes("discord")) {
    //             tQ.textQueue.push(t.textbank.discord[Math.floor(Math.random()*t.discord.length)]);
    //         }
    //         if(processArr[i].toLowerCase().includes("league")) {
    //             tQ.textQueue.push(t.textbank.league[Math.floor(Math.random()*t.league.length)]);
    //         }
    //         if(processArr[i].toLowerCase().includes("power")) {
    //             tQ.textQueue.push(t.textbank.terminal[Math.floor(Math.random()*t.terminal.length)]);
    //         }
    //     }
    // }, 5000);
}

module.exports = processWatcher;