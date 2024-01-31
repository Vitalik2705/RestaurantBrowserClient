import '../styles/About.css';
import MyPhoto from "../images/my-photo.jpg";

const About = () => {

    return (
        <>
            <div className="about">
                <div className="about-first-part">
                    <div className="about-us-header">Про нас</div>
                    <div className="about-first-part-container">
                        <div className="about-us-text">
                            Я, високомотивований Java Developer, хотів би зробити життя українців
                            зручнішим, адже сам
                            неодноразово стикався
                            з проблемою пошуку відповідного закладу для посиденьок у Львові. На цьому сайті ви можете
                            підібрати
                            ресторан
                            згідно ваших уподобань (кухня, місто, рейтинг, популярність), а також дізнатись коротку
                            інформацію
                            про
                            кількість столиків, меню, контактну інформацію, адресу розташування.
                        </div>
                        <div className="about-us-img">
                            <img src={MyPhoto}/>
                        </div>
                    </div>
                </div>
                <div className="about-second-part">
                    <div className="about-contact-info-container">
                        <div className="about-contact-info-header">
                            Контактна інформація
                        </div>
                        <div className="about-contact-info-text">
                            Email: vitok2misze@gmail.com
                        </div>
                        <div className="about-contact-info-text">
                            Номер телефону: +380639968849
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;