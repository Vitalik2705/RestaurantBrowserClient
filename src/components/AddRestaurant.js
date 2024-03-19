import uk_UA from 'antd/locale/uk_UA';
import React, {useEffect, useState} from "react";
import '../styles/AddRestaurant.css';
import {Button, ConfigProvider, Form, Input, InputNumber, Modal, Rate, Select, Space, TimePicker} from "antd";
import TextArea from "antd/es/input/TextArea";
import cuisineTranslation from "../data/cuisineTranslation.json"
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {addRestaurant} from "../api/RestaurantService";

const AddRestaurant = () => {
    const [open, setOpen] = useState(false);
    const [feedbackForm] = Form.useForm();
    // const {id} = useParams();
    // const userId = localStorage.getItem('userId');
    const {Option} = Select;

    const daysOfWeek = {
        MONDAY: 'Понеділок',
        TUESDAY: 'Вівторок',
        WEDNESDAY: 'Середа',
        THURSDAY: 'Четвер',
        FRIDAY: "П'ятниця",
        SATURDAY: 'Субота',
        SUNDAY: 'Неділя'
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        feedbackForm.resetFields();
    };

    const onFinish = async (values) => {
        const {name, description, address, cuisineType, city, diningTables, website, contactInfo, menu} = values;
        const workHours = {};

        ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].forEach(day => {
            const startKey = `${day}-start`;
            const endKey = `${day}-end`;

            if (values[startKey] && values[endKey]) {
                workHours[day] = [values[startKey], values[endKey]];
            }
        });

        const formattedWorkHours = Object.keys(workHours).map(day => ({
            dayOfWeek: day.toUpperCase(),
            startTime: workHours[day][0].format('HH:mm'),
            endTime: workHours[day][1].format('HH:mm')
        }));

        const formattedDiningTables = diningTables.map(table => ({
            capacity: table.capacity
        }));

        const requestBody = {
            name: name,
            description: description,
            address: address,
            cuisineType: cuisineType,
            workHours: formattedWorkHours,
            rating: 0,
            city: city,
            diningTables: formattedDiningTables,
            website: website,
            contactInfo: {
                phoneNumber: contactInfo.phoneNumber,
                email: contactInfo.email
            },
            menu: menu,
            popularityCount: 0,
            photos: []
        };

        try {
            await addRestaurant(requestBody);
        } catch (error) {
            console.error('Помилка при додаванні ресторану:', error);
        }

        console.log(requestBody);
    };

    return (
        <ConfigProvider locale={uk_UA}>
            <div className="add-restaurant-modal">
                <Button size={"large"} className="add-restaurant-modal-button" onClick={showModal}>
                    Додати ресторан
                </Button>
                <Modal
                    open={open}
                    title="Додати ресторан"
                    onCancel={handleCancel}
                    width={650}
                    footer={null}
                >
                    <Form form={feedbackForm} onFinish={onFinish}>
                        <div className="add-restaurant-header">Назва</div>
                        <Form.Item
                            name="name"
                            rules={[
                                {required: true, message: 'Будь ласка, вкажіть назву'},
                            ]}
                        >
                            <Input className="add-restaurant-input" placeholder="Назва"/>
                        </Form.Item>
                        <div className="add-restaurant-header">Опис</div>
                        <Form.Item
                            name="description"
                            rules={[
                                {required: true, message: 'Будь ласка, вкажіть опис'},
                            ]}
                        >
                            <TextArea
                                showCount
                                maxLength={1000}
                                placeholder="Опис"
                                className="add-restaurant-textarea"
                                style={{resize: 'none'}}
                            />
                        </Form.Item>
                        <div className="add-restaurant-header">Адреса</div>
                        <Form.Item
                            name="address"
                            rules={[
                                {required: true, message: 'Будь ласка, введіть адресу'},
                            ]}
                        >
                            <Input className="add-restaurant-input" placeholder="Адреса"/>
                        </Form.Item>
                        <div className="add-restaurant-header">Години роботи</div>
                        {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map(day => (
                            <div key={day}>
                                <Form.Item
                                    key={`${day}-start`}
                                    name={`${day}-start`}
                                    label={`${daysOfWeek[day]} (початок)`}
                                    rules={[{required: true, message: 'Будь ласка, введіть початковий час'}]}
                                >
                                    <TimePicker className="add-restaurant-time-picker" format='HH:mm'/>
                                </Form.Item>
                                <Form.Item
                                    key={`${day}-end`}
                                    name={`${day}-end`}
                                    label={`${daysOfWeek[day]} (кінець)`}
                                    rules={[{required: true, message: 'Будь ласка, введіть кінцевий час'}]}
                                >
                                    <TimePicker className="add-restaurant-time-picker" format='HH:mm'/>
                                </Form.Item>
                            </div>
                        ))}
                        <div className="add-restaurant-header">Тип кухні</div>
                        <Form.Item
                            name="cuisineType"
                            rules={[
                                {required: true, message: 'Будь ласка, виберіть тип кухні'},
                            ]}
                        >
                            <Select className="add-restaurant-select" placeholder="Виберіть тип кухні">
                                {Object.entries(cuisineTranslation.cuisineTypes).map(([key, value]) => (
                                    <Option key={key} value={key}>{value}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <div className="add-restaurant-header">Місто</div>
                        <Form.Item
                            name="city"
                            rules={[
                                {required: true, message: 'Будь ласка, введіть місто'},
                            ]}
                        >
                            <Input className="add-restaurant-input" placeholder="Місто"/>
                        </Form.Item>
                        <div className="add-restaurant-header">Столи</div>
                        <Form.List name="diningTables">
                            {(fields, {add, remove}) => (
                                <>
                                    {fields.map(({key, name, fieldKey, ...restField}) => (
                                        <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'capacity']}
                                                fieldKey={[fieldKey, 'capacity']}
                                                rules={[{required: true, message: 'Будь ласка, введіть місткість'}]}
                                            >
                                                <InputNumber placeholder="Місткість"/>
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)}/>
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined/>}>
                                            Додати стіл
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <div className="add-restaurant-header">Сайт</div>
                        <Form.Item
                            name="website"
                            rules={[
                                {required: true, message: 'Будь ласка, введіть веб-сайт'},
                            ]}
                        >
                            <Input className="add-restaurant-input" placeholder="Сайт"/>
                        </Form.Item>
                        <div className="add-restaurant-header">Контактна інформація</div>
                        <Form.Item
                            name={['contactInfo', 'phoneNumber']}
                            label="Номер телефону"
                            rules={[{message: 'Будь ласка, введіть номер телефону'}]}
                        >
                            <Input placeholder="Номер телефону"/>
                        </Form.Item>
                        <Form.Item
                            name={['contactInfo', 'email']}
                            label="Email"
                            rules={[{message: 'Будь ласка, введіть email'}]}
                        >
                            <Input placeholder="Email"/>
                        </Form.Item>
                        <div className="add-restaurant-header">Меню</div>
                        <Form.Item
                            name="menu"
                            rules={[
                                {required: true, message: 'Будь ласка, введіть меню'},
                            ]}
                        >
                            <Input className="add-restaurant-input" placeholder="Меню"/>
                        </Form.Item>
                        <div className="add-restaurant-modal-button-wrapper-panel">
                            <Button size={"large"} className="add-restaurant-modal-button" htmlType="submit">
                                Додати
                            </Button>
                            <Button size={"large"} className="add-restaurant-modal-button" htmlType="reset">
                                Відмінити
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </ConfigProvider>
    );
};

export default AddRestaurant;