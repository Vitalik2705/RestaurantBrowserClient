import React, { useEffect, useState } from "react";
import '../styles/AddRestaurant.css';
import { Button, Checkbox, Form, Input, InputNumber, Modal, Select, Space, TimePicker, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import cuisineTranslation from "../../../data/cuisineTranslation.json";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useLanguage } from "../../../contexts/LanguageContext";
import moment from 'moment';
import { getRestaurant, updateRestaurant } from "../../../api/RestaurantService";

const EditRestaurant = ({ restaurantId, visible, onClose, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const { text } = useLanguage();
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setInitialData(null);
    }
  }, [visible]);

  useEffect(() => {
    if (visible && restaurantId) {
      fetchRestaurantDetails();
    }
  }, [visible, restaurantId]);

  const fetchRestaurantDetails = async () => {
    try {
      setLoading(true);
      const restaurantById = await getRestaurant(restaurantId);
      const restaurant = restaurantById.data;
      setInitialData(restaurant);

      const formData = {
        name: restaurant.name,
        description: restaurant.description,
        cuisineType: restaurant.cuisineType,
        priceCategory: restaurant.priceCategory,
        website: restaurant.website,
        menu: restaurant.menu,
        address: {
          formattedAddress: restaurant.address?.formattedAddress,
          latitude: restaurant.address?.latitude,
          longitude: restaurant.address?.longitude,
          city: restaurant.address?.city,
        },
        contactInfo: {
          phoneNumber: restaurant.contactInfo?.phoneNumber,
          email: restaurant.contactInfo?.email
        },
        diningTables: restaurant.diningTables?.map(table => ({
          tableId: table.tableId,
          capacity: table.capacity
        })) || []
      };

      const workHoursData = {};
      restaurant.workHours?.forEach(hours => {
        const day = hours.dayOfWeek.toLowerCase();
        if (hours.isDayOff) {
          workHoursData[`${day}-dayOff`] = true;
        } else {
          workHoursData[`${day}-start`] = moment(hours.startTime, 'HH:mm');
          workHoursData[`${day}-end`] = moment(hours.endTime, 'HH:mm');
        }
      });

      setTimeout(() => {
        form.setFieldsValue({
          ...formData,
          ...workHoursData
        });
      }, 500);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
      message.error(text.editRestaurant.errors.fetchError);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const onFinish = async (values) => {
    const { name, description, address, cuisineType, diningTables, website, contactInfo, menu, priceCategory } = values;

    const addressObject = {
      formattedAddress: address.formattedAddress,
      latitude: address.latitude,
      longitude: address.longitude,
      city: address.city,
      country: address.country || 'Україна'
    };

    const formattedWorkHours = Object.keys(text.addRestaurant.workHours.days).map(day => {
      const lowercaseDay = day.toLowerCase();
      if (values[`${lowercaseDay}-dayOff`]) {
        return {
          dayOfWeek: day.toUpperCase(),
          dayOff: true
        };
      }
      return {
        dayOfWeek: day.toUpperCase(),
        startTime: values[`${lowercaseDay}-start`]?.format('HH:mm'),
        endTime: values[`${lowercaseDay}-end`]?.format('HH:mm'),
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
      rating: initialData.rating,
      diningTables: formattedDiningTables,
      website,
      contactInfo: {
        phoneNumber: contactInfo.phoneNumber,
        email: contactInfo.email
      },
      menu,
      popularityCount: initialData.popularityCount,
      photos: initialData.photos || []
    };

    try {
      await updateRestaurant(restaurantId, requestBody);
      message.success(text.editRestaurant.success);
      onUpdateSuccess();
      handleCancel();
    } catch (error) {
      console.error('Error updating restaurant:', error);
      message.error(text.editRestaurant.errors.updateError);
    }
  };

  return (
    <Modal
      open={visible}
      title={text.editRestaurant.modalTitle}
      onCancel={handleCancel}
      width={650}
      footer={null}
      destroyOnClose={true}
      confirmLoading={loading}
    >
      {initialData && (
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{}}
          preserve={false}
        >
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
          {Object.entries(text.addRestaurant.workHours.days).map(([day, dayName]) => {
            const lowercaseDay = day.toLowerCase();
            return (
              <div key={lowercaseDay}>
                <div className="day-header">
                  {dayName}
                </div>
                <Space>
                  <Form.Item
                    name={`${lowercaseDay}-dayOff`}
                    valuePropName="checked"
                  >
                    <Checkbox>{text.addRestaurant.workHours.dayOff}</Checkbox>
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues[`${lowercaseDay}-dayOff`] !== currentValues[`${lowercaseDay}-dayOff`]
                    }
                  >
                    {({ getFieldValue }) => {
                      const isDayOff = getFieldValue(`${lowercaseDay}-dayOff`);
                      return !isDayOff && (
                        <Space>
                          <Form.Item
                            name={`${lowercaseDay}-start`}
                            rules={[{required: !isDayOff, message: text.addRestaurant.workHours.startError}]}
                          >
                            <TimePicker
                              className="add-restaurant-time-picker"
                              format="HH:mm"
                              placeholder={text.addRestaurant.workHours.start}
                            />
                          </Form.Item>
                          <Form.Item
                            name={`${lowercaseDay}-end`}
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
            );
          })}

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
          <Form.List name="diningTables" initialValue={initialData?.diningTables || []}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'capacity']}
                      rules={[{required: true, message: text.addRestaurant.tables.capacity.error}]}
                    >
                      <InputNumber
                        placeholder={text.addRestaurant.tables.capacity.placeholder}
                        min={1}
                        max={20}
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
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
            <Button
              size="large"
              className="add-restaurant-modal-button"
              htmlType="submit"
              loading={loading}
            >
              {text.editRestaurant.buttons.update}
            </Button>
            <Button
              size="large"
              className="add-restaurant-modal-button"
              onClick={handleCancel}
            >
              {text.editRestaurant.buttons.cancel}
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default EditRestaurant;