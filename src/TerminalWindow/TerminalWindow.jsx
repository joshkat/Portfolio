import { useEffect } from "react";
import "../css/TerminalWindow.css";

function TerminalWindow() {
  function focusInput(){
    document.querySelector(".dummyKeyboard").focus();
  }

  useEffect(()=>{
    focusInput();
  }, []);

  return (
    <>
      <div className="whole-terminal" onClick={focusInput}>
        <div className="terminal-window primary-bg">
          <div id="terminalTextArea">
            <p className="weclome-message">
              Welcome to katayev.io, type in <span className="help">help</span>{" "}
              to get a list of usable commands
            </p>
            <div className="terminal-line" id="terminal-line"></div>
          </div>
          <div>
            <span className="code terminal-line">&gt; ~ </span>
            <span
              className="user-Input code terminal-line"
              id="userInput"></span>
            <input type="text" className="dummyKeyboard" id="dummy-Keyboard" />
          </div>
        </div>
      </div>
    </>
  );
}

export default TerminalWindow;
