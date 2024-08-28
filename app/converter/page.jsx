"use client";
import { useState } from "react";

export default function Converter() {
  const [inputText, setInputText] = useState("");
  const [hebrewText, setHebrewText] = useState("");

  // Mapping table from QWERTY to Hebrew keyboard layout
  const qwertyToHebrew = {
    a: "ש",
    b: "נ",
    c: "ב",
    d: "ג",
    e: "ק",
    f: "כ",
    g: "ע",
    h: "י",
    i: "ן",
    j: "ח",
    k: "ל",
    l: "ך",
    m: "צ",
    n: "מ",
    o: "ם",
    p: "פ",
    q: "/",
    r: "ר",
    s: "ד",
    t: "א",
    u: "ו",
    v: "ה",
    w: "'",
    x: "ס",
    y: "ט",
    z: "ז",
    ",": "ת",
    ".": "ץ",
    "/": ".",
  };

  // Function to convert QWERTY text to Hebrew layout
  const convertQwertyToHebrew = (text) => {
    text = text.toLowerCase();
    return text
      .split("")
      .map((char) => qwertyToHebrew[char] || char)
      .join("");
  };

  // Function to handle conversion and update UI
  const handleConvert = () => {
    setHebrewText(convertQwertyToHebrew(inputText));
  };

  return (
    <div className="flex h-full flex-col gap-3 items-center justify-center">
      <h2 className="text-2xl sm:text-3xl text-white text-center">
        QWERTY to Hebrew Converter
      </h2>
      <textarea
        type="text"
        rows="5"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text in QWERTY"
        className="w-3/4"
      />
      <button
        onClick={handleConvert}
        className="pointer-events-auto ml-8 rounded-md bg-gray-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-gray-300"
      >
        Convert
      </button>
      <textarea
        value={hebrewText}
        placeholder="Converted text will appear here"
        rows="4"
        readOnly
        className="w-3/4"
        dir="rtl"
      />
    </div>
  );
}
