textBox = document.getElementById("textbox");

function speak(words){
    textBox.innerHTML = words;
}

speak("we ball");

setTimeout(() => {
    speak("balling"), 10000
})