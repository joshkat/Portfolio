"use server";
import cleanupSong from "./cleanupSong";

async function getRecentTracks() {
  const LASTFM_USERNAME = "josh-kat";
  const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
  const getRecentTracksEndpoint = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json`;

  const data = await fetch(getRecentTracksEndpoint, {
    next: { revalidate: 30 },
  });
  const response = await data.json();
  const songName = cleanupSong(response.recenttracks.track[0].name);
  const artistName = cleanupSong(
    response.recenttracks.track[0].artist["#text"]
  );
  const songURL = response.recenttracks.track[0].url;

  return { songName, artistName, songURL };
}

export { getRecentTracks };
