import '../styles/AuthCommon.css';
import '../styles/Register.css';
import {Button, Form, Input} from "antd";
import {useNavigate} from "react-router-dom";
import {registrationRequest} from "../../../api/UserService";
import {emailValidator, firstNameValidator, lastNameValidator, passwordValidator} from "../helpers/authHelper";
import {useLanguage} from "../../../contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

function Register() {
  const history = useNavigate();
  const {text} = useLanguage();

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
    <div className="auth-page register">
      <div className="auth-data register-data">
        <div className="language-switch-container">
          <LanguageSwitcher/>
        </div>
        <div className="auth-head">
          <Form className="auth-form register-form" onFinish={onFinish}>
            <div className="auth-head-wrapper">
              <div className="auth-head-name">{text.register.appName}</div>
              <div className="auth-head-text">{text.register.title}</div>
            </div>
            <Form.Item
              name="name"
              rules={[
                {required: true, message: text.register.firstName.error},
                {...firstNameValidator},
              ]}
              className="auth-input"
            >
              <Input
                size="large"
                placeholder={text.register.firstName.placeholder}
              />
            </Form.Item>
            <Form.Item
              name="surname"
              rules={[
                {required: true, message: text.register.lastName.error},
                {...lastNameValidator},
              ]}
              className="auth-input"
            >
              <Input
                size="large"
                placeholder={text.register.lastName.placeholder}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {required: true, message: text.register.email.error},
                {...emailValidator},
              ]}
              className="auth-input"
            >
              <Input
                size="large"
                placeholder={text.register.email.placeholder}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {required: true, message: text.register.password.error},
                {validator: passwordValidator},
              ]}
              className="auth-input"
            >
              <Input.Password
                size="large"
                placeholder={text.register.password.placeholder}
              />
            </Form.Item>
            <div className="login-button-wrapper">
              <Button htmlType="submit" className="auth-btn">
                {text.register.submitButton}
              </Button>
            </div>
          </Form>
          <a href="/login" className="auth-switch-account">
            {text.register.haveAccount}
          </a>
          <div className="auth-copyright">
            {text.register.copyright}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;