let speak =  require("./textQueue.js");

function waitToEat() {
  //start timer (short) for eating, where user cant move mouse
  //if timer ends, user can move mouse
  //if they try to move the mouse the timer resets
  requestPointerLock();
  speak.textQueue.push(speak.late[Math.floor(Math.random()*speak.late.length
  speak.textQueue.push("Do not move your mouse until you have finished.");
}

function mealtime() {
  const date = new Date();
  const hour = date.getHours();
  if (hour == 6) 
  {
    speak.textQueue.push("Breakfast time. You'll need it for the day ahead.");
    waitToEat();
  }
  if (hour == 12) 
  {
    speak.textQueue.push("Lunch time. Eat now or starve.");
    waitToEat();

  }
  if (hour == 18) 
  {
    speak.textQueue.push("Dinner time. Your mandated bedtime approaches.");
    waitToEat();
  }
}

setinterval(mealtime(), 3600000)
