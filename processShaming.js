let processWindows = require("node-process-windows");
let tQ = require("./textQueue.js");
let t = require("./text.js");
const { exec } = require('child_process');
const { ipcMain, BrowserWindow } = require("electron");

async function getWindows() {
    let ret = [];
    /*
    var activeProcesses = processWindows.getProcesses(function(err, processes) {
        console.log(processes);
        processes.forEach(function (p) {
            if(p.processName != "") {
                console.log(p.processName);
                ret.push(p.processName);
            }
        });
    });
    */
        r = [];
    exec('ps -aux', (err, stdout, stderr) => {
        if(err) {
            return [];
        }
        r = stdout.split('\n').map((item) => {
            if(!item.includes("[") && item.includes("/")) {
                let v = item.split(":")[2];
                return v;
            }
                return "";
        });

    });
    for(let i = 0; i < r.length; i++) {
        let s = r[i].name.toLowerCase();
        if(s != "") {
            console.log(s);
            return ret.push(s);
        }
    }
    return ret;
}

function processWatcher() {
    return setInterval(() => {
        let processArr = getWindows();
        // console.log(processArr);
        for(let i = 0; i < processArr.length; i++) {
            if(processArr[i].toLowerCase().includes("chrome")) {
                BrowserWindow.getAllWindows()[0].webContents.send("textResponse", t.textbank.chrome[Math.floor(Math.random()*t.chrome.length)]);
            }
            if(processArr[i].toLowerCase().includes("discord")) {
                BrowserWindow.getAllWindows()[0].webContents.send("textResponse", t.textbank.discord[Math.floor(Math.random()*t.discord.length)]);
            }
            if(processArr[i].toLowerCase().includes("league")) {
                BrowserWindow.getAllWindows()[0].webContents.send("textResponse", t.textbank.league[Math.floor(Math.random()*t.league.length)]);
            }
            if(processArr[i].toLowerCase().includes("power")) {
                BrowserWindow.getAllWindows()[0].webContents.send("textResponse", t.textbank.terminal[Math.floor(Math.random()*t.terminal.length)]);
            }
         }
    }, 5000);
}

module.exports = processWatcher;
