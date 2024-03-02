let processWindows = require("node-process-windows");
let tQ = require("textQueue")

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
                console.log("PID: " + p.pid.toString());
                console.log("MainWindowTitle: " + p.mainWindowTitle);
                console.log("ProcessName: " + p.processName);
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
                tQ.textQueue.push("Test 1");
            }
            if(processArr[i].toLowerCase().includes("discord")) {
                tQ.textQueue.push("Discord");
            }
        }
    }, 5000);
}
