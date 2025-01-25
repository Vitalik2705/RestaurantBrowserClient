import {Button, Form, Input, Modal, Rate} from "antd";
import React, {useState} from "react";
import TextArea from "antd/es/input/TextArea";
import '../styles/FeedbackModal.css';
import {useParams} from "react-router-dom";
import {createFeedback} from "../../../api/FeedbackService";
import {useLanguage} from "../../../contexts/LanguageContext";

const FeedbackModal = () => {
  const [open, setOpen] = useState(false);
  const [feedbackForm] = Form.useForm();
  const {id} = useParams();
  const userId = localStorage.getItem('userId');
  const { text } = useLanguage();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    feedbackForm.resetFields();
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
        {text.feedback.writeReview}
      </Button>
      <Modal
        open={open}
        title={text.feedback.modalTitle}
        onCancel={handleCancel}
        width={450}
        footer={null}
      >
        <Form form={feedbackForm} onFinish={onFinish}>
          <div className="feedback-modal-header">{text.feedback.rateHeader}</div>
          <Form.Item
            name="rate"
            rules={[
              {required: true, message: text.feedback.rateRequired},
            ]}
          >
            <Rate className="feedback-modal-rate"/>
          </Form.Item>
          <div className="feedback-modal-header">{text.feedback.advantagesHeader}</div>
          <Form.Item
            name="advantages"
            rules={[
              {required: true, message: text.feedback.advantagesRequired},
            ]}
          >
            <Input className="feedback-modal-input" placeholder={text.feedback.advantagesPlaceholder}/>
          </Form.Item>
          <div className="feedback-modal-header">{text.feedback.disadvantagesHeader}</div>
          <Form.Item
            name="disadvantages"
            rules={[
              {required: true, message: text.feedback.disadvantagesRequired},
            ]}
          >
            <Input className="feedback-modal-input" placeholder={text.feedback.disadvantagesPlaceholder}/>
          </Form.Item>
          <div className="feedback-modal-header">{text.feedback.commentHeader}</div>
          <Form.Item
            name="comment"
            rules={[
              {required: true, message: text.feedback.commentRequired},
            ]}
          >
            <TextArea
              showCount
              maxLength={500}
              placeholder={text.feedback.commentPlaceholder}
              className="feedback-modal-textarea"
              style={{resize: 'none'}}
            />
          </Form.Item>
          <div className="feedback-modal-button-wrapper-panel">
            <Button size={"large"} className="feedback-modal-button" htmlType="submit">
              {text.feedback.publishButton}
            </Button>
            <Button size={"large"} className="feedback-modal-button" htmlType="reset">
              {text.feedback.cancelButton}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FeedbackModal;