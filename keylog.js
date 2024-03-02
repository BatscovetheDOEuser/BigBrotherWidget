let Keyboard = require('node-keylogger');

let word = "";
let hist = [];
let banned = ["communism", "dystopia", "1984", "sadness", "will"];
let creditScore = 1000;
function keyLog() {
    var k = new Keyboard('event0'); // 'event0' is the file corresponding to my keyboard in /dev/input/
    k.on('keyup', hello);
}
function hello(thing) {
    if(thing.keyId == 'KEY_SPACE') {
        hist.push(word);
        if(hist.length>5) {
            BrowserWindow.getAllWindows()[0].webContents.send("textResponse", hist);
            hist.clear();
        }
        if(banned.contains(word.toLowerCase())) {
            creditScore -= 100;
            BrowserWindow.getAllWindows()[0].webContents.send("textResponse", `You said ${word}? Your social credit score is now ${creditScore}`);
        }
        word = "";
    } else {
        let letter = thing.keyId.split("_")[1];
        if(letter.length==1) {
            word += thing.keyId.split("_")[1];
        }
    }
}

