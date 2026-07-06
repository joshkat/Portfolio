"use client";
import { useCallback, useRef, useState } from "react";
import TerminalTopBar from "./TerminalTopBar";
import TerminalWindow from "./TerminalWindow";

const DEFAULT_SIZE = { width: 587.5, height: 352 };
const MIN_WIDTH = 320;
const MIN_HEIGHT = 200;

// Wraps the top bar + terminal so the window can be dragged by its top bar,
// minimized to a pill, maximized to fill the screen, and resized from its
// edges/corner. The window stays mounted throughout so terminal history is
// preserved.
function TerminalPanel() {
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(DEFAULT_SIZE);

  // Gesture state lives in refs so pointer moves don't trigger re-renders.
  const drag = useRef(null);
  const resize = useRef(null);

  // --- drag (top bar) ----------------------------------------------------
  const onPointerDown = useCallback(
    (e) => {
      // Ignore non-primary buttons, the window controls, and maximized mode.
      if (e.button !== 0 || maximized || e.target.closest("[data-no-drag]"))
        return;
      drag.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: pos.x,
        originY: pos.y,
      };
      e.currentTarget.setPointerCapture?.(e.pointerId);
    },
    [pos, maximized]
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

  // --- resize (edge / corner handles) ------------------------------------
  const startResize = (dir) => (e) => {
    if (e.button !== 0) return;
    e.stopPropagation(); // don't start a drag
    resize.current = {
      startX: e.clientX,
      startY: e.clientY,
      w: size.width,
      h: size.height,
      dir,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onResizeMove = useCallback((e) => {
    const r = resize.current;
    if (!r) return;
    setSize({
      width: r.dir.includes("e")
        ? Math.max(MIN_WIDTH, r.w + (e.clientX - r.startX))
        : r.w,
      height: r.dir.includes("s")
        ? Math.max(MIN_HEIGHT, r.h + (e.clientY - r.startY))
        : r.h,
    });
  }, []);

  const endResize = useCallback(() => {
    resize.current = null;
  }, []);

  const resizeHandle = (dir, className) => (
    <div
      data-no-drag
      onPointerDown={startResize(dir)}
      onPointerMove={onResizeMove}
      onPointerUp={endResize}
      onPointerCancel={endResize}
      className={`absolute touch-none ${className}`}
    />
  );

  // Maximizing keeps `pos`/`size` in state and simply stops applying them, so
  // pressing green again restores the window to exactly where/what it was.
  const panelClass = maximized
    ? "fixed inset-3 z-40 flex flex-col"
    : "relative flex flex-col m-5";
  const panelStyle = maximized
    ? undefined
    : {
        width: size.width,
        height: size.height,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      };

  return (
    <>
      <div
        className={`${panelClass} ${minimized ? "hidden" : ""}`}
        style={panelStyle}
      >
        <TerminalTopBar
          onMinimize={() => setMinimized(true)}
          onMaximize={() => setMaximized((m) => !m)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        />
        <TerminalWindow />

        {!maximized && (
          <>
            {resizeHandle("e", "top-0 right-0 h-full w-1.5 cursor-ew-resize")}
            {resizeHandle("s", "bottom-0 left-0 w-full h-1.5 cursor-ns-resize")}
            {resizeHandle(
              "se",
              "bottom-0 right-0 h-3 w-3 cursor-nwse-resize"
            )}
          </>
        )}
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
