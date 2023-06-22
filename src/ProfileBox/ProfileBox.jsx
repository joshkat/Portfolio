import RedirectIcon from "./RedirectIcon";
import "../css/ProfileBox.css";

function ProfileBox() {
  return (
    <>
      <div className="root">
        {/*This div is split into three parts, photo, title and links */}
        <img
          className="profile_image"
          src="/picture.jpg"
          alt="profile_picture"
        />
        <p style={{ textAlign: "center", color: "white" }}>
          {" "}
          <strong> Joshua Katayev </strong> <br /> <em> Developer </em>{" "}
        </p>
        <div className="socials">
          <RedirectIcon
            url="mailto: joshua02k@gmail.com"
            alt="email"
            src="/social_icons/email.png"
          />
          <RedirectIcon
            url="https://www.linkedin.com/in/joshkat/"
            alt="linkedin"
            src="/social_icons/linkedin_inverted.png"
          />
          <RedirectIcon
            url="https://github.com/joshkat"
            alt="github"
            src="/social_icons/github.png"
          />
        </div>
      </div>
    </>
  );
}

export default ProfileBox;
