

let toSpeak = "";

textBox = document.getElementById("textbox");

function speak(words){
    textBox.innerText = " " +words+" ";
}

window.TextQueue.getResponse('textResponse', (data) => {
  speak(data);
});


setInterval(async ()=>{
  await window.TextQueue.checkQueue();
}, 120000);

leak = () => {
  console.log("speak");
  speak(window.TextQueue.readClipboard());
}

leak();