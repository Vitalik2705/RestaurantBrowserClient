import '../styles/Login.css';
import {Button, Carousel, Form, Input} from "antd";
import Carousel1 from "../images/carousel1.webp";
import Carousel2 from "../images/carousel2.webp";
import Carousel3 from "../images/carousel3.jpg";
import Carousel4 from "../images/carousel4.jpg";
import {emailValidator, passwordValidator} from "../utils/utils";
import {useNavigate} from "react-router-dom";
import {loginRequest} from "../api/UserService";

const Login = () => {
    const photos = [Carousel1, Carousel2, Carousel3, Carousel4]
    const history = useNavigate();

    const onFinish = async (values) => {
        const {email, password} = values;
        const requestBody = {
            email: email,
            password: password
        };

        await loginRequest(requestBody, history);
    };


    const handleGoogleLogin = () => {
        const redirectUri = encodeURIComponent("http://localhost:8081/login/oauth/code/google");
        window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=3544813198-28q2158enf04ssgrreaos6a3a6n0te4g.apps.googleusercontent.com&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;
    }

    return (
        <div className="login">
            <div className="login-content">
                <Carousel className="login-carousel" effect="fade" dotPosition="bottom" autoplay autoplaySpeed={3000}>
                    {photos.map((photo, index) => (
                        <div key={index}>
                            <img className="login-carousel-element" src={photo} alt={`Photo ${index + 1}`}/>
                        </div>
                    ))}
                </Carousel>
                <div className="login-data">
                    <div className="login-head">
                        <Form className="login-form" onFinish={onFinish}>
                            <div className="login-head-wrapper">
                                <div className="login-head-name">RestaurantBrowser</div>
                                <div className="login-head-text">Логін</div>
                            </div>
                            <Form.Item
                                name="email"
                                rules={[
                                    {required: true, message: 'Будь ласка, введіть ваш email'},
                                    {...emailValidator},
                                ]}
                                className="login-input"
                            >
                                <Input size="large" placeholder="Введіть email"/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {required: true, message: 'Будь ласка, введіть ваш пароль'},
                                    {validator: passwordValidator},
                                ]}
                                className="login-input"
                            >
                                <Input.Password size="large" placeholder="Введіть пароль"/>
                            </Form.Item>
                            <div className="login-button-wrapper">
                                <Button htmlType="submit" className="login-btn">
                                    ЛОГІН
                                </Button>
                            </div>
                        </Form>
                        <div className="login-button-wrapper">
                            <Button onClick={handleGoogleLogin} className="login-btn">
                                ВХІД ЧЕРЕЗ ГУГЛ
                            </Button>
                        </div>
                        <a href="/register" className="login-without-account">
                            Ще не маєте акаунта? Зареєструйтесь
                        </a>
                        <div className="login-copyright">
                            &copy; RestaurantBrowser 2024. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Login;