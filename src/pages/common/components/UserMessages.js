import React, { useState, useEffect } from 'react';
import { Modal, Table, Button, message, Space, Tooltip } from 'antd';
import { useLanguage } from "../../../contexts/LanguageContext";
import moment from 'moment';
import { MessageService } from "../../../api/messageService";
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  MailOutlined
} from '@ant-design/icons';

const UserMessages = ({ userId, visible, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { text } = useLanguage();

  useEffect(() => {
    if (visible && userId) {
      fetchMessages();
    }
  }, [visible, userId]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await MessageService.getUserMessages(userId);
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      message.error(text.header.messagesModal.errors.fetchError);
    }
    setLoading(false);
  };

  const handleConfirmReservation = async (reservationId) => {
    try {
      await MessageService.confirmReservation(reservationId, userId);
      fetchMessages();
      message.success(text.header.messagesModal.success.confirmed);
    } catch (error) {
      console.error('Error confirming reservation:', error);
      message.error(text.header.messagesModal.errors.confirmError);
    }
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      await MessageService.cancelReservation(reservationId, userId);
      fetchMessages();
      message.success(text.header.messagesModal.success.cancelled);
    } catch (error) {
      console.error('Error canceling reservation:', error);
      message.error(text.header.messagesModal.errors.cancelError);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await MessageService.deleteMessage(messageId);
      fetchMessages();
      message.success(text.header.messagesModal.success.deleted);
    } catch (error) {
      console.error('Error deleting message:', error);
      message.error(text.header.messagesModal.errors.deleteError);
    }
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      await MessageService.markMessageAsRead(messageId);
      fetchMessages();
      message.success(text.header.messagesModal.success.markedAsRead);
    } catch (error) {
      console.error('Error marking message as read:', error);
      message.error(text.header.messagesModal.errors.markAsReadError);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await MessageService.markAllMessagesAsRead(userId);
      fetchMessages();
      message.success(text.header.messagesModal.success.allMarkedAsRead);
    } catch (error) {
      console.error('Error marking all messages as read:', error);
      message.error(text.header.messagesModal.errors.markAllAsReadError);
    }
  };

  const hasUnreadMessages = messages.some(message => !message.read);

  const getMessageActions = (message) => {
    return (
      <Space>
        {message.messageType === 'RESERVATION_REQUEST' &&
          message.reservation?.status === 'PENDING' && (
            <>
              <Tooltip title={text.header.messagesModal.confirm}>
                <Button
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  onClick={() => handleConfirmReservation(message.reservationId)}
                  size="middle"
                />
              </Tooltip>
              <Tooltip title={text.header.messagesModal.cancel}>
                <Button
                  type="primary"
                  danger
                  icon={<CloseCircleOutlined />}
                  onClick={() => handleCancelReservation(message.reservationId)}
                  size="middle"
                />
              </Tooltip>
            </>
          )}
        {!message.read && (
          <Tooltip title={text.header.messagesModal.markAsRead}>
            <Button
              type="default"
              icon={<CheckOutlined />}
              onClick={() => handleMarkAsRead(message.id)}
              size="middle"
            />
          </Tooltip>
        )}
        <Tooltip title={text.header.messagesModal.delete}>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteMessage(message.id)}
            size="middle"
          />
        </Tooltip>
      </Space>
    );
  };

  const columns = [
    {
      title: text.header.messagesModal.date,
      dataIndex: 'createdAt',
      key: 'date',
      render: (text) => moment(text).format('DD/MM/YYYY HH:mm'),
      width: '15%',
    },
    {
      title: text.header.messagesModal.type,
      dataIndex: 'messageType',
      key: 'type',
      width: '15%',
      render: (type) => {
        const messageTypes = {
          RESERVATION_REQUEST: text.header.messagesModal.types.request,
          RESERVATION_CONFIRMATION: text.header.messagesModal.types.confirmation,
          RESERVATION_CANCELLATION: text.header.messagesModal.types.cancellation,
          GENERAL: text.header.messagesModal.types.general,
        };
        return messageTypes[type] || type;
      },
    },
    {
      title: text.header.messagesModal.message,
      dataIndex: 'content',
      key: 'content',
      width: '50%',
      render: (content, record) => (
        <div style={{
          padding: '8px',
          backgroundColor: record.messageType === 'RESERVATION_REQUEST' ? '#f6ffed' :
            record.messageType === 'RESERVATION_CONFIRMATION' ? '#e6f7ff' :
              record.messageType === 'RESERVATION_CANCELLATION' ? '#fff2f0' : '#ffffff',
          borderRadius: '4px',
          border: '1px solid #f0f0f0'
        }}>
          {content}
          {record.reservation && (
            <div style={{ marginTop: '4px', fontSize: '12px', color: 'rgba(0, 0, 0, 0.45)' }}>
              Status: {record.reservation.status}
            </div>
          )}
        </div>
      ),
    },
    {
      title: text.header.messagesModal.actions,
      key: 'actions',
      width: '20%',
      render: (_, record) => getMessageActions(record),
    },
  ];

  return (
    <Modal
      title={text.header.messagesModal.title}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
    >
      {hasUnreadMessages && (
        <div style={{ marginBottom: 16, textAlign: 'right' }}>
          <Tooltip title={text.header.messagesModal.markAllAsRead}>
            <Button
              type="default"
              icon={<CheckOutlined />}
              onClick={handleMarkAllAsRead}
            />
          </Tooltip>
        </div>
      )}
      <Table
        dataSource={messages}
        columns={columns}
        rowKey="id"
        loading={loading}
        locale={{ emptyText: text.header.messagesModal.noMessages }}
        pagination={{
          pageSize: 5,
          total: messages.length,
          showSizeChanger: false
        }}
      />
    </Modal>
  );
};

export default UserMessages;