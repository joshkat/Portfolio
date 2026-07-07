import Image from "next/image";

// The top bar doubles as the window's drag handle (pointer handlers come from
// TerminalPanel). The red and yellow dots minimize, green toggles maximize —
// there is intentionally no close/delete action.
function TerminalTopBar({ onMinimize, onMaximize, ...dragHandlers }) {
  return (
    <div
      className="flex items-center justify-between h-8 rounded-t-md bg-zinc-900 cursor-move select-none touch-none"
      {...dragHandlers}
    >
      <div className="flex justify-around min-w-20" data-no-drag>
        <button
          type="button"
          onClick={onMinimize}
          aria-label="Minimize"
          className="bg-menu-red rounded-full h-3.5 w-3.5"
        />
        <button
          type="button"
          onClick={onMinimize}
          aria-label="Minimize"
          className="bg-menu-yellow rounded-full h-3.5 w-3.5"
        />
        <button
          type="button"
          onClick={onMaximize}
          aria-label="Maximize"
          className="bg-menu-green rounded-full h-3.5 w-3.5"
        />
      </div>
      <div className="flex w-full items-center justify-center pr-20 text-zinc-500">
        <Image alt="folder" src={"/devFolder.png"} height={25} width={20} />
        <span className="ml-2">user@me.bzh.app</span>
      </div>
    </div>
  );
}

export default TerminalTopBar;
