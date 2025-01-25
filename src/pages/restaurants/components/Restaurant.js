import NoPhoto from "../../../images/no-photo.jpg";
import '../styles/Restaurant.css';
import {Button, Rate, Tooltip} from "antd";
import {useNavigate} from "react-router-dom";
import cuisineTranslation from "../../../data/cuisineTranslation.json"
import React, {useEffect, useState} from "react";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {useLanguage} from "../../../contexts/LanguageContext";
import {addFavouriteRestaurant, getUserFavoriteRestaurants, removeFavouriteRestaurant} from "../../../api/UserService";
import RestaurantDrawer from "./RestaurantDrawer";
import {getPriceSymbol} from "../helpers/restaurantsHelper";

const Restaurant = ({restaurant}) => {
  const {text} = useLanguage();
  const history = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

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
        {restaurant.photos.length > 0 ?
          <img src={restaurant.photos[0]} alt={restaurant.name}/> :
          <img src={NoPhoto}/>
        }
      </div>
      <div className="restaurant-header">
        <Tooltip title={restaurant.name} placement={"topLeft"}>
        <p className="restaurant-name">
          {restaurant.name.length > 20 ? restaurant.name.substring(0, 20) + "..." : restaurant.name}
          <span>
              {getPriceSymbol(restaurant.priceCategory)}
          </span>
        </p>
        </Tooltip>
        <Button
          className="restaurant-favorite-button"
          size="large"
          icon={isFavorite ?
            <HeartFilled style={{color: '#e75480'}}/> :
            <HeartOutlined/>
          }
          onClick={handleFavoriteToggle}
        />
      </div>
      <div className="restaurant-details">
        <div className="rating-container">
          <Rate allowHalf value={restaurant.rating} disabled/>
        </div>
        <div className="cuisine-container">
          <div className="restaurant-details-font">
            {cuisineTranslation.cuisineTypes[restaurant.cuisineType]}
          </div>
        </div>
        <div className="city-container">
          <div className="restaurant-details-font">{restaurant.address.city}</div>
        </div>
        <div className="address-container">
          <div className="restaurant-details-font">{restaurant.address.formattedAddress}</div>
        </div>
      </div>
      <div className="restaurant-description-container">
        <div className="restaurant-description-header">
          {text.restaurant.shortDescription.title}
        </div>
        <div className="restaurant-description-text">
          {restaurant.description.substring(0, 200)}...
        </div>
      </div>
      <div className="restaurant-buttons-container">
        <Button
          className="restaurant-read-more"
          size="large"
          onClick={navigateToDetails}
        >
          {text.restaurant.shortDescription.readMore}
        </Button>
        <Button
          className="restaurant-read-more"
          size="large"
          onClick={showDrawer}
        >
          {text.restaurant.shortDescription.brief}
        </Button>
      </div>

      <RestaurantDrawer
        open={open}
        onClose={onClose}
        restaurant={restaurant}
        cuisineTranslation={cuisineTranslation}
      />
    </div>
  );
};

export default Restaurant;