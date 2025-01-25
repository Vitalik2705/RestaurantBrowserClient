import React, {useState, useEffect} from 'react';
import {Button, Form, Input, InputNumber, DatePicker, Modal, message, Table, Tag, Tooltip} from 'antd';
import {ReservationService} from '../../../../api/ReservationService';
import {useLanguage} from "../../../../contexts/LanguageContext";
import {
  CloseCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';

const TableReservation = ({restaurantId, userId}) => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { text } = useLanguage();

  useEffect(() => {
    if (restaurantId) {
      fetchTables();
    }
  }, [restaurantId]);

  const fetchTables = async () => {
    try {
      const data = await ReservationService.getRestaurantTables(restaurantId);
      setTables(data);
    } catch (error) {
      console.error('Error fetching tables:', error);
      message.error(text.tableReservation.messages.error.fetchTables);
    }
  };

  const handleSubmit = async (values) => {
    try {
      await ReservationService.createReservation(selectedTable.tableId, userId, {
        ...values,
        status: 'PENDING'
      });

      setIsModalOpen(false);
      setSelectedTable(null);
      form.resetFields();
      window.location.reload();
      message.success(text.tableReservation.messages.success.created);
    } catch (error) {
      console.error('Error creating reservation:', error);
      message.error(text.tableReservation.messages.error.createReservation);
    }
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      await ReservationService.deleteReservation(reservationId);
      fetchTables();
      message.success(text.tableReservation.messages.success.cancelled);
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      message.error(text.tableReservation.messages.error.cancelReservation);
    }
  };

  const showReservationModal = (table) => {
    setSelectedTable(table);
    setIsModalOpen(true);
  };

  const canCancelReservation = (reservation) => {
    return reservation.user.id == userId;
  };

  const getReservationStatusDisplay = (reservation) => {
    switch(reservation.status) {
      case 'FREE':
      case 'PENDING':
        return (
          <div>
            <Tag color="orange" style={{ marginRight: '8px' }}>
              {text.header.reservationsModal.statuses.PENDING}
            </Tag>
            {canCancelReservation(reservation) && (
              <Tooltip title={text.tableReservation.buttons.cancelReservation}>
                <Button
                  type="text"
                  danger
                  icon={<CloseCircleOutlined />}
                  onClick={() => handleCancelReservation(reservation.id)}
                  size="small"
                />
              </Tooltip>
            )}
          </div>
        );
      case 'CONFIRMED':
        return (
          <div>
            <Tag color="green" style={{ marginRight: '8px' }}>
              {text.header.reservationsModal.statuses.CONFIRMED}
            </Tag>
            {canCancelReservation(reservation) && (
              <Tooltip title={text.tableReservation.buttons.cancelReservation}>
                <Button
                  type="text"
                  danger
                  icon={<CloseCircleOutlined />}
                  onClick={() => handleCancelReservation(reservation.id)}
                  size="small"
                />
              </Tooltip>
            )}
          </div>
        );
      case 'CANCELLED':
        return (
          <Tag color="red">
            {text.header.reservationsModal.statuses.CANCELLED}
          </Tag>
        );
      default:
        return null;
    }
  };

  const columns = [
    {
      title: text.tableReservation.table.tableNumber,
      dataIndex: 'tableId',
      key: 'tableId',
      render: (tableId) => `№ ${tableId}`,
    },
    {
      title: text.tableReservation.table.capacity,
      dataIndex: 'capacity',
      key: 'capacity',
      render: (capacity) => `${capacity} ${text.tableReservation.table.capacityPeople}`,
    },
    {
      title: text.tableReservation.table.status,
      dataIndex: 'reservations',
      key: 'status',
      render: (reservations, table) => {
        if (!reservations || reservations.length === 0) {
          return (
            <Tooltip title={text.tableReservation.buttons.select}>
              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={() => showReservationModal(table)}
              />
            </Tooltip>
          );
        }
        return (
          <div>
            {reservations.map(reservation => (
              <div key={reservation.id} className="mb-2">
                <span style={{marginRight: '8px'}}>
                  {text.tableReservation.table.reservedFor} {reservation.user.name} {reservation.user.surname}
                </span>
                {getReservationStatusDisplay(reservation)}
              </div>
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        dataSource={tables}
        columns={columns}
        rowKey="tableId"
        pagination={{
          pageSize: 5,
          showSizeChanger: false
        }}
      />

      <Modal
        title={text.tableReservation.modal.title}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="customerName"
            label={text.tableReservation.form.customerName.label}
            rules={[{required: true, message: text.tableReservation.form.customerName.error}]}
          >
            <Input placeholder={text.tableReservation.form.customerName.placeholder}/>
          </Form.Item>

          <Form.Item
            name="customerPhone"
            label={text.tableReservation.form.customerPhone.label}
            rules={[{required: true, message: text.tableReservation.form.customerPhone.error}]}
          >
            <Input placeholder={text.tableReservation.form.customerPhone.placeholder}/>
          </Form.Item>

          <Form.Item
            name="reservationTime"
            label={text.tableReservation.form.reservationTime.label}
            rules={[{required: true, message: text.tableReservation.form.reservationTime.error}]}
          >
            <DatePicker showTime/>
          </Form.Item>

          <Form.Item
            name="guestCount"
            label={text.tableReservation.form.guestCount.label}
            rules={[{required: true, message: text.tableReservation.form.guestCount.error}]}
          >
            <InputNumber min={1} max={selectedTable?.capacity}/>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            {text.tableReservation.buttons.confirmReservation}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default TableReservation;