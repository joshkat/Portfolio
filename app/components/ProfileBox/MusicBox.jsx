"use client";
import { useState } from "react";

function MusicBox({ songName, artistName, songURL }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      className="relative flex items-center text-white"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="text-center ml-1 mr-1">
        <a href="https://www.last.fm/user/josh-kat" target="_blank">
          🎵
        </a>
      </div>
      {isHovering && (
        <div className="ml-2 whitespace-nowrap opacity-100 transition-opacity duration-300 italic">
          {songName.includes("*") === false &&
          artistName.includes("*") === false ? (
            <a href={songURL} target="_blank">
              {artistName} - {songName}
            </a>
          ) : (
            <a
              href="https://www.last.fm/music/Green+Day/_/Burnout"
              target="_blank"
            >
              Green Day - Burnout
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default MusicBox;
