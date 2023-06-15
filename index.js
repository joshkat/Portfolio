const keyCode = [38];
const cmd = {
  help: "<br>Supported list of commands: about, resume, projects, skills, contact",
  about:
    "<br>Hi! <br>I'm josh, currently I'm a student persuing a degree in <br>Computer Science at Queens College :)<br>",
  resume:
    "<br>Click <a href='./katayevResume2023.pdf' id='link'>here</a> for my current resume",
  skills:
    "<br>I would describe myself as a full stack web developer and would say <br>that i'm proficient in: JavaScript, HTML, CSS, Node.js <br> along with a plethora of other technologies and frameworks related <br> to webdev [The full list of which is on my resume :)]",
  contact:
    "<br>Feel free to reach out to me, <a id='link' href='mailto:joshua02k@gmail.com'>joshua02k@gmail.com</a>",
  yeezy:
    '<br>Yeezy, Yeezy, what\'s good? <br> It\'s your boy Max B, what\'s going on? <br> Just checking in on you <br> Appreciate the love and support <br> The wave is here <br> <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/1ZnA4VYOlYIShuGt60LmCs?utm_source=generator" width="65%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>',
  easteregg:
    '<br>Wait there\'s no easter egg? <br> Always has been. <br> <img src="https://i.imgflip.com/6hdfd7.jpg" title="made at imgflip.com" height=150px>',
  stop: '<br>hammertime <br> <img src="https://25.media.tumblr.com/tumblr_lrn9b5m2Dx1qgwi7to1_250.gif" height=50px><img src="https://25.media.tumblr.com/tumblr_lrn9b5m2Dx1qgwi7to1_250.gif" height=50px><img src="https://25.media.tumblr.com/tumblr_lrn9b5m2Dx1qgwi7to1_250.gif" height=50px><img src="https://25.media.tumblr.com/tumblr_lrn9b5m2Dx1qgwi7to1_250.gif" height=50px><img src="https://25.media.tumblr.com/tumblr_lrn9b5m2Dx1qgwi7to1_250.gif" height=50px><img src="https://25.media.tumblr.com/tumblr_lrn9b5m2Dx1qgwi7to1_250.gif" height=50px>',
  developers:
    '<br> <iframe width="280" height="157.5" src="https://www.youtube.com/embed/Vhh_GeBPOhs?controls=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
  all: "<br>All commands avaliable are: <br> help, about, resume, skills, contact, <br> yeezy, easteregg, stop, developers, <br> clock, sketch, tictactoe, boom, clear, projects",
  projects: `
  <br> Training Tracker: <a href='https://github.com/joshkat/TrainingTracker' id='link'>Code</a> | <a href='https://training.katayev.io/' id='link'>Preview</a>
  <br> Sorting Visualizer: <a href='https://github.com/joshkat/visualArraySort' id='link'>Code</a> | <a href='https://joshkat.github.io/visualArraySort/' id='link'>Preview</a>
  <br> Spotify to Github Now Playing: <a href='https://github.com/joshkat/Github-Now-Playing' id='link'>Code</a>
  <br> Etch-A-Sketch: <a href='https://github.com/joshkat/Etch-A-Sketch' id='link'>Code</a> | <a href='https://joshkat.github.io/Etch-A-Sketch/' id='link'>Preview</a>
  <br> Tic-Tac-Toe: <a href='https://katayev.io/tic-tac-toe/' id='link'>Preview</a>
  `,
};

const link = {
  clock: "./DigitalClock/index.html",
  sketch: "./Etch-A-Sketch/index.html",
  tictactoe: "/tic-tac-toe/index.html",
};

let userInput, terminalOutput;

const keyBoard = () => {
  userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalTextArea");
  document.getElementById("dummy-Keyboard").focus();
  console.log("Its showtime");
};

const preform = function preformCommand(input) {
  let output;
  input = input.toLowerCase();
  if (input.length == 0) {
    return;
  }
  output = `> ~ ${input}`;

  if (link.hasOwnProperty(input)) {
    window.location.replace(`${link[input]}`);
    return;
  }

  if (!cmd.hasOwnProperty(input)) {
    if (input.length > 45)
      output += `<div class="code userOutput outputLine">command not found</div>`;
    if (input.length <= 45)
      output += `<div class="code userOutput outputLine">command ${input} not found</div>`;

    if (input == "clear") {
      const usrOutput = document.querySelectorAll(".userOutput");
      usrOutput.forEach((userOutput) => {
        userOutput.remove();
      });
      return;
    }

    if (input == "boom") {
      var audio = new Audio("./resources/boom.mp3");
      audio.play();
      return;
    }
  } else {
    output = output + cmd[input];
  }
  terminalOutput.innerHTML = `${terminalOutput.innerHTML}<div class="code userOutput">${output}</div>`;
};

const key = function keyEvent(e) {
  const input = userInput.innerHTML;

  if (keyCode.includes(e.keyCode)) {
    return;
  }

  if (e.key === "Enter") {
    preform(input);
    userInput.innerText = "";
    return;
  }

  userInput.innerText = input + e.key;
};

const backspace = function backSpace(e) {
  if (e.keyCode !== 8 && e.keyCode !== 46) {
    return;
  }
  userInput.innerHTML = userInput.innerHTML.slice(
    0,
    userInput.innerHTML.length - 1
  );
};

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", keyBoard);
