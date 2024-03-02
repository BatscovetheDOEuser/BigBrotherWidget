let speak =  require("./textQueue.js");
let dialogue =  require("./text.js");

function waitToEat() {
  const start = new Date();
  const current = new Date();
  requestPointerLock();
  BrowserWindow.getAllWindows()[0].webContents.send("textResponse", "Do not move your mouse until you have finished.");
  addEventListener("mousemove", (event) => {});
  while (current.getTime() - start.getTime() < 30000)
    {
      onmousemove = (event) => {
        current = new Date();
        if (current.getTime() - start.getTime() < 30000)
            {
              start = current;
              BrowserWindow.getAllWindows()[0].webContents.send("textResponse", dialogue.idle[Math.floor(Math.random()*dialogue.idle.length));
              requestPointerLock();

            }
      };
    }
  
  
  
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
  if (hour == 18) 
  {
    BrowserWindow.getAllWindows()[0].webContents.send("textResponse", "Dinner time. Your mandated bedtime approaches.");
    waitToEat();
  }
}

setinterval(mealtime(), 3600000)
