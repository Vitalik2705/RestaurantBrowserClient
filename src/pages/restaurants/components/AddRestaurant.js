import uk_UA from 'antd/locale/uk_UA';
import React, { useEffect, useState } from "react";
import '../styles/AddRestaurant.css';
import {Button, Checkbox, ConfigProvider, Form, Input, InputNumber, Modal, Select, Space, TimePicker} from "antd";
import TextArea from "antd/es/input/TextArea";
import cuisineTranslation from "../../../data/cuisineTranslation.json"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { addRestaurant } from "../../../api/RestaurantService";
import { getUserRequest } from "../../../api/UserService";
import {useLanguage} from "../../../contexts/LanguageContext";

const AddRestaurant = () => {
  const { text } = useLanguage();
  const [open, setOpen] = useState(false);
  const [feedbackForm] = Form.useForm();
  const { Option } = Select;
  const [user, setUser] = useState();

  const getUser = async () => {
    const response = await getUserRequest();
    setUser(response);
  };

  useEffect(() => {
    getUser();
  }, []);

  const isAdmin = user && user.roles && user.roles.some(role => role.name === 'ROLE_ADMIN' || role.name === 'ADMIN');

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    feedbackForm.resetFields();
  };

  const onFinish = async (values) => {
    const { name, description, address, cuisineType, diningTables, website, contactInfo, menu, priceCategory } = values;

    const addressObject = {
      formattedAddress: address.formattedAddress,
      latitude: address.latitude,
      longitude: address.longitude,
      city: address.city,
      country: address.country
    };

    const formattedWorkHours = Object.keys(text.addRestaurant.workHours.days).map(day => {
      if (values[`${day}-dayOff`]) {
        return {
          dayOfWeek: day.toUpperCase(),
          dayOff: true
        };
      }
      return {
        dayOfWeek: day.toUpperCase(),
        startTime: values[`${day}-start`].format('HH:mm'),
        endTime: values[`${day}-end`].format('HH:mm'),
        dayOff: false
      };
    });

    const formattedDiningTables = diningTables.map(table => ({
      capacity: table.capacity
    }));

    const requestBody = {
      name,
      description,
      address: addressObject,
      cuisineType,
      priceCategory,
      workHours: formattedWorkHours,
      rating: 0,
      diningTables: formattedDiningTables,
      website,
      contactInfo: {
        phoneNumber: contactInfo.phoneNumber,
        email: contactInfo.email
      },
      menu,
      popularityCount: 0,
      photos: []
    };

    try {
      await addRestaurant(requestBody, localStorage.getItem("userId"));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  };

  return (
    <ConfigProvider locale={uk_UA}>
      <div className="add-restaurant-modal">
        {isAdmin && (
          <Button size="large" className="add-restaurant-modal-button" onClick={showModal}>
            {text.addRestaurant.button}
          </Button>
        )}
        <Modal
          open={open}
          title={text.addRestaurant.modalTitle}
          onCancel={handleCancel}
          width={650}
          footer={null}
        >
          <Form form={feedbackForm} onFinish={onFinish}>
            <div className="add-restaurant-header">{text.addRestaurant.name.label}</div>
            <Form.Item
              name="name"
              rules={[
                {required: true, message: text.addRestaurant.name.error},
                {max: 50, message: text.addRestaurant.name.maxLengthError}
              ]}
            >
              <Input className="add-restaurant-input" placeholder={text.addRestaurant.name.placeholder}/>
            </Form.Item>

            <div className="add-restaurant-header">{text.addRestaurant.description.label}</div>
            <Form.Item
              name="description"
              rules={[
                {required: true, message: text.addRestaurant.description.error},
              ]}
            >
              <TextArea
                showCount
                maxLength={1000}
                placeholder={text.addRestaurant.description.placeholder}
                className="add-restaurant-textarea"
                style={{resize: 'none'}}
              />
            </Form.Item>

            <div className="add-restaurant-header">{text.addRestaurant.address.label}</div>
            <Form.Item
              name={["address", "formattedAddress"]}
              rules={[{required: true, message: text.addRestaurant.address.error}]}
            >
              <Input className="add-restaurant-input" placeholder={text.addRestaurant.address.placeholder}/>
            </Form.Item>

            <div className="add-restaurant-header">{text.addRestaurant.city.label}</div>
            <Form.Item
              name={["address", "city"]}
              rules={[{required: true, message: text.addRestaurant.city.error}]}
            >
              <Input className="add-restaurant-input" placeholder={text.addRestaurant.city.placeholder}/>
            </Form.Item>

            <Form.Item
              name={["address", "country"]}
              initialValue="Україна"
              hidden
            >
              <Input/>
            </Form.Item>

            <div className="add-restaurant-header">{text.addRestaurant.address.latitude}</div>
            <Form.Item
              name={["address", "latitude"]}
              rules={[{required: true}]}
            >
              <InputNumber className="add-restaurant-input" placeholder="Широта"/>
            </Form.Item>

            <div className="add-restaurant-header">{text.addRestaurant.address.longitude}</div>
            <Form.Item
              name={["address", "longitude"]}
              rules={[{required: true}]}
            >
              <InputNumber className="add-restaurant-input" placeholder="Довгота"/>
            </Form.Item>

            <div className="add-restaurant-header">{text.addRestaurant.workHours.label}</div>
            {Object.entries(text.addRestaurant.workHours.days).map(([day, dayName]) => (
              <div key={day}>
                <div className="day-header">
                  {dayName}
                </div>

                <Space>
                  <Form.Item
                    name={`${day}-dayOff`}
                    valuePropName="checked"
                  >
                    <Checkbox>{text.addRestaurant.workHours.dayOff}</Checkbox>
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues[`${day}-dayOff`] !== currentValues[`${day}-dayOff`]
                    }
                  >
                    {({ getFieldValue }) => {
                      const isDayOff = getFieldValue(`${day}-dayOff`);
                      return !isDayOff && (
                        <Space>
                          <Form.Item
                            name={`${day}-start`}
                            rules={[{required: !isDayOff, message: text.addRestaurant.workHours.startError}]}
                          >
                            <TimePicker
                              className="add-restaurant-time-picker"
                              format="HH:mm"
                              placeholder={text.addRestaurant.workHours.start}
                            />
                          </Form.Item>
                          <Form.Item
                            name={`${day}-end`}
                            rules={[{required: !isDayOff, message: text.addRestaurant.workHours.endError}]}
                          >
                            <TimePicker
                              className="add-restaurant-time-picker"
                              format="HH:mm"
                              placeholder={text.addRestaurant.workHours.end}
                            />
                          </Form.Item>
                        </Space>
                      );
                    }}
                  </Form.Item>
                </Space>
              </div>
            ))}

            <div className="add-restaurant-header">{text.addRestaurant.cuisineType.label}</div>
            <Form.Item
              name="cuisineType"
              rules={[
                {required: true, message: text.addRestaurant.cuisineType.error},
              ]}
            >
              <Select
                className="add-restaurant-select"
                placeholder={text.addRestaurant.cuisineType.placeholder}
              >
                {Object.entries(cuisineTranslation.cuisineTypes).map(([key, value]) => (
                  <Option key={key} value={key}>{value}</Option>
                ))}
              </Select>
            </Form.Item>

            <div className="add-restaurant-header">{text.addRestaurant.priceCategory.label}</div>
            <Form.Item
              name="priceCategory"
              rules={[
                {required: true, message: text.addRestaurant.priceCategory.error},
              ]}
            >
              <Select
                className="add-restaurant-select"
                placeholder={text.addRestaurant.priceCategory.placeholder}
              >
                <Option value="LOW">$</Option>
                <Option value="MEDIUM">$$</Option>
                <Option value="HIGH">$$$</Option>
              </Select>
            </Form.Item>

            <div className="add-restaurant-header">{text.addRestaurant.tables.label}</div>
            <Form.List name="diningTables">
              {(fields, {add, remove}) => (
                <>
                  {fields.map(({key, name, fieldKey, ...restField}) => (
                    <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'capacity']}
                        fieldKey={[fieldKey, 'capacity']}
                        rules={[{required: true, message: text.addRestaurant.tables.capacity.error}]}
                      >
                        <InputNumber placeholder={text.addRestaurant.tables.capacity.placeholder}/>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)}/>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined/>}>
                      {text.addRestaurant.tables.addButton}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <div className="add-restaurant-header">{text.addRestaurant.website.label}</div>
            <Form.Item
              name="website"
              rules={[
                {required: true, message: text.addRestaurant.website.error},
              ]}
            >
              <Input className="add-restaurant-input" placeholder={text.addRestaurant.website.placeholder}/>
            </Form.Item>

            <div className="add-restaurant-header">{text.addRestaurant.contactInfo.label}</div>
            <Form.Item
              name={['contactInfo', 'phoneNumber']}
              label={text.addRestaurant.contactInfo.phone.label}
              rules={[{message: text.addRestaurant.contactInfo.phone.error}]}
            >
              <Input placeholder={text.addRestaurant.contactInfo.phone.placeholder}/>
            </Form.Item>
            <Form.Item
              name={['contactInfo', 'email']}
              label={text.addRestaurant.contactInfo.email.label}
              rules={[{message: text.addRestaurant.contactInfo.email.error}]}
            >
              <Input placeholder={text.addRestaurant.contactInfo.email.placeholder}/>
            </Form.Item>

            <div className="add-restaurant-header">{text.addRestaurant.menu.label}</div>
            <Form.Item
              name="menu"
              rules={[
                {required: true, message: text.addRestaurant.menu.error},
              ]}
            >
              <Input className="add-restaurant-input" placeholder={text.addRestaurant.menu.placeholder}/>
            </Form.Item>

            <div className="add-restaurant-modal-button-wrapper-panel">
              <Button size="large" className="add-restaurant-modal-button" htmlType="submit">
                {text.addRestaurant.buttons.add}
              </Button>
              <Button size="large" className="add-restaurant-modal-button" htmlType="reset">
                {text.addRestaurant.buttons.cancel}
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default AddRestaurant;