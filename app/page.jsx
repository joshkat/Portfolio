import ProfileBox from "./components/ProfileBox/ProfileBox";
import TerminalPanel from "./components/TerminalWindow/TerminalPanel";

export default async function Home() {
  return (
    <div className="flex h-full items-center justify-around flex-wrap">
      <ProfileBox />
      <TerminalPanel />
    </div>
  );
}
