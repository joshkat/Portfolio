"use server";
import cleanupSong from "./cleanupSong";

let cachedTrack = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 100; // 60 seconds

async function getRecentTracks() {
  const currentTime = new Date().getTime();
  if (cachedTrack && currentTime - lastFetchTime < CACHE_DURATION) {
    return cachedTrack;
  }

  const LASTFM_USERNAME = "josh-kat";
  const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
  const getRecentTracksEndpoint = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json`;

  const data = await fetch(getRecentTracksEndpoint, {
    next: { revalidate: 60 },
  });
  const response = await data.json();
  const songName = cleanupSong(response.recenttracks.track[0].name);
  const artistName = cleanupSong(
    response.recenttracks.track[0].artist["#text"]
  );
  const songURL = response.recenttracks.track[0].url;

  cachedTrack = { songName, artistName, songURL };
  lastFetchTime = currentTime;
  return cachedTrack;
}

export { getRecentTracks };
