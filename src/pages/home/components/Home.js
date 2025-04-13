import '../styles/Home.css';
import HomeMainPhoto from "../../../images/split-cover.jpg";
import Carousel1 from "../../../images/carousel1.webp";
import Carousel2 from "../../../images/carousel2.webp";
import Carousel3 from "../../../images/carousel3.jpg";
import Carousel4 from "../../../images/carousel4.jpg";
import { Anchor, Button, Carousel, ConfigProvider, Image, Tour } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import HomeCarousel from "./HomeCarousel";
import uk_UA from 'antd/locale/uk_UA';
import en_GB from 'antd/locale/en_GB';
import { useEffect, useRef, useState } from "react";
import { checkTokenValidity } from "../../../utils/tokenValidation";
import {useLanguage} from "../../../contexts/LanguageContext";
import PreferencesModal from "../../common/components/UserPreferences";
import {checkUserPreferences} from "../../../api/userPreferencesService";

const Home = () => {
  const { language, text } = useLanguage();
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [open, setOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const history = useNavigate();

  const steps = [
    {
      title: text.home.tour.step1.title,
      description: text.home.tour.step1.description,
      target: () => ref1.current,
    },
    {
      title: text.home.tour.step2.title,
      description: text.home.tour.step2.description,
      target: () => ref2.current,
      scrollIntoViewOptions: false
    },
    {
      title: text.home.tour.step3.title,
      description: text.home.tour.step3.description,
      target: () => ref3.current,
      scrollIntoViewOptions: false
    },
  ];

  const antLocales = {
    uk: uk_UA,
    en: en_GB
  };

  const checkPreferences = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (token && userId) {
      try {
        const hasPreferences = await checkUserPreferences(userId);
        if (!hasPreferences) {
          setShowPreferences(true);
        }
      } catch (error) {
        console.error('Error checking preferences:', error);
      }
    }
  };

  const handlePreferencesClose = async () => {
    setShowPreferences(false);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    checkTokenValidity(storedToken, history);
    checkPreferences();
  }, []);

  return (
    <ConfigProvider
      locale={antLocales[language]}
      theme={{
        components: {
          Button: {
            defaultBg: "#ff6916",
            defaultColor: "#fff",
          },
        },
      }}
    >
      <div className="home">
        <Anchor
          className="home-anchor"
          direction="horizontal"
          items={[
            {
              key: 'part-1',
              href: '#part-1',
              title: '',
            },
            {
              key: 'part-2',
              href: '#part-2',
              title: '',
            },
            {
              key: 'part-3',
              href: '#part-3',
              title: '',
            },
          ]}
        />
        <Tour zIndex={1500} scrollIntoViewOptions={false} open={open} onClose={() => setOpen(false)} steps={steps} />
        <div className="home-first-part" id="part-1">
          <div className="home-left-side-content">
            <p className="home-left-side-content-header">
              {text.home.mainContent.title}
            </p>
            <p className="home-left-side-content-middle-text">
              {text.home.mainContent.subtitle}
            </p>
            <div className="home-left-side-content-buttons">
              <Link to="/restaurants">
                <Button ref={ref1} size={"large"}>{text.home.mainContent.startButton}</Button>
              </Link>
              <Button
                className="home-left-side-content-how-button"
                size={"large"}
                icon={<PlayCircleOutlined />}
                onClick={() => setOpen(true)}
              >
                {text.home.mainContent.howToUseButton}
              </Button>
            </div>
          </div>
          <div className="home-right-side-content">
            <Image
              height={500}
              width={600}
              src={HomeMainPhoto}
              className="home-right-side-content-main-photo"
            />
          </div>
        </div>
        <div className="home-second-part">
          <div ref={ref2} className="home-second-part-collapse">
            <div className="home-carousel-text">
              {text.home.favorites.title}
            </div>
            <Link to="/favourite">
              <Button size={"large"}>{text.home.favorites.button}</Button>
            </Link>
          </div>
          <div className="home-carousel-div">
            <div id="part-2" className="home-carousel-text">
              {text.home.carousel.title}
            </div>
            <Carousel className="home-carousel" effect="fade" dotPosition={"bottom"} autoplay autoplaySpeed={3000}>
              {[Carousel1, Carousel2, Carousel3, Carousel4].map((src, index) => (
                <div key={index}>
                  <img className="home-carousel-element" src={src} alt={`Carousel ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="home-multiple-carousel-div" ref={ref3}>
          <HomeCarousel slides={text.home.infoCarousels.first} />
          <HomeCarousel slides={text.home.infoCarousels.second} />
          <HomeCarousel slides={text.home.infoCarousels.third} />
        </div>
        <PreferencesModal
          open={showPreferences}
          onClose={handlePreferencesClose}
          userId={localStorage.getItem("userId")}
        />
      </div>
    </ConfigProvider>
  );
};

export default Home;