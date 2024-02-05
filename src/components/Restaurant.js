import NoPhoto from "../images/no-photo.jpg";
import '../styles/Restaurant.css';
import {Button, Rate} from "antd";
import {useNavigate} from "react-router-dom";
import cuisineTranslation from "../data/cuisineTranslation.json"
import {useEffect, useState} from "react";
import {addFavouriteRestaurant, getUserFavoriteRestaurants, removeFavouriteRestaurant} from "../api/UserService";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";

const Restaurant = ({restaurant}) => {
    const history = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

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
            <Button className="restaurant-read-more"
                    size={"large"}
                    onClick={() => navigateToDetails()}>
                Читати більше...
            </Button>
        </div>
    );
};

export default Restaurant;