

let toSpeak = "";

textBox = document.getElementById("textbox");

function speak(words){
    textBox.innerHTML = " " +words+" ";
}

window.TextQueue.getResponse('textResponse', (data) => {
  speak(data);
});


setInterval(async ()=>{
  await window.TextQueue.checkQueue();
}, 10000);