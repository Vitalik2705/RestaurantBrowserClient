import {Button, Form, Input, Modal, Rate} from "antd";
import React, {useState} from "react";
import TextArea from "antd/es/input/TextArea";
import '../styles/FeedbackModal.css';
import {useNavigate, useParams} from "react-router-dom";
import {loginRequest} from "../api/UserService";
import {createFeedback} from "../api/FeedbackService";

const FeedbackModal = () => {
    const [open, setOpen] = useState(false);
    const [feedbackForm] = Form.useForm();
    const {id} = useParams();
    const history = useNavigate();
    const userId = localStorage.getItem('userId');

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        feedbackForm.resetFields();
    };

    const onChange = (e) => {
        console.log('Change:', e.target.value);
    };

    const onFinish = async (values) => {
        const {rate, advantages, disadvantages, comment} = values;

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        const requestBody = {
            rating: rate,
            description: comment,
            advantages: advantages,
            disadvantages: disadvantages,
            date: formattedDate
        };

        await createFeedback(requestBody, id, userId);
        window.location.reload();
    };

    return (
        <div className="feedback-modal">
            <Button size={"large"} className="feedback-modal-button" onClick={showModal}>
                Написати відгук
            </Button>
            <Modal
                open={open}
                title="Відгук"
                onCancel={handleCancel}
                width={450}
                footer={null}
            >
                <Form form={feedbackForm} onFinish={onFinish}>
                    <div className="feedback-modal-header">Поставте оцінку</div>
                    <Form.Item
                        name="rate"
                        rules={[
                            {required: true, message: 'Будь ласка, поставте оцінку'},
                        ]}
                    >
                        <Rate className="feedback-modal-rate"/>
                    </Form.Item>
                    <div className="feedback-modal-header">Переваги</div>
                    <Form.Item
                        name="advantages"
                        rules={[
                            {required: true, message: 'Будь ласка, опишіть переваги'},
                        ]}
                    >
                        <Input className="feedback-modal-input" placeholder="Переваги"/>
                    </Form.Item>
                    <div className="feedback-modal-header">Недоліки</div>
                    <Form.Item
                        name="disadvantages"
                        rules={[
                            {required: true, message: 'Будь ласка, опишіть недоліки'},
                        ]}
                    >
                        <Input className="feedback-modal-input" placeholder="Недоліки"/>
                    </Form.Item>
                    <div className="feedback-modal-header">Коментар</div>
                    <Form.Item
                        name="comment"
                        rules={[
                            {required: true, message: 'Будь ласка, напишіть коментар'},
                        ]}
                    >
                        <TextArea
                            showCount
                            maxLength={500}
                            onChange={onChange}
                            placeholder="Залишіть свій відгук"
                            className="feedback-modal-textarea"
                            style={{resize: 'none'}}
                        />
                    </Form.Item>
                    <div className="feedback-modal-button-wrapper-panel">
                        <Button size={"large"} className="feedback-modal-button" htmlType="submit">
                            Опублікувати
                        </Button>
                        <Button size={"large"} className="feedback-modal-button" htmlType="reset">
                            Відмінити
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default FeedbackModal;