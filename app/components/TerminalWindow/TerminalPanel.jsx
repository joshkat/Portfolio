"use client";
import { useCallback, useRef, useState } from "react";
import TerminalTopBar from "./TerminalTopBar";
import TerminalWindow from "./TerminalWindow";

// Wraps the top bar + terminal so the window can be dragged around by its top
// bar and minimized to a pill. The window stays mounted while minimized so the
// terminal history is preserved when you reopen it.
function TerminalPanel() {
  const [minimized, setMinimized] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // Drag state lives in a ref so pointer moves don't trigger re-renders.
  const drag = useRef(null);

  const onPointerDown = useCallback(
    (e) => {
      // Ignore non-primary buttons and clicks on the window controls.
      if (e.button !== 0 || e.target.closest("[data-no-drag]")) return;
      drag.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: pos.x,
        originY: pos.y,
      };
      e.currentTarget.setPointerCapture?.(e.pointerId);
    },
    [pos]
  );

  const onPointerMove = useCallback((e) => {
    const d = drag.current;
    if (!d) return;
    setPos({
      x: d.originX + (e.clientX - d.startX),
      y: d.originY + (e.clientY - d.startY),
    });
  }, []);

  const endDrag = useCallback(() => {
    drag.current = null;
  }, []);

  return (
    <>
      <div
        className={`flex flex-col m-5 ${minimized ? "hidden" : ""}`}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      >
        <TerminalTopBar
          onMinimize={() => setMinimized(true)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        />
        <TerminalWindow />
      </div>

      {minimized && (
        <button
          type="button"
          onClick={() => setMinimized(false)}
          aria-label="Reopen terminal"
          className="fixed left-1/2 bottom-8 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm text-zinc-300 shadow-lg transition-colors hover:bg-zinc-800"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-menu-green" />
          user@me.bzh.app
        </button>
      )}
    </>
  );
}

export default TerminalPanel;
