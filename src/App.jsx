import "./css/App.css";
import ProfileBox from "./ProfileBox/ProfileBox";
import TerminalTopBar from "./TerminalWindow/TerminalTopBar";
import TerminalWindow from "./TerminalWindow/TerminalWindow";

function App() {
  return (
    <>
      <div className="app-root">
        <ProfileBox />
        <div className="terminal-container">
          <TerminalTopBar />
          <TerminalWindow />
        </div>
      </div>
    </>
  );
}

export default App;
