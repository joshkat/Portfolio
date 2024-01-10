"use client";

import RedirectIcon from "./RedirectIcon";
import Image from "next/image";
import MusicBox from "./MusicBox";
import { getRecentTracks } from "./getRecentTracks";
import { useEffect, useState } from "react";

function ProfileBox() {
  const [track, setTrack] = useState({
    songName: "",
    artistName: "",
    songURL: "",
  });

  useEffect(() => {
    async function fetchTrack() {
      const data = await getRecentTracks();
      setTrack({
        songName: data.songName,
        artistName: data.artistName,
        songURL: data.songURL,
      });
    }

    fetchTrack();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-evenly bg-black w-60 h-80 p-5 rounded-2xl">
        {/*This div is split into three parts, photo, title and links */}
        <div className="flex flex-col items-center">
          <Image
            className="rounded-full"
            src={"/picture.webp"}
            alt="profile_photo"
            height={150}
            width={150}
          />
          <div className="relative">
            <div className="flex justify-center absolute left-10 bottom-2 bg-zinc-900 rounded-full p-2 min-w-10 outline outline-1 outline-black">
              <MusicBox
                songName={track.songName}
                artistName={track.artistName}
                songURL={track.songURL}
              />
            </div>
          </div>
        </div>
        <p style={{ textAlign: "center", color: "white" }}>
          {" "}
          <strong> Joshua Katayev </strong> <br /> <em> Developer </em>{" "}
        </p>
        <div className="flex justify-evenly">
          <RedirectIcon
            url="mailto: joshua02k@gmail.com"
            alt="email"
            src="/social_icons/email.webp"
          />
          <RedirectIcon
            url="https://www.linkedin.com/in/joshkat/"
            alt="linkedin"
            src="/social_icons/linkedin_inverted.webp"
          />
          <RedirectIcon
            url="https://github.com/joshkat"
            alt="github"
            src="/social_icons/github.webp"
          />
        </div>
      </div>
    </>
  );
}

export default ProfileBox;
