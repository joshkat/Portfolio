"use client";
import { useEffect } from "react";
import { backspace, key } from "./terminalFunctions";
import "../css/TerminalWindow.css";

function TerminalWindow() {
  function focusInput() {
    document.querySelector(".dummyKeyboard").focus();
    document.addEventListener("keydown", backspace);
    document.addEventListener("keypress", key);
  }

  useEffect(() => {
    focusInput();
  }, []);

  return (
    <>
      <div
        className="font-courier text-white h-80 max-w-[635px] bg-black break-words overflow-scroll overflow-x-hidden rounded-b-md"
        id="whole-terminal"
        onClick={focusInput}
      >
        <div className="text-sm ml-2 mr-2">
          <div id="terminalTextArea">
            <p className="mt-3">
              Welcome to katayev.io, type in <span className="help">help</span>{" "}
              to get a list of usable commands
            </p>
            <div className="terminal-line" id="terminal-line"></div>
          </div>
          <div>
            <span className="code terminal-line">&gt; ~ </span>
            <span
              className="user-Input code terminal-line"
              id="userInput"
            ></span>
            <input type="text" className="dummyKeyboard" id="dummy-Keyboard" />
          </div>
        </div>
      </div>
    </>
  );
}

export default TerminalWindow;
