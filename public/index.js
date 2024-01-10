/* eslint-disable no-prototype-builtins */

const keyCode = [38];
const cmd = {
  help: "<br>Supported list of commands: about, resume, projects, skills, contact, clear, cls",
  about:
    "<br>Hi! <br>I'm josh, currently I'm a student pursuing a degree in Computer Science at Queens College :)<br>",
  resume:
    "<br>Click <a href='https://drive.google.com/file/d/1Fo87zUv7M5n9ghHEIcMWF2YLyAsDqZ73' id='link'>here</a> for my current resume",
  skills:
    "<br>I would describe myself as a full stack web developer and would say that i'm proficient in: JavaScript, HTML, CSS, Node.js along with a plethora of other technologies and frameworks related to webdev [The full list of which is on my resume :)]",
  contact:
    "<br>Feel free to reach out to me, <a id='link' href='mailto:joshua02k@gmail.com'>joshua02k@gmail.com</a>",
  yeezy:
    '<br>Yeezy, Yeezy, what\'s good? <br> It\'s your boy Max B, what\'s going on? <br> Just checking in on you <br> Appreciate the love and support <br> The wave is here <br> <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/1ZnA4VYOlYIShuGt60LmCs" width="65%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>',
  easteregg:
    '<br>Wait there\'s no easter egg? <br> Always has been. <br> <img src="https://i.imgflip.com/6hdfd7.jpg" title="made at imgflip.com" height=150px>',
  stop: '<br>hammertime <br> <img src="https://25.media.tumblr.com/tumblr_lrn9b5m2Dx1qgwi7to1_250.gif" height=50px><img src="https://25.media.tumblr.com/tumblr_lrn9b5m2Dx1qgwi7to1_250.gif" height=50px><img src="https://25.media.tumblr.com/tumblr_lrn9b5m2Dx1qgwi7to1_250.gif" height=50px><img src="https://25.media.tumblr.com/tumblr_lrn9b5m2Dx1qgwi7to1_250.gif" height=50px><img src="https://25.media.tumblr.com/tumblr_lrn9b5m2Dx1qgwi7to1_250.gif" height=50px><img src="https://25.media.tumblr.com/tumblr_lrn9b5m2Dx1qgwi7to1_250.gif" height=50px>',
  developers:
    '<br> <iframe width="280" height="157.5" src="https://www.youtube.com/embed/Vhh_GeBPOhs?controls=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
  all: "<br>All commands avaliable are: help, about, resume, skills, contact, yeezy, easteregg, stop, developers, boom, clear, cls, projects, qwerty, qwertyuiopasdfghjklzxcvbnm",
  projects: `
  <br> <i>Calorie Tracker & Blog</i>: <a href='https://github.com/olukukoyi/fitness-pals-ctp' id='link'>Code</a>
  <br> <i>AI Kitchen Companion</i>: <a href='https://github.com/MyPingO/chAfs-kIss' id='link'>Code</a>
  <br> <i>Training Tracker</i>: <a href='https://github.com/joshkat/TrainingTracker' id='link'>Code</a> | <a href='https://training.katayev.io/' id='link'>Preview</a>
  <br> <i>Sorting Visualizer</i>: <a href='https://github.com/joshkat/visualArraySort' id='link'>Code</a> | <a href='https://joshkat.github.io/visualArraySort/' id='link'>Preview</a>
  <br> <i>Spotify to Github Now Playing</i>: <a href='https://github.com/joshkat/Github-Now-Playing' id='link'>Code</a> | <a href='https://github-now-playing.onrender.com' id='link'>Preview</a>
  <br> <i>CV Generator</i>: <a href='https://github.com/joshkat/CV-Generator' id='link'>Code</a> | <a href='https://cv.katayev.io' id='link'>Preview</a>
  <br> <i>Memory Card Game</i>: <a href='https://github.com/joshkat/memory-card-game' id='link'>Code</a> | <a href='https://memory-game.katayev.io' id='link'>Preview</a>
  <br> <i>Etch-A-Sketch</i>: <a href='https://github.com/joshkat/Etch-A-Sketch' id='link'>Code</a> | <a href='https://joshkat.github.io/Etch-A-Sketch/' id='link'>Preview</a>
  `,
  qwertyuiopasdfghjklzxcvbnm: "<br>Did you mean qwerty?",
  qwerty: "<br>Did you mean qwertyuiopasdfghjklzxcvbnm?",
};

function perform(input) {
  let output;
  input = input.toLowerCase();
  if (input.length == 0) {
    return;
  }
  output = `> ~ ${input}`;

  if (!cmd.hasOwnProperty(input)) {
    output += `<div class="code userOutput outputLine">command ${input} not found</div>`;
    if (input == "clear" || input == "cls") {
      const usrOutput = document.querySelectorAll(".userOutput");
      usrOutput.forEach((userOutput) => {
        userOutput.remove();
      });
      return;
    }

    if (input == "boom") {
      const audio = new Audio("/boom.mp3");
      audio.play();
      return;
    }

    if(input == "timer"){
      location = "https://timer.katayev.io";
      return;
    }
  } else {
    output = output + cmd[input];
  }
  const terminalOutput = document.getElementById("terminalTextArea");
  terminalOutput.innerHTML = `${terminalOutput.innerHTML}<div class="code userOutput">${output}</div>`;
}

function key(e) {
  const userInput = document.getElementById("userInput");
  const input = userInput.innerHTML;

  if (keyCode.includes(e.keyCode)) {
    return;
  }

  userInput.innerText = "";
  const container = document.querySelector(".whole-terminal");
  container.scrollTop = container.scrollHeight;

  if (e.key === "Enter") {
    perform(input);
    userInput.innerText = "";
    const container = document.querySelector(".whole-terminal");
    container.scrollTop = container.scrollHeight;
    return;
  }

  userInput.innerText = input + e.key;
}

function backspace(e) {
  const userInput = document.getElementById("userInput");
  if (e.keyCode !== 8 && e.keyCode !== 46) {
    return;
  }
  userInput.innerHTML = userInput.innerHTML.slice(
    0,
    userInput.innerHTML.length - 1
  );
}

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
