import React, { useState, useEffect } from 'react';
import {Modal, Table, Button, Tag, message, Space, Tooltip} from 'antd';
import { useLanguage } from "../../../contexts/LanguageContext";
import { ReservationService } from '../../../api/ReservationService';
import {CloseCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import moment from 'moment';

const UserReservations = ({ userId, visible, onClose }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { text, language } = useLanguage();

  useEffect(() => {
    if (visible && userId) {
      fetchReservations();
    }
  }, [visible, userId]);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const data = await ReservationService.getUserReservations(userId);
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      message.error(text.header.reservationsModal.errors.fetchError);
    }
    setLoading(false);
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      await ReservationService.cancelReservation(reservationId);
      fetchReservations();
      message.success(text.header.reservationsModal.success.cancelled);
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      message.error(text.header.reservationsModal.errors.cancelError);
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
      return text.header.reservationsModal.statuses[status];
    }
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  const canCancel = (status) => {
    return status === 'PENDING' || status === 'CONFIRMED';
  };

  const getActionButtons = (record) => {
    return (
      <Space>
        {canCancel(record.status) && (
          <Tooltip title={text.header.reservationsModal.cancel}>
            <Button
              type="primary"
              danger
              icon={<CloseCircleOutlined />}
              onClick={() => handleCancelReservation(record.id)}
              size="middle"
            />
          </Tooltip>
        )}
        <Tooltip title={text.header.reservationsModal.delete}>
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

  const handleDeleteReservation = async (reservationId) => {
    try {
      await ReservationService.deleteReservation(reservationId);
      fetchReservations();
      message.success(text.header.reservationsModal.success.deleted);
    } catch (error) {
      console.error('Error deleting reservation:', error);
      message.error(text.header.reservationsModal.errors.deleteError);
    }
  };

  const columns = [
    {
      title: text.header.reservationsModal.restaurant,
      dataIndex: 'restaurantName',
      key: 'restaurant',
      render: (name, record) => (
        <a href={`/restaurants/${record.restaurantId}`}>
          {name}
        </a>
      ),
    },
    {
      title: text.header.reservationsModal.tableNumber,
      dataIndex: 'tableId',
      key: 'tableId',
      render: (tableId) => `№ ${tableId}`,
    },
    {
      title: text.header.reservationsModal.date,
      dataIndex: 'reservationTime',
      key: 'date',
      render: (text) => moment(text).format('DD/MM/YYYY'),
    },
    {
      title: text.header.reservationsModal.time,
      dataIndex: 'reservationTime',
      key: 'time',
      render: (text) => moment(text).format('HH:mm'),
    },
    {
      title: text.header.reservationsModal.guestCount,
      dataIndex: 'guestCount',
      key: 'guestCount',
    },
    {
      title: text.header.reservationsModal.status,
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: text.header.reservationsModal.actions,
      key: 'actions',
      render: (_, record) => getActionButtons(record)
    }
  ];

  return (
    <Modal
      title={text.header.reservationsModal.title}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
    >
      <Table
        dataSource={reservations}
        columns={columns}
        rowKey="id"
        loading={loading}
        locale={{ emptyText: text.header.reservationsModal.noReservations }}
        pagination={{
          pageSize: 5,
          total: reservations.length,
          showSizeChanger: false
        }}
      />
    </Modal>
  );
};

export default UserReservations;