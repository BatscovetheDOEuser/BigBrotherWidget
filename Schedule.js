let speak =  require("./textQueue.js");
let dialogue =  require("./text.js");

function waitToEat() {
  const start = new Date();
  const current = new Date();
  win.requestPointerLock(); //can i call the window from here or do i need to add something first?
  BrowserWindow.getAllWindows()[0].webContents.send("textResponse", "Do not move your mouse until you have finished.");
  addEventListener("mousemove", (event) => {});
  while (current.getTime() - start.getTime() < 30000)
    {
      onmousemove = (event) => {
        current = new Date();
        if (current.getTime() - start.getTime() < 30000)
            {
              start = current;
              BrowserWindow.getAllWindows()[0].webContents.send("textResponse",     
              dialogue.food[Math.floor(Math.random()*dialogue.food.length));
              win.requestPointerLock();
            }
        else
        {
           document.removeEventListener("mousemove", moveCallback, false);
        }
      }
    }
  }
//onmousemove = (event) => {
//  BrowserWindow.getAllWindows()[0].webContents.send("textResponse", dialogue.food[Math.floor(Math.random()*dialogue.food.length)); // in case this prev code is totally busted we'll try some of this
//  win.requestPointerLock();
//}

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
  if (hour == 18) 
  {
    BrowserWindow.getAllWindows()[0].webContents.send("textResponse", "Dinner time. Your mandated bedtime approaches.");
    waitToEat();
  }
}

setinterval(mealtime(), 3600000)
