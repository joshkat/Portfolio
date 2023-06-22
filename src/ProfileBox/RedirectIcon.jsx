import PropTypes from "prop-types";
import "../css/RedirectIcon.css";

export default function RedirectIcon({ url, alt, src }) {
  function handleClick() {
    window.location.href = url;
  }
  return (
    <>
      <img src={src} alt={alt} onClick={handleClick} className="social_icon" />
    </>
  );
}

RedirectIcon.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
};
