"use client";
import Link from "next/link";
import { useState } from "react";

function MusicBox({ songName, artistName, songURL }) {
  const [isHovering, setIsHovering] = useState(false);
  const cleanSongArray = [
    "keshi - LIMBO",
    "Green Day - Burnout",
    "Polyphia - Playing God",
    "Ishay Ribo - סיבת הסיבות",
    "Weezer - Only in Dreams",
    "Frank Ocean - Moon River",
    "Post Malone - Buyer Beware",
    "The Strokes - What Ever Happened?",
    "Arctic Monkeys - Fluorescent Adolescent",
    "The Velvet Underground - Oh! Sweet Nuthin'",
  ];
  return (
    <>
      <div
        className="relative flex items-center text-white"
        onMouseEnter={() => {
          if (window.innerWidth < 868) {
            return;
          }
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          if (window.innerWidth < 868) {
            return;
          }
          setIsHovering(false);
        }}
      >
        <div className="text-center ml-1 mr-1">
          <Link href="https://www.last.fm/user/josh-kat" target="_blank">
            🎵
          </Link>
        </div>
        {isHovering && (
          <div className="ml-2 whitespace-nowrap opacity-100 transition-opacity duration-300 italic">
            {songName.includes("*") === false &&
            artistName.includes("*") === false ? (
              <Link href={songURL} target="_blank">
                {artistName} - {songName}
              </Link>
            ) : (
              <p>{cleanSongArray[Math.floor(Math.random() * 10)]}</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default MusicBox;
