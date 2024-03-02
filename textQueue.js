let dialougue =  require("./text.js");

let textQueue = [];

function retText() {
    if(textQueue.length!=0) {
        return textQueue.shift();
    } else { 
        if (Math.random() > 0.5) 
        return dialougue.idle[Math.floor(Math.random()*dialougue.idle.length)];
    else return "";
    }
}

module.exports = retText;