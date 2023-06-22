import "../css/TerminalTopBar.css";

function TerminalTopBar() {
  return (
    <>
      {/* Needs 3 bubbles on the left for controls, center displaying "folder_browser@katayev.io" */}
      <div id="terminal-bar">
        <div id="window-controls">
          <div className="red circle"></div>
          <div className="yellow circle"></div>
          <div className="green circle"></div>
        </div>
        <div className="center-text">
          <img src="/devFolder.png" alt="f" className="folder-img" />
          <span>user@katayev.io</span>
        </div>
      </div>
    </>
  );
}

export default TerminalTopBar;
