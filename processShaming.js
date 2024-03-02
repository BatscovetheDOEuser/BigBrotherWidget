let processWindows = require("node-process-windows");
let tQ = require("./textQueue.js");
let t = require("./text.js");
const { exec } = require('child_process');
const { ipcMain, BrowserWindow } = require("electron");
const { stdout } = require("process");

let hasReacted = [
    false,
    false,
    false,
    false,
]

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
        // console.log("ret is: " + ret);
        currentProcesses = ret;
        return ret;
        

    });
    // console.log("std:" + stdout);
    // for(let i = 0; i < r.length; i++) {
    //     let s = r[i].name.toLowerCase();
    //     if(s != "") {
    //         console.log(s);
    //         return ret.push(s);
    //     }
    // }
    // console.log("ret is 2:" + ret);
    return ret;
}

function processWatcher() {
    console.log("processwatching started")
    return setInterval(() => {
        getWindows();
        let processArr = currentProcesses;
        // console.log("pArr is: " + processArr );
        // console.log(processArr);
        for(let i = 0; i < processArr.length; i++) {
            // console.log("whatttt:" +t.terminal);
            if(processArr[i].toLowerCase().includes("chrome") && !hasReacted[0]) {
                BrowserWindow.getAllWindows()[0].webContents.send("textResponse", t.chrome[Math.floor(Math.random()*t.chrome.length)]);
                hasReacted[0] = true;
            }
            if(processArr[i].toLowerCase().includes("discord") && !hasReacted[1]) {
                // console.log("discordfound");
                BrowserWindow.getAllWindows()[0].webContents.send("textResponse", t.discord[Math.floor(Math.random()*t.discord.length)]);
                hasReacted[1] = true;
            }
            if(processArr[i].toLowerCase().includes("league") && !hasReacted[2]) {
                BrowserWindow.getAllWindows()[0].webContents.send("textResponse", t.league[Math.floor(Math.random()*t.league.length)]);
                hasReacted[2] = true;
            }
            if(processArr[i].toLowerCase().includes("bash") && !hasReacted[3]) {
                BrowserWindow.getAllWindows()[0].webContents.send("textResponse", t.terminal[Math.floor(Math.random()*t.terminal.length)]);
                hasReacted[3] = true;
            }
         }
    }, 1000);
}

setInterval(()=> {
    for (let i = 0; i < hasReacted.length; i++){
        hasReacted[i] = false;
    }
},60000)



module.exports = processWatcher;
