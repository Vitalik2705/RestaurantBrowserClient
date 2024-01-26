import '../styles/Register.css';
import {Button, Carousel, Form, Input} from "antd";
import {emailValidator, firstNameValidator, lastNameValidator, passwordValidator} from "../utils/utils";
import Carousel1 from "../images/carousel1.webp";
import Carousel2 from "../images/carousel2.webp";
import Carousel3 from "../images/carousel3.jpg";
import Carousel4 from "../images/carousel4.jpg";
import {useNavigate} from "react-router-dom";
import {loginRequest, registrationRequest} from "../api/UserService";

function Register() {
    const photos = [Carousel1, Carousel2, Carousel3, Carousel4]
    const history = useNavigate();

    const onFinish = async (values) => {
        const {name, surname, email, password} = values;
        const requestBody = {
            name: name,
            surname: surname,
            email: email,
            password: password,
        };

        await registrationRequest(requestBody, history);
    };

    return (
        <div className="register">
            <div className="login-content">
                <Carousel className="register-carousel" effect="fade" dotPosition="bottom" autoplay autoplaySpeed={3000}>
                    {photos.map((photo, index) => (
                        <div key={index}>
                            <img className="register-carousel-element" src={photo} alt={`Photo ${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
                <div className="register-data">
                    <div className="login-head">
                        <Form className="login-form" onFinish={onFinish}>
                            <div className="login-head-wrapper">
                                <div className="login-head-name">RestaurantBrowser</div>
                                <div className="login-head-text">Реєстрація</div>
                            </div>
                            <Form.Item
                                name="name"
                                rules={[
                                    { required: true, message: 'Будь ласка, введіть ваше ім\'я' },
                                    { ...firstNameValidator },
                                ]}
                                className="login-input"
                            >
                                <Input size="large"  placeholder="Введіть ім'я" />
                            </Form.Item>
                            <Form.Item
                                name="surname"
                                rules={[
                                    { required: true, message: 'Будь ласка, введіть ваше прізвище' },
                                    { ...lastNameValidator },
                                ]}
                                className="login-input"
                            >
                                <Input size="large"  placeholder="Введіть прізвище" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Будь ласка, введіть ваш email' },
                                    { ...emailValidator },
                                ]}
                                className="login-input"
                            >
                                <Input size="large"  placeholder="Введіть email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: 'Будь ласка, введіть ваш пароль' },
                                    { validator: passwordValidator },
                                ]}
                                className="login-input"
                            >
                                <Input.Password size="large" placeholder="Введіть пароль" />
                            </Form.Item>
                            <div className="login-button-wrapper">
                                <Button htmlType="submit" className="login-btn">
                                    РЕЄСТРАЦІЯ
                                </Button>
                            </div>
                        </Form>
                        <a href="/login" className="login-without-account">
                            Є акаунт? Увійдіть
                        </a>
                        <div className="login-copyright">
                            &copy; RestaurantBrowser 2024. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;