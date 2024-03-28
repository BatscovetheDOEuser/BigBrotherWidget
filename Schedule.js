let speak =  require("./textQueue.js");
let dialogue =  require("./text.js");
const { BrowserWindow, ipcMain } = require("electron");
let start;
let current;

function mouseCallback(event) {
  while (current.getTime() - start.getTime() < 30000)
    {
      onmousemove = (event) => {
        current = new Date();
        if (current.getTime() - start.getTime() < 30000)
            {
              start = current;
              BrowserWindow.getAllWindows()[0].webContents.send("textResponse",     
              dialogue.food[Math.floor(Math.random()*dialogue.food.length)]);
              BrowserWindow.getAllWindows()[0].document.body.requestPointerLock();
            }
        else
        {
           document.removeEventListener("mousemove", moveCallback, false);
        }
      }
    }
}

function waitToEat() {
  start = new Date();
  current = new Date();

  // request focus
  BrowserWindow.getAllWindows()[0].focus();
  BrowserWindow.getAllWindows()[0].webContents.send('lockPointer', true);

  setTimeout(() => {BrowserWindow.getAllWindows()[0].webContents.send('lockPointer', false)}, 20000);

  // console.log(BrowserWindow.getAllWindows()[0].webContents);
  // BrowserWindow.getAllWindows()[0].document.body.requestPointerLock(); //can i call the window from here or do i need to add something first?
  // // BrowserWindow.getAllWindows()[0].webContents.send("textResponse", "Do not move your mouse until you have finished.");
  // BrowserWindow.getAllWindows()[0].document.body.addEventListener("mousemove", mouseCallback);
  // }
//onmousemove = (event) => {
//  BrowserWindow.getAllWindows()[0].webContents.send("textResponse", dialogue.food[Math.floor(Math.random()*dialogue.food.length)); // in case this prev code is totally busted we'll try some of this
//  win.requestPointerLock();
}

function mealtime() {
  const date = new Date();
  const hour = date.getHours();
  if (hour == 6) 
  {
    BrowserWindow.getAllWindows()[0].webContents.send("textResponse", "Breakfast time. You'll need it for the day ahead.");
    waitToEat();
  }
  if (hour == 12) 
  {
    BrowserWindow.getAllWindows()[0].webContents.send("textResponse", "Lunch time. Eat now or starve.");
    waitToEat();

  }
  if (hour == 16) 
  {
    BrowserWindow.getAllWindows()[0].webContents.send("textResponse", "Dinner time. Your mandated bedtime approaches.");
    waitToEat();
  }
  else {
    BrowserWindow.getAllWindows()[0].webContents.send("textResponse", "Dinner time. Your mandated bedtime approaches.");
    waitToEat();
  }
}


function startMealcheck() {
  console.log("mealcheck started");
  setInterval(mealtime, 3000);
}
  
module.exports = startMealcheck;