import '../styles/AuthCommon.css';
import '../styles/Login.css';
import {Button, Form, Input} from "antd";
import {useNavigate} from "react-router-dom";
import {loginRequest} from "../../../api/UserService";
import {emailValidator, passwordValidator} from "../helpers/authHelper";
import {useLanguage} from "../../../contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Login = () => {
  const history = useNavigate();
  const { text } = useLanguage();

  const onFinish = async (values) => {
    const { email, password } = values;
    const requestBody = {
      email: email,
      password: password
    };

    await loginRequest(requestBody, history);
  };

  return (
    <div className="auth-page login">
        <div className="auth-data login-data">
          <div className="auth-head">
            <Form className="auth-form login-form" onFinish={onFinish}>
              <div className="auth-head-wrapper">
                <div className="auth-head-name">{text.login.appName}</div>
                <div className="auth-head-text">{text.login.title}</div>
                <div className="language-switch-container">
                  <LanguageSwitcher/>
                </div>
              </div>
              <Form.Item
                name="email"
                rules={[
                  {required: true, message: text.login.validations.emailRequired},
                  {...emailValidator},
                ]}
                className="auth-input"
              >
                <Input size="large" placeholder={text.login.emailPlaceholder} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: text.login.validations.passwordRequired },
                  { validator: passwordValidator },
                ]}
                className="auth-input"
              >
                <Input.Password size="large" placeholder={text.login.passwordPlaceholder} />
              </Form.Item>
              <div className="login-button-wrapper">
                <Button htmlType="submit" className="auth-btn">
                  {text.login.buttonText}
                </Button>
              </div>
            </Form>
            <a href="/register" className="auth-switch-account">
              {text.login.noAccountText}
            </a>
            <div className="auth-copyright">
              {text.login.copyright}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Login;