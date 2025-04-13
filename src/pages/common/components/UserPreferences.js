import React from 'react';
import { Modal, Form, Select, Rate, Input, Button, message } from 'antd';
import { useLanguage } from "../../../contexts/LanguageContext";
import { saveUserPreferences } from "../../../api/userPreferencesService";

const { Option } = Select;

const CuisineType = {
  ITALIAN: { en: 'Italian', uk: 'Італійська' },
  CHINESE: { en: 'Chinese', uk: 'Китайська' },
  MEXICAN: { en: 'Mexican', uk: 'Мексиканська' },
  INDIAN: { en: 'Indian', uk: 'Індійська' },
  UKRAINIAN: { en: 'Ukrainian', uk: 'Українська' },
  INTERNATIONAL: { en: 'International', uk: 'Інтернаціональна' },
  AMERICAN: { en: 'American', uk: 'Американська' }
};

const PriceCategory = {
  LOW: { value: 'LOW', symbol: '$', en: 'Low', uk: 'Економ' },
  MEDIUM: { value: 'MEDIUM', symbol: '$$', en: 'Medium', uk: 'Середній' },
  HIGH: { value: 'HIGH', symbol: '$$$', en: 'High', uk: 'Високий' }
};

const PreferencesModal = ({ open, onClose, userId }) => {
  const [form] = Form.useForm();
  const { text, language } = useLanguage();

  const onFinish = async (values) => {
    try {
      const preferencesData = {
        preferredCuisines: values.preferredCuisines,
        pricePreference: values.pricePreference,
        minimumRating: values.minimumRating,
        city: values.city,
        country: values.country
      };

      await saveUserPreferences(preferencesData, userId);
      message.success(text.preferences.saveSuccess);
      onClose();
    } catch (error) {
      console.error('Error saving preferences:', error);
      message.error(text.preferences.saveError);
    }
  };

  return (
    <Modal
      title={text.preferences.title}
      open={open}
      onCancel={onClose}
      footer={null}
      width={500}
      closable={false}
      maskClosable={false}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="preferences-form"
        initialValues={{
          minimumRating: 4
        }}
      >
        <Form.Item
          name="preferredCuisines"
          label={text.preferences.cuisines.label}
          rules={[{ required: true, message: text.preferences.cuisines.error }]}
        >
          <Select
            mode="multiple"
            placeholder={text.preferences.cuisines.placeholder}
          >
            {Object.entries(CuisineType).map(([key, labels]) => (
              <Option key={key} value={key}>
                {labels[language]}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="pricePreference"
          label={text.preferences.price.label}
          rules={[{ required: true, message: text.preferences.price.error }]}
        >
          <Select placeholder={text.preferences.price.placeholder}>
            {Object.entries(PriceCategory).map(([key, { value, symbol, en, uk }]) => (
              <Option key={key} value={value}>
                {symbol} - {language === 'en' ? en : uk}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="minimumRating"
          label={text.preferences.rating.label}
          rules={[{ required: true, message: text.preferences.rating.error }]}
        >
          <Rate allowHalf />
        </Form.Item>

        <Form.Item
          name="city"
          label={text.preferences.city.label}
          rules={[{ required: true, message: text.preferences.city.error }]}
        >
          <Input placeholder={text.preferences.city.placeholder} />
        </Form.Item>

        <Form.Item
          name="country"
          label={text.preferences.country.label}
          rules={[{ required: true, message: text.preferences.country.error }]}
        >
          <Input placeholder={text.preferences.country.placeholder} />
        </Form.Item>

        <Form.Item className="preferences-form-buttons">
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            {text.preferences.saveButton}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PreferencesModal;