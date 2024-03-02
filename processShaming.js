let processWindows = require("node-process-windows");
let tQ = require("./textQueue.js");
let t = require("./text.js");

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
        processes.forEach(function (p) {
            if(p.processName != "") {
                ret.push(p.processName);
            }
        });
    });
    return ret;
}

function processWatcher() {
    return setInterval(() => {
        let processArr = getWindows;
        for(let i = 0; i < processArr.length; i++) {
            if(processArr[i].toLowerCase().includes("chrome")) {
                tQ.textQueue.push(t.chrome[Math.floor(Math.random()*t.chrome.length)]);
            }
            if(processArr[i].toLowerCase().includes("discord")) {
                tQ.textQueue.push(t.discord[Math.floor(Math.random()*t.discord.length)]);
            }
            if(processArr[i].toLowerCase().includes("league")) {
                tQ.textQueue.push(t.league[Math.floor(Math.random()*t.league.length)]);
            }
            if(processArr[i].toLowerCase().includes("power")) {
                tQ.textQueue.push(t.terminal[Math.floor(Math.random()*t.terminal.length)]);
            }
        }
    }, 5000);
}
