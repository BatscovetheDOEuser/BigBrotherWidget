# so basically, we ball

# Aaron
- get text in queue
- 


function waitToEat() {
  //start timer (short) for eating, where user cant move mouse
  //if timer ends, user can move mouse
  //if they try to move the mouse the timer resets
  // speak.textQueue.push("Do not move your mouse until you have finished eating.");
  ipcRenderer.send("lockPointer", true);
  setTimeout(() => {
    ipcRenderer.send("lockPointer", false);
  }, 30000)
}

function startMealcheck() {
setinterval(mealtime(), 3600000)}

module.exports = startMealcheck;