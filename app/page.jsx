import ProfileBox from "./components/ProfileBox/ProfileBox";
import TerminalTopBar from "./components/TerminalWindow/TerminalTopBar";
import TerminalWindow from "./components/TerminalWindow/TerminalWindow";

export default async function Home() {
  return (
    <div className="flex h-full items-center justify-around flex-wrap">
      <ProfileBox />
      <div className="flex flex-col ml-5">
        <TerminalTopBar />
        <TerminalWindow />
      </div>
    </div>
  );
}
