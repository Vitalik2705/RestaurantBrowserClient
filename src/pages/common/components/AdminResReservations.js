import React, { useState, useEffect } from 'react';
import { Modal, Table, Button, Tag, message, Space, Tooltip } from 'antd';
import { useLanguage } from "../../../contexts/LanguageContext";
import { CloseCircleOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import moment from 'moment';
import {ReservationService} from "../../../api/ReservationService";
import {MessageService} from "../../../api/messageService";

const AdminResReservations = ({ restaurantId, visible, onClose, userId }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { text, language } = useLanguage();

  useEffect(() => {
    if (visible && restaurantId) {
      fetchReservations();
    }
  }, [visible, restaurantId]);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const data = await ReservationService.getRestaurantReservationsForAdmin(restaurantId);
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      message.error(text.header.adminReservationsModal.errors.fetchError);
    }
    setLoading(false);
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      await ReservationService.cancelReservation(reservationId);
      fetchReservations();
      message.success(text.header.adminReservationsModal.success.cancelled);
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      message.error(text.header.adminReservationsModal.errors.cancelError);
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
      await ReservationService.deleteReservation(reservationId);
      fetchReservations();
      message.success(text.header.adminReservationsModal.success.deleted);
    } catch (error) {
      console.error('Error deleting reservation:', error);
      message.error(text.header.adminReservationsModal.errors.deleteError);
    }
  };

  const handleConfirmReservation = async (reservationId) => {
    try {
      await MessageService.confirmReservation(reservationId, userId);
      message.success(text.header.messagesModal.success.confirmed);
    } catch (error) {
      console.error('Error confirming reservation:', error);
      message.error(text.header.messagesModal.errors.confirmError);
    }
  };

  const getStatusTag = (status) => {
    const statusColors = {
      PENDING: 'orange',
      CONFIRMED: 'green',
      CANCELLED: 'red'
    };

    return (
      <Tag color={statusColors[status]}>
        {getTranslatedStatus(status)}
      </Tag>
    );
  };

  const getTranslatedStatus = (status) => {
    if (language === 'uk') {
      return text.header.adminReservationsModal.statuses[status];
    }
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  const getActionButtons = (record) => {
    return (
      <Space>
        {record.status === 'PENDING' && (
          <>
            <Tooltip title={text.header.adminReservationsModal.confirm}>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => handleConfirmReservation(record.id)}
                size="middle"
              />
            </Tooltip>
            <Tooltip title={text.header.adminReservationsModal.cancel}>
              <Button
                type="primary"
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => handleCancelReservation(record.id)}
                size="middle"
              />
            </Tooltip>
          </>
        )}
        <Tooltip title={text.header.adminReservationsModal.delete}>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteReservation(record.id)}
            size="middle"
          />
        </Tooltip>
      </Space>
    );
  };

  const columns = [
    {
      title: text.header.adminReservationsModal.customer,
      dataIndex: 'customerName',
      key: 'customer',
    },
    {
      title: text.header.adminReservationsModal.phone,
      dataIndex: 'customerPhone',
      key: 'phone',
    },
    {
      title: text.header.adminReservationsModal.tableNumber,
      dataIndex: 'tableId',
      key: 'tableId',
      render: (tableId) => `№ ${tableId}`,
    },
    {
      title: text.header.adminReservationsModal.date,
      dataIndex: 'reservationTime',
      key: 'date',
      render: (text) => moment(text).format('DD/MM/YYYY'),
    },
    {
      title: text.header.adminReservationsModal.time,
      dataIndex: 'reservationTime',
      key: 'time',
      render: (text) => moment(text).format('HH:mm'),
    },
    {
      title: text.header.adminReservationsModal.guestCount,
      dataIndex: 'guestCount',
      key: 'guestCount',
    },
    {
      title: text.header.adminReservationsModal.status,
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: text.header.adminReservationsModal.actions,
      key: 'actions',
      render: (_, record) => getActionButtons(record),
    },
  ];

  return (
    <Modal
      title={text.header.adminReservationsModal.title}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1200}
    >
      <Table
        dataSource={reservations}
        columns={columns}
        rowKey="id"
        loading={loading}
        locale={{ emptyText: text.header.adminReservationsModal.noReservations }}
        pagination={{
          pageSize: 5,
          total: reservations.length,
          showSizeChanger: false
        }}
      />
    </Modal>
  );
};

export default AdminResReservations;