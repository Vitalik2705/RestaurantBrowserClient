import '../styles/Footer.css';
import {Image} from "antd";
import HeaderRestaurantLogo from "../../../images/searching.png";
import Instagram from "../../../images/instagram (1).png";
import Linkedin from "../../../images/linkedin.png";
import Github from "../../../images/github (1).png";
import {useLanguage} from "../../../contexts/LanguageContext";

const Footer = () => {
  const {text} = useLanguage();

  return (
    <>
      <div className="footer">
        <div className="footer-left">
          <div className="footer-logo-name">
            <Image width={42} height={42} src={HeaderRestaurantLogo}/>
            <span>{text.footer.appName}</span>
          </div>
          <div className="footer-copyright">
            {text.footer.copyright}
          </div>
        </div>
        <div className="footer-center">
          <div className="footer-text"><a className="footer-text-link" href="/about/About">{text.footer.aboutUs}</a></div>
          <div className="footer-text"><a className="footer-text-link" href="/public">{text.footer.home}</a></div>
          <div className="footer-text"><a className="footer-text-link" href="/restaurants">{text.footer.restaurants}</a></div>
          <div className="footer-text"><a className="footer-text-link" href="/restaurants/Favourite">{text.footer.favourites}</a></div>
        </div>
        <div className="footer-social-links">
          <div className="footer-text-link-div">
            <a className="footer-text-link" href="https://github.com/Vitalik2705" target="_blank"
               rel="noopener noreferrer">
              <img className="footer-text-img" src={Github} alt="GitHub"/>
            </a>
          </div>
          <div className="footer-text-link-div">
            <a className="footer-text-link" href="https://www.instagram.com/vitalikyatskiv/"
               target="_blank" rel="noopener noreferrer">
              <img className="footer-text-img" src={Instagram} alt="Instagram"/>
            </a>
          </div>
          <div className="footer-text-link-div">
            <a className="footer-text-link"
               href="https://www.linkedin.com/in/vitalii-yatskiv-686a63249/" target="_blank"
               rel="noopener noreferrer">
              <img className="footer-text-img" src={Linkedin} alt="LinkedIn"/>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;