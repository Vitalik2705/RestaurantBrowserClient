import React, { useState, useEffect } from 'react';
import {Avatar, Badge, Button, Dropdown, Image, Space} from "antd";
import HeaderRestaurantLogo from "../../../images/searching.png";
import AdminLogo from "../../../images/user.png";
import '../styles/Header.css';
import { useNavigate } from "react-router-dom";
import { getUserRequest } from "../../../api/UserService";
import { useLanguage } from "../../../contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import UserReservations from "./UserReservations";
import UserRestaurants from "./UserRestaurants";
import UserMessages from "./UserMessages";
import {MessageService} from "../../../api/messageService";

const Header = () => {
  const history = useNavigate();
  const [user, setUser] = useState();
  const [isReservationsVisible, setIsReservationsVisible] = useState(false);
  const [isMyRestaurantsVisible, setIsMyRestaurantsVisible] = useState(false);
  const [isMessagesVisible, setIsMessagesVisible] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const { text } = useLanguage();

  const getUser = async () => {
    const response = await getUserRequest();
    setUser(response);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    history("/login");
  };

  const fetchUnreadMessagesCount = async () => {
    try {
      const messages = await MessageService.getUserMessages(user.id);
      const unreadCount = messages.filter(msg => !msg.read).length;
      setUnreadMessages(unreadCount);
    } catch (error) {
      console.error('Error fetching unread messages:', error);
    }
  };

  const isAdmin = user && user.roles && user.roles.some(role => role.name === 'ROLE_ADMIN' || role.name === 'ADMIN');

  const items = [
    {
      label: (
        <Badge count={unreadMessages} size="small">
          <Button
            className="dropdown-button"
            onClick={() => {
              setIsMessagesVisible(true);
              setUnreadMessages(0);
            }}
          >
            <Space>
              {text.header.messagesModal.title}
              {unreadMessages > 0 && ` (${unreadMessages})`}
            </Space>
          </Button>
        </Badge>
      ),
      key: 'messages',
    },
    {
      label: <Button className="dropdown-button" onClick={() => setIsReservationsVisible(true)}>
        {text.header.reservationsModal.title}
      </Button>,
      key: 'reservations',
    },
    ...(isAdmin ? [{
      label: <Button className="dropdown-button" onClick={() => setIsMyRestaurantsVisible(true)}>
        {text.header.myRestaurantsModal.title}
      </Button>,
      key: 'myRestaurants',
    }] : []),
    {
      label: <Button className="dropdown-button" onClick={handleLogout}>
        {text.header.logout}
      </Button>,
      key: 'logout',
    }
  ];

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchUnreadMessagesCount();
    }
  }, [user]);

  return (
    <>
      <div className="header">
        <div className="header-logo-name">
          <Image width={42} height={42} src={HeaderRestaurantLogo} />
          <span>РестоПошук</span>
          {isAdmin && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image width={32} style={{ marginLeft: 15 }} height={32} src={AdminLogo} />
              <span style={{ marginLeft: 20, fontSize: 14 }}>{text.header.adminAccount}</span>
            </div>
          )}
        </div>
        <div className="header-list-elements">
          <a href="/" className="header-list-elements-element-link">
            <p className="header-list-elements-element">{text.header.home}</p>
          </a>
          <a href="/restaurants" className="header-list-elements-element-link">
            <p className="header-list-elements-element">{text.header.restaurants}</p>
          </a>
          <a href="/favourite" className="header-list-elements-element-link">
            <p className="header-list-elements-element">{text.header.favorite}</p>
          </a>
          <a href="/about" className="header-list-elements-element-link">
            <p className="header-list-elements-element">{text.header.about}</p>
          </a>
        </div>
        <div className="header-logo-user-profile">
          <LanguageSwitcher/>
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
            placement="bottom"
          >
            <a onClick={(e) => e.preventDefault()}>
              {user && user.name && user.surname && (
                <Avatar size={44} className="user-initials-circle">
                  {user.name.charAt(0)}
                  {user.surname.charAt(0)}
                </Avatar>
              )}
            </a>
          </Dropdown>
        </div>
      </div>

      <UserReservations
        userId={user?.id}
        visible={isReservationsVisible}
        onClose={() => setIsReservationsVisible(false)}
      />

      <UserRestaurants
        userId={user?.id}
        visible={isMyRestaurantsVisible}
        onClose={() => setIsMyRestaurantsVisible(false)}
      />

      <UserMessages
        userId={user?.id}
        visible={isMessagesVisible}
        onClose={() => {
          setIsMessagesVisible(false);
          fetchUnreadMessagesCount();
        }}
      />
    </>
  );
};

export default Header;