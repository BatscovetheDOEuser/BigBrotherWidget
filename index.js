textBox = document.getElementById("textbox");

function speak(words){
    textBox.innerText = " " +words+" ";
}

window.TextQueue.getResponse('textResponse', (data) => {
  speak(data);
});

window.TextQueue.lockPointer('lockPointer', (data) => {
  if (data){
    document.body.requestPointerLock();
  } else {
    document.exitPointerLock();
  }
  console.log("attempted pointer lock");
});



setInterval(async ()=>{
  await window.TextQueue.checkQueue();
}, 10000);

setInterval(() => {
  console.log("speak");
  speak(window.TextQueue.readClipboard());
}, 28000);
