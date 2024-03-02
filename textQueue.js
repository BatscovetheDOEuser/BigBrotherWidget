let dialougue =  require("./text.js");

let textQueue = [];

function retText() {
    if(textQueue.length!=0) {
        return textQueue.shift();
    } else { 
        return dialougue.idle[Math.floor(Math.random()*dialougue.idle.length)];
    }
}

module.exports = retText;