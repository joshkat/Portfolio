"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { runCommand } from "./commands";
import "../css/TerminalWindow.css";

// Shared so the live input line and every echoed history line stay identical.
// The gap after `~` comes from CSS margin (.prompt), not a trailing space: a
// real space collapses at the end of the prompt's flex item and the cursor
// ended up flush against the tilde.
function Prompt() {
  return <span className="code terminal-line prompt">&gt;&nbsp;~</span>;
}

function TerminalWindow() {
  // Each entry is one printed block: the echoed command line + its output.
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");

  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const nextId = useRef(0);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // Keep the newest output in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  const submit = useCallback(() => {
    const raw = input;
    setInput("");

    const ctx = {
      clear: () => setHistory([]),
      redirect: (url) => {
        window.location = url;
      },
      playAudio: (src) => {
        new Audio(src).play();
      },
    };

    const { node, echo } = runCommand(raw, ctx);
    if (!echo) return; // empty input: do nothing

    setHistory((prev) => [
      ...prev,
      { id: nextId.current++, input: raw.trim(), node },
    ]);
  }, [input]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div
      className="font-courier text-white h-80 max-w-[587.5px] bg-black break-words overflow-scroll overflow-x-hidden rounded-b-md font-semibold"
      id="whole-terminal"
      ref={scrollRef}
      onClick={focusInput}
    >
      <div className="text-sm ml-2 mr-2">
        <p className="mt-3">
          Welcome to katayev.io, type in <span className="help">help</span> to
          get a list of usable commands
        </p>

        {history.map((entry) => (
          <div className="code userOutput" key={entry.id}>
            <div className="flex">
              <Prompt />
              <span>{entry.input}</span>
            </div>
            {entry.node != null && (
              <div className="code outputLine">{entry.node}</div>
            )}
          </div>
        ))}

        <div className="flex">
          <Prompt />
          <input
            ref={inputRef}
            type="text"
            className="terminal-input code terminal-line"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="terminal input"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

export default TerminalWindow;
