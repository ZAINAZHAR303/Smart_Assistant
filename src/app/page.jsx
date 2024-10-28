import Image from "next/image";
import ChatBox from "./components/ChatBox";
import TypewriterText from "./components/TypewriterText";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-max">
        <h1 className="font-bold text-black max-sm:text-[24px] text-[36px] mt-[40px] mb-[50px] w-[20ch] overflow-hidden whitespace-nowrap border-r-2 border-black animate-typing">
        Welcome to Smart Assistant!
        </h1>
      </div>

      <ChatBox />
    </div>
  );
}
