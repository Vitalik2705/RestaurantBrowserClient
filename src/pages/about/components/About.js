import '../styles/About.css';
import MyPhoto from "../../../images/my-photo.jpg"
import {useLanguage} from "../../../contexts/LanguageContext";

const About = () => {
  const { text } = useLanguage();

  return (
    <>
      <div className="about">
        <div className="about-first-part">
          <div className="about-us-header">{text.about.title}</div>
          <div className="about-first-part-container">
            <div className="about-us-text">
              {text.about.description}
            </div>
            <div className="about-us-img">
              <img src={MyPhoto} alt={text.about.title} />
            </div>
          </div>
        </div>
        <div className="about-second-part">
          <div className="about-contact-info-container">
            <div className="about-contact-info-header">
              {text.about.contactInfo.title}
            </div>
            <div className="about-contact-info-text">
              {text.about.contactInfo.email}
            </div>
            <div className="about-contact-info-text">
              {text.about.contactInfo.phone}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;