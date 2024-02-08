import NoPhoto from "../images/no-photo.jpg";
import '../styles/Restaurant.css';
import {Button, Col, Divider, Drawer, Rate, Row} from "antd";
import {Link, useNavigate} from "react-router-dom";
import cuisineTranslation from "../data/cuisineTranslation.json"
import React, {useEffect, useState} from "react";
import {addFavouriteRestaurant, getUserFavoriteRestaurants, removeFavouriteRestaurant} from "../api/UserService";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";

const Restaurant = ({restaurant}) => {
    const history = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const DescriptionItem = ({title, content}) => (
        <div className="site-description-item-profile-wrapper">
            <p className="site-description-item-profile-p-label">{title}:</p>
            {content}
        </div>
    );

    const navigateToDetails = () => {
        window.scrollTo(0, 0);
        history(`/restaurants/${restaurant.restaurantId}`);
    };

    const handleFavoriteToggle = async () => {
        try {
            if (isFavorite) {
                await removeFavouriteRestaurant(restaurant.restaurantId);
            } else {
                await addFavouriteRestaurant(restaurant.restaurantId);
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favorites = await getUserFavoriteRestaurants();
                setIsFavorite(favorites.content.some(favorite => favorite.restaurantId === restaurant.restaurantId));
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [restaurant.restaurantId]);

    return (
        <div className="restaurant">
            <div className="restaurant-image">
                {restaurant.photos.length > 0 ? <img src={restaurant.photos[0]} alt={restaurant.name}/> :
                    <img src={NoPhoto}/>}
            </div>
            <div className="restaurant-header">
                <p className="restaurant-name">{restaurant.name.substring(0, 100)}</p>
                <Button
                    className="restaurant-favorite-button"
                    size="large"
                    icon={isFavorite ? <HeartFilled style={{color: '#e75480'}}/> : <HeartOutlined/>}
                    onClick={handleFavoriteToggle}
                >
                </Button>
            </div>
            <div className="restaurant-details">
                <div className="rating-container">
                    <Rate allowHalf value={restaurant.rating} disabled/>
                </div>
                <div className="cuisine-container">
                    <div
                        className="restaurant-details-font">{cuisineTranslation.cuisineTypes[restaurant.cuisineType]}</div>
                </div>
                <div className="city-container">
                    <div className="restaurant-details-font">{restaurant.city}</div>
                </div>
                <div className="address-container">
                    <div className="restaurant-details-font">{restaurant.address}</div>
                </div>
            </div>
            <div className="restaurant-description-container">
                <div className="restaurant-description-header">Короткий опис</div>
                <div className="restaurant-description-text">
                    {restaurant.description.substring(0, 200)}...
                </div>
            </div>
            <div className="restaurant-buttons-container">
                <Button className="restaurant-read-more"
                        size={"large"}
                        onClick={() => navigateToDetails()}>
                    Читати більше...
                </Button>
                <Button className="restaurant-read-more"
                        size={"large"}
                        onClick={showDrawer}>
                    Коротко
                </Button>
            </div>
            <Drawer width={640} placement="right" closable={true} onClose={onClose} open={open}>
                <p className="site-description-item-profile-p-main">
                    Інформація про ресторан
                </p>
                <p className="site-description-item-profile-p-header">Деталі</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Назва" content={restaurant.name}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Тип кухні"
                                         content={cuisineTranslation.cuisineTypes[restaurant.cuisineType]}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Рейтинг"
                                         content={<Rate allowHalf value={restaurant.rating} disabled/>}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Популярність" content={restaurant.popularityCount}/>
                    </Col>
                </Row>
                <Divider/>
                <p className="site-description-item-profile-p-header">Контактна інформація</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Номер телефону" content={restaurant.contactInfo.phoneNumber}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Email" content={restaurant.contactInfo.email}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Місто" content={restaurant.city}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Адреса" content={restaurant.address}/>
                    </Col>
                </Row>
                <Divider/>
                <p className="site-description-item-profile-p-header">Додаткова інформація</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Сайт" content={<a href={restaurant.website}>{restaurant.website}</a>}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Меню" content={<a href={restaurant.menu}>{restaurant.menu}</a>}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Кількість відгуків" content={restaurant.feedbackList.length}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Детальніше" content={<Link onClick={() => {
                            window.scrollTo(0, 0);
                        }} to={`/restaurants/${restaurant.restaurantId}`}>
                            Натисніть сюди
                        </Link>}/>
                    </Col>
                </Row>
            </Drawer>
        </div>
    );
};

export default Restaurant;