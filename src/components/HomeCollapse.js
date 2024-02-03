import {Button, Collapse, Form, Input} from "antd";
import React, {useState} from 'react';
import '../styles/HomeCollapse.css';

const HomeCollapse = () => {
    const [loginForm] = Form.useForm();
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const {Panel} = Collapse;

    const handlePanelClose = () => {
        setIsPanelOpen(false);
        loginForm.resetFields();
    };

    const handlePanelOpen = () => {
        setIsPanelOpen(true);
    };

    return (
        <Collapse className="home-collapse" activeKey={isPanelOpen ? '1' : null}
                  onChange={isPanelOpen ? handlePanelClose : handlePanelOpen} size={"large"}>
            <Panel className="home-login-panel" header="Get Started!" key="1">
                <Form form={loginForm}>
                    <p className="home-login-panel-header">Email</p>
                    <Form.Item
                        name="email"
                        rules={[
                            {required: true, message: 'Please enter your email'},
                        ]}
                    >
                        <Input size="large"
                               placeholder="Email"/>
                    </Form.Item>
                    <p className="home-login-panel-header">Password</p>
                    <Form.Item
                        name="password"
                        rules={[
                            {required: true, message: 'Please enter your password'},
                        ]}
                    >
                        <Input size="large"
                               placeholder="Password"/>
                    </Form.Item>
                    <div className="home-button-wrapper-panel">
                        <Button size={"large"} className="home-panel-button" htmlType="submit">
                            Login
                        </Button>
                        <Button size={"large"} className="home-panel-button" htmlType="reset">
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Panel>
        </Collapse>
    );
};

export default HomeCollapse;