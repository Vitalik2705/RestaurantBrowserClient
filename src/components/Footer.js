import '../styles/Footer.css';
import {Image} from "antd";
import HeaderRestaurantLogo from "../images/searching.png";
import Instagram from "../images/instagram (1).png";
import Linkedin from "../images/linkedin.png";
import Github from "../images/github (1).png";

const Footer = () => {

    return (
        <>
            <div className="footer">
                <div className="footer-container">
                    <div className="footer-logo-name">
                        <Image width={42} height={42} src={HeaderRestaurantLogo}/>
                        <span>RestaurantBrowser</span>
                    </div>
                    <div className="footer-text"><a className="footer-text-link" href="/about">Про нас</a></div>
                    <div className="footer-text"><a className="footer-text-link" href="/">Головна</a></div>
                    <div className="footer-text"><a className="footer-text-link" href="/restaurants">Ресторани</a></div>
                    <div className="footer-text"><a className="footer-text-link" href="/favourite">Улюблене</a></div>
                    <div className="footer-social-links-block">
                        <div className="footer-text">Підписуйтесь на нас</div>
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
                </div>
                <div className="footer-copyright">
                    &copy; RestaurantBrowser 2024.<br/> All rights reserved.
                </div>
            </div>
        </>
    );
};

export default Footer;