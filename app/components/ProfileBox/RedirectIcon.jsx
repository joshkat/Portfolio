'use client'
import "../css/RedirectIcon.css";
import Image from "next/image";

export default function RedirectIcon({ url, alt, src }) {
  function handleClick() {
    window.location.href = url;
  }
  return (
    <Image src={src} alt={alt} onClick={handleClick} className="social_icon" height={40} width={40}/>
  );
}