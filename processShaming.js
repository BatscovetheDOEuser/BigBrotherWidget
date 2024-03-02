let processWindows = require("node-process-windows");
let tQ = require("./textQueue.js");
let t = require("./text.js");
const { exec } = require('child_process');
const { ipcMain, BrowserWindow } = require("electron");
const { stdout } = require("process");
let currentProcesses = [];
function getWindows() {
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
    let stdout = "";

        r = [];
    exec('ps -aux', (err, stdout, stderr) => {
        if(err) {
            return;
        }
        r = stdout.split('\n');
        // console.log("r is " + r);
        for(let i = 0; i < r.length; i++) {
            if(!r[i].includes("[") && r[i].includes("/")) {
                
                let v = r[i].split(":")[2];
                // console.log(v);
                ret.push(v);
            }
            
                
        }
        console.log("ret is: " + ret);
        currentProcesses = ret;
        return ret;
        

    });
    console.log("std:" + stdout);
    // for(let i = 0; i < r.length; i++) {
    //     let s = r[i].name.toLowerCase();
    //     if(s != "") {
    //         console.log(s);
    //         return ret.push(s);
    //     }
    // }
    console.log("ret is 2:" + ret);
    return ret;
}

function processWatcher() {
    console.log("processwatching started")
    return setInterval(() => {
        getWindows();
        let processArr = currentProcesses;
        console.log("pArr is: " + processArr );
        // console.log(processArr);
        for(let i = 0; i < processArr.length; i++) {
            console.log("whatttt:" +t.terminal);
            if(processArr[i].toLowerCase().includes("chrome")) {
                BrowserWindow.getAllWindows()[0].webContents.send("textResponse", t.chrome[Math.floor(Math.random()*t.chrome.length)]);
            }
            if(processArr[i].toLowerCase().includes("discord")) {
                console.log("discordfound");
                BrowserWindow.getAllWindows()[0].webContents.send("textResponse", t.discord[Math.floor(Math.random()*t.discord.length)]);
            }
            if(processArr[i].toLowerCase().includes("league")) {
                BrowserWindow.getAllWindows()[0].webContents.send("textResponse", t.league[Math.floor(Math.random()*t.league.length)]);
            }
            if(processArr[i].toLowerCase().includes("power")) {
                BrowserWindow.getAllWindows()[0].webContents.send("textResponse", t.terminal[Math.floor(Math.random()*t.terminal.length)]);
            }
         }
    }, 5000);
}

module.exports = processWatcher;
