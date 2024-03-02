let dialougue =  require("Text.js");
let textQueue = [];

function retText() {
    if(textQueue.length!=0) {
        return textQueue.shift();
    } else { 
        return dialougue.idle[Math.floor(Math.random()*dialougue.idle.length];
    }
}
