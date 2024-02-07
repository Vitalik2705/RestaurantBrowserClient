import '../styles/Home.css';
import HomeMainPhoto from "../images/split-cover.jpg";
import Carousel1 from "../images/carousel1.webp";
import Carousel2 from "../images/carousel2.webp";
import Carousel3 from "../images/carousel3.jpg";
import Carousel4 from "../images/carousel4.jpg";
import {Anchor, Button, Carousel, Collapse, ConfigProvider, Image, Tour} from "antd";
import {PlayCircleOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import HomeCarousel from "./HomeCarousel";
import uk_UA from 'antd/locale/uk_UA';
import {useEffect, useRef, useState} from "react";
import {checkTokenValidity} from "../utils/validation";

const Home = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const [open, setOpen] = useState(false);

    const slidesCarousel1 = [
        {
            header: 'Чому наш сайт?',
            text: 'Відкрийте для себе найбільший вибір ресторанів у Львові. Чи ви бажаєте спробувати страви місцевої кухні чи міжнародні страви, ми маємо все необхідне. Досліджуйте, обирайте та насолоджуйтеся чудовими враженнями від їжі.'
        },
        {
            header: '200+ ресторанів',
            text: 'Досліджуйте різноманітну колекцію з понад 200 ресторанів у Львові. Від затишних кафе до ресторанів преміум-класу - наша платформа пропонує багатий вибір кулінарних варіантів для задоволення будь-якого смаку.'
        },
        {
            header: 'Всі види кухонь',
            text: 'Випадайте в гастрономічну подорож з нашою платформою, яка пропонує широкий спектр кухонь, щоб задовольнити будь-який смак. Від традиційних страв місцевої кухні до екзотичних міжнародних смаків, RestaurantBrowser забезпечує чудовий дегустаційний досвід для всіх.'
        },
    ];

    const slidesCarousel2 = [
        {
            header: 'Оберіть свій улюблений',
            text: 'Відкрийте для себе різноманітні ресторани та оберіть свій улюблений з нашого обширного списку.'
        },
        {
            header: 'Сортуйте за рейтингом',
            text: 'Досліджуйте ресторани, які оцінені нашими користувачами, і знаходьте найкращі місця у Львові.'
        },
        {
            header: 'Сортуйте за популярністю',
            text: 'Перевірте найпопулярніші ресторани у Львові та дізнайтеся, де їдять всі.'
        }
    ];

    const slidesCarousel3 = [
        {
            header: 'Пошук за назвою',
            text: 'Знайдіть свій улюблений ресторан, шукаючи його назву та отримуйте детальну інформацію про нього.'
        },
        {
            header: 'Найбільший сайт в Україні з цієї теми',
            text: 'Відкрийте для себе найбільшу платформу в Україні, присвячену наданню інформації про ресторани.'
        },
        {
            header: 'Дайте свої відгуки',
            text: 'Поділіться своїми думками та враженнями, надаючи відгуки про ресторани, які ви відвідали.'
        }
    ];

    const history = useNavigate();
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        checkTokenValidity(storedToken, history);
    }, []);

    const steps = [
        {
            title: 'Шукайте ресторани на будь-який смак!',
            description: 'Переходьте сюди та шукайте!',
            target: () => ref1.current,
        },
        {
            title: 'Зберігайте в улюблене!',
            description: 'Ви маєте можливість зберігати ресторани, які сподобались, щоб повернутись знову.',
            target: () => ref2.current,
            scrollIntoViewOptions: false
        },
        {
            title: 'Про нас',
            description: 'Ознайомтесь з усіма можливостями сайту.',
            target: () => ref3.current,
            scrollIntoViewOptions: false
        },
    ];

    return (
        <ConfigProvider
            locale={uk_UA}
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
                <Tour zIndex={1500} scrollIntoViewOptions={false} open={open} onClose={() => setOpen(false)}
                      steps={steps}/>
                <div className="home-first-part" id="part-1">
                    <div className="home-left-side-content">
                        <p className="home-left-side-content-header">
                            Найкращі ресторани Львова<br/>
                            Вибирай підходящий для себе та насололджуйся!
                        </p>
                        <p className="home-left-side-content-middle-text">
                            RestaurantBrowser допоможе вам знайти найкращий ресторан!<br/>
                            Більше 100 кафе, ресторанів і т. д. у вашому місті.
                        </p>
                        <div className="home-left-side-content-buttons">
                            <Link to="/restaurants">
                                <Button ref={ref1} size={"large"}>Почати зараз!</Button>
                            </Link>
                            <Button className="home-left-side-content-how-button"
                                    size={"large"} icon={<PlayCircleOutlined/>} onClick={() => setOpen(true)}>
                                Як користуватись?
                            </Button>
                        </div>
                    </div>
                    <div className="home-right-side-content">
                        <Image height={500} width={600} src={HomeMainPhoto}
                               className="home-right-side-content-main-photo"/>
                    </div>
                </div>
                <div className="home-second-part">
                    <div className="home-second-part-collapse">
                        <div className="home-carousel-text">
                            Зберігайте улюблене!
                        </div>
                        <Link to="/favourite">
                            <Button ref={ref2} size={"large"}>До улюбленого!</Button>
                        </Link>
                    </div>
                    <div className="home-carousel-div">
                        <div id="part-2" className="home-carousel-text">
                            Насолоджуйся переглядом найкращих ресторанів
                        </div>
                        <Carousel className="home-carousel" effect="fade" dotPosition={"bottom"} autoplay
                                  autoplaySpeed={3000}>
                            <div>
                                <img className="home-carousel-element" src={Carousel1}/>
                            </div>
                            <div>
                                <img className="home-carousel-element" src={Carousel2}/>
                            </div>
                            <div>
                                <img className="home-carousel-element" src={Carousel3}/>
                            </div>
                            <div>
                                <img id="part-3" className="home-carousel-element" src={Carousel4}/>
                            </div>
                        </Carousel>
                    </div>
                </div>
                <div className="home-multiple-carousel-div" ref={ref3}>
                    <HomeCarousel slides={slidesCarousel1}/>
                    <HomeCarousel slides={slidesCarousel2}/>
                    <HomeCarousel slides={slidesCarousel3}/>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default Home;