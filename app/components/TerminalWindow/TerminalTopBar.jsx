import Image from "next/image";

function TerminalTopBar() {
  const circle = "";
  return (
    <>
      <div className="flex items-center justify-between h-8 rounded-t-md bg-zinc-900">
        <div className="flex justify-around min-w-20">
          <div className="bg-menu-red rounded-full h-3.5 w-3.5"></div>
          <div className="bg-menu-yellow rounded-full h-3.5 w-3.5"></div>
          <div className="bg-menu-green rounded-full h-3.5 w-3.5"></div>
        </div>
        <div className="flex w-full items-center justify-center pr-20 text-zinc-500">
          <Image alt="folder" src={"/devFolder.png"} height={25} width={20} />
          <span className="ml-2">user@katayev.io</span>
        </div>
      </div>
    </>
  );
}

export default TerminalTopBar;
