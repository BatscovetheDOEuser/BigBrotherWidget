var processWindows = require("node-process-windows");

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

    }, 1000);
}
