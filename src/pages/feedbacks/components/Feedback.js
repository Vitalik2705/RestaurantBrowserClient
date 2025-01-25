import {Popconfirm, Rate} from "antd";
import '../styles/Feedback.css';
import {DeleteOutlined} from "@ant-design/icons";
import {deleteFeedback} from "../../../api/FeedbackService";
import {useLanguage} from "../../../contexts/LanguageContext";

const Feedback = ({feedback}) => {
  const { text, language } = useLanguage();

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return new Date(dateString).toLocaleString(language === 'uk' ? 'uk-UA' : 'en-US', options);
  };

  const handleDelete = () => {
    deleteFeedback(feedback.feedbackId);
    window.location.reload();
  };

  return (
    <div className="feedback-item">
      <div className="feedback-item-header">
        <div className="feedback-user">{feedback.user.name} {feedback.user.surname}</div>
        <div className="feedback-feedback-item-header-wrapper">
          <div className="feedback-date">{formatDate(feedback.date)}</div>
          <div className="feedback-delete">
            <Popconfirm
              title={text.feedback.deleteConfirmTitle}
              description={text.feedback.deleteConfirmDescription}
              okText={text.feedback.yes}
              cancelText={text.feedback.no}
              onConfirm={handleDelete}
            >
              {feedback.user.id == localStorage.getItem('userId') && (
                <DeleteOutlined style={{cursor: 'pointer'}}/>
              )}
            </Popconfirm>
          </div>
        </div>
      </div>
      <div className="feedback-rating">
        <Rate allowHalf value={feedback.rating} disabled/>
      </div>
      <div className="feedback-text-header">{text.feedback.commentHeader}</div>
      <div className="feedback-description feedback-text">{feedback.description}</div>
      <div className="feedback-wrapper">
        <div className="feedback-text-header">{text.feedback.advantagesHeader}:</div>
        <div className="feedback-advantages feedback-text">{feedback.advantages}</div>
      </div>
      <div className="feedback-wrapper">
        <div className="feedback-text-header">{text.feedback.disadvantagesHeader}:</div>
        <div className="feedback-disadvantages feedback-text">{feedback.disadvantages}</div>
      </div>
    </div>
  );
};

export default Feedback;