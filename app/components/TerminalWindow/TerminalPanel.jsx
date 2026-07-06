"use client";
import { useCallback, useRef, useState } from "react";
import TerminalTopBar from "./TerminalTopBar";
import TerminalWindow from "./TerminalWindow";

const DEFAULT_SIZE = { width: 587.5, height: 352 };
const MIN_WIDTH = 320;
const MIN_HEIGHT = 200;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Wraps the top bar + terminal so the window can be dragged by its top bar,
// minimized to a pill, maximized to fill the screen, and resized from its
// edges/corner.
//
// The window is absolutely positioned inside a fixed-size placeholder that
// reserves its default footprint in the flex layout. That way resizing the
// window never reflows the page (e.g. it won't shove the ProfileBox around).
// The window stays mounted throughout so terminal history is preserved.
function TerminalPanel() {
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(DEFAULT_SIZE);

  // Gesture state lives in refs so pointer moves don't trigger re-renders.
  const drag = useRef(null);
  const resize = useRef(null);
  const windowRef = useRef(null);

  // --- drag (top bar) ----------------------------------------------------
  const onPointerDown = useCallback(
    (e) => {
      // Ignore non-primary buttons, the window controls, and maximized mode.
      if (e.button !== 0 || maximized || e.target.closest("[data-no-drag]"))
        return;
      const rect = windowRef.current.getBoundingClientRect();
      drag.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: pos.x,
        originY: pos.y,
        // Screen position the window would have at translate (0,0).
        baseLeft: rect.left - pos.x,
        baseTop: rect.top - pos.y,
        width: rect.width,
        height: rect.height,
      };
      e.currentTarget.setPointerCapture?.(e.pointerId);
    },
    [pos, maximized]
  );

  const onPointerMove = useCallback((e) => {
    const d = drag.current;
    if (!d) return;
    const proposedX = d.originX + (e.clientX - d.startX);
    const proposedY = d.originY + (e.clientY - d.startY);
    // Clamp the resulting on-screen rect inside the viewport.
    const screenLeft = clamp(
      d.baseLeft + proposedX,
      0,
      Math.max(0, window.innerWidth - d.width)
    );
    const screenTop = clamp(
      d.baseTop + proposedY,
      0,
      Math.max(0, window.innerHeight - d.height)
    );
    setPos({ x: screenLeft - d.baseLeft, y: screenTop - d.baseTop });
  }, []);

  const endDrag = useCallback(() => {
    drag.current = null;
  }, []);

  // --- resize (edge / corner handles) ------------------------------------
  const startResize = (dir) => (e) => {
    if (e.button !== 0) return;
    e.stopPropagation(); // don't start a drag
    const rect = windowRef.current.getBoundingClientRect();
    resize.current = {
      startX: e.clientX,
      startY: e.clientY,
      w: size.width,
      h: size.height,
      // Growth is capped so the window can't extend past the viewport edge.
      maxW: window.innerWidth - rect.left,
      maxH: window.innerHeight - rect.top,
      dir,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onResizeMove = useCallback((e) => {
    const r = resize.current;
    if (!r) return;
    setSize({
      width: r.dir.includes("e")
        ? clamp(r.w + (e.clientX - r.startX), MIN_WIDTH, r.maxW)
        : r.w,
      height: r.dir.includes("s")
        ? clamp(r.h + (e.clientY - r.startY), MIN_HEIGHT, r.maxH)
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
  const windowClass = maximized
    ? "fixed inset-3 z-40 flex flex-col"
    : "absolute top-0 left-0 flex flex-col";
  const windowStyle = maximized
    ? undefined
    : {
        width: size.width,
        height: size.height,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      };

  return (
    <>
      {/* Placeholder reserves the default footprint so the flex layout stays
          put while the window is dragged/resized/maximized. */}
      <div
        className={`relative m-5 ${minimized ? "hidden" : ""}`}
        style={{ width: DEFAULT_SIZE.width, height: DEFAULT_SIZE.height }}
      >
        <div ref={windowRef} className={windowClass} style={windowStyle}>
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
              {resizeHandle(
                "s",
                "bottom-0 left-0 w-full h-1.5 cursor-ns-resize"
              )}
              {resizeHandle(
                "se",
                "bottom-0 right-0 h-3 w-3 cursor-nwse-resize"
              )}
            </>
          )}
        </div>
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
