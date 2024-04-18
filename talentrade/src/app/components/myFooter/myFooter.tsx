import './myFooter.css';
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function MyFooter() {
  return (
    <footer id="myFooter">
      <div id="footerLinks">
        <div className="footerCol">
          <h5 className="footerH5">News</h5>
          <h5 className="footerH5">Contact Us</h5>
          <h5 className="footerH5">FAQ</h5>
        </div>
        <div className="footerCol">
          <h5 className="footerH5">About Us</h5>
          <h5 className="footerH5">Sign Up</h5>
          <h5 className="footerH5">Log In</h5>
        </div>
        <div className="footerCol">
          <h5 className="footerH5">Terms</h5>
          <h5 className="footerH5">Privacy Policy</h5>
          <h5 className="footerH5">Cookie Policy</h5>
        </div>
      </div>
      <div>
        <div>
          <FaFacebook className="footerIcons" />
          <FaXTwitter className="footerIcons" />
          <FaInstagram className="footerIcons" />
          <FaLinkedinIn className="footerIcons" />
        </div>
        <div>
          <h1 id='footerH1'>TALENTRADE</h1>
        </div>
      </div>
    </footer>
  );
}