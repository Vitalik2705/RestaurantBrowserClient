import React, { useState, useEffect } from 'react';
import {Modal, Table, Button, Space, Tooltip, Input} from 'antd';
import { useLanguage } from "../../../contexts/LanguageContext";
import { useNavigate } from 'react-router-dom';
import { getCreatedRestaurants } from "../../../api/RestaurantService";
import AdminResReservations from "./AdminResReservations";
import {CalendarOutlined, EditOutlined, LineChartOutlined, SearchOutlined} from '@ant-design/icons';
import EditRestaurant from "../../restaurants/components/EditRestaurant";
import RestaurantAnalytics from "../../restaurants/components/RestaurantAnalytics";

const UserRestaurants = ({ userId, visible, onClose }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [isReservationsVisible, setIsReservationsVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAnalyticsVisible, setIsAnalyticsVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { text } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (visible && userId) {
      fetchRestaurants();
    }
  }, [visible, userId]);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const data = await getCreatedRestaurants(userId);
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
    setLoading(false);
  };

  const handleEditRestaurant = (restaurantId) => {
    setSelectedRestaurantId(restaurantId);
    setIsEditModalVisible(true);
  };

  const handleEditClose = () => {
    setIsEditModalVisible(false);
    setSelectedRestaurantId(null);
  };

  const handleEditSuccess = () => {
    fetchRestaurants();
  };

  const handleViewRestaurant = (restaurantId) => {
    onClose();
    navigate(`/restaurants/${restaurantId}`);
  };

  const handleViewReservations = (restaurantId) => {
    setSelectedRestaurantId(restaurantId);
    setIsReservationsVisible(true);
  };

  const handleViewAnalytics = (restaurantId) => {
    setSelectedRestaurantId(restaurantId);
    setIsAnalyticsVisible(true);
  };

  const getFilteredRestaurants = () => {
    return restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchText.toLowerCase()) ||
      restaurant.cuisineType.toLowerCase().includes(searchText.toLowerCase()) ||
      restaurant.address?.formattedAddress.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const columns = [
    {
      title: text.header.myRestaurantsModal.name,
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <a onClick={() => handleViewRestaurant(record.restaurantId)}>{name}</a>
      ),
    },
    {
      title: text.header.myRestaurantsModal.cuisine,
      dataIndex: 'cuisineType',
      key: 'cuisine',
    },
    {
      title: text.header.myRestaurantsModal.rating,
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: text.header.myRestaurantsModal.address,
      dataIndex: ['address', 'formattedAddress'],
      key: 'address',
    },
    {
      title: text.header.myRestaurantsModal.actions,
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title={text.header.myRestaurantsModal.edit}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleEditRestaurant(record.restaurantId)}
              size="middle"
            />
          </Tooltip>
          <Tooltip title={text.header.myRestaurantsModal.viewReservations}>
            <Button
              type="default"
              icon={<CalendarOutlined />}
              onClick={() => handleViewReservations(record.restaurantId)}
              size="middle"
            />
          </Tooltip>
          <Tooltip title="View Analytics">
            <Button
              type="default"
              icon={<LineChartOutlined />}
              onClick={() => handleViewAnalytics(record.restaurantId)}
              size="middle"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title={text.header.myRestaurantsModal.title}
        open={visible}
        onCancel={onClose}
        footer={null}
        width={1000}
      >
        <Input
          placeholder={text.header.myRestaurantsModal.searchPlaceholder}
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ marginBottom: 16 }}
          allowClear
        />
        <Table
          dataSource={getFilteredRestaurants()}
          columns={columns}
          rowKey="restaurantId"
          loading={loading}
          pagination={{
            pageSize: 5,
            showSizeChanger: false
          }}
          locale={{ emptyText: text.header.myRestaurantsModal.noRestaurants }}
        />
      </Modal>

      <AdminResReservations
        restaurantId={selectedRestaurantId}
        visible={isReservationsVisible}
        onClose={() => {
          setIsReservationsVisible(false);
          setSelectedRestaurantId(null);
        }}
        userId={userId}
      />

      <EditRestaurant
        restaurantId={selectedRestaurantId}
        visible={isEditModalVisible}
        onClose={handleEditClose}
        onUpdateSuccess={handleEditSuccess}
      />

      <RestaurantAnalytics
        restaurant={restaurants.find(r => r.restaurantId === selectedRestaurantId)}
        visible={isAnalyticsVisible}
        onClose={() => {
          setIsAnalyticsVisible(false);
          setSelectedRestaurantId(null);
        }}
      />
    </>
  );
};

export default UserRestaurants;