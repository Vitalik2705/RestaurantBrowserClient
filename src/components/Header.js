import {Avatar, Button, Dropdown, Image} from "antd";
import HeaderRestaurantLogo from "../images/searching.png";
import '../styles/Header.css';
import {Outlet, useNavigate} from "react-router-dom";
import {getUserRequest, loginRequest} from "../api/UserService";
import {useEffect, useState} from "react";

const Header = () => {
    const history = useNavigate();
    const [user, setUser] = useState();

    const getUser = async () => {
        const response = await getUserRequest();
        setUser(response);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        history("/login");
    };

    const items = [
        {
            label: <Button className="log-out-button" onClick={handleLogout}>Вийти</Button>,
            key: '0',
        }
    ];

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <div className="header">
                <div className="header-logo-name">
                    <Image width={42} height={42} src={HeaderRestaurantLogo}/>
                    <span>RestaurantBrowser</span>
                </div>
                <div className="header-list-elements">
                    <a href="/" className="header-list-elements-element-link">
                        <p className="header-list-elements-element">Головна</p>
                    </a>
                    <a href="/restaurants" className="header-list-elements-element-link">
                        <p className="header-list-elements-element">Ресторани</p>
                    </a>
                    <a href="/favourite" className="header-list-elements-element-link">
                        <p className="header-list-elements-element">Улюблене</p>
                    </a>
                    <a href="/about" className="header-list-elements-element-link">
                        <p className="header-list-elements-element">Про нас</p>
                    </a>
                </div>
                <div className="header-logo-user-profile">
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
        </>
    );
};

export default Header;