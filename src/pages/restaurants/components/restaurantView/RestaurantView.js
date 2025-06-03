import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Carousel, Rate, message} from "antd";
import RestaurantBreadcrumb from './RestaurantBreadcrumb';
import RestaurantDetails from './RestaurantDetails';
import RestaurantPhotos from './RestaurantPhotos';
import NoPhoto from "../../../../images/no-photo.jpg";
import '../../styles/RestaurantView.css';
import {useLanguage} from "../../../../contexts/LanguageContext";
import {getRestaurant, updatePhoto, updatePopularityCount} from "../../../../api/RestaurantService";
import {checkTokenValidity} from "../../../../utils/tokenValidation";
import FeedbackModal from "../../../feedbacks/components/FeedbackModal";
import Feedback from "../../../feedbacks/components/Feedback";
import dayTranslation from "../../../../data/dayTranslation.json";
import cuisineTranslation from "../../../../data/cuisineTranslation.json";
import {getPriceSymbol} from "../../helpers/restaurantsHelper";
import TableModal from "./TableModal";

const RestaurantView = () => {
  const { id } = useParams();
  const history = useNavigate();
  const { text } = useLanguage();
  const [restaurant, setRestaurant] = useState({
    restaurantId: '',
    name: '',
    description: '',
    photos: [],
    address: '',
    rating: 0.0,
    workHours: [],
    cuisineType: '',
    city: '',
    diningTables: [],
    website: '',
    contactInfo: {
      contactInfoId: '',
    },
    feedbackList: [],
    menu: '',
    popularityCount: 0,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile) {
      message.error(text.restaurantView.photos.pleaseSelect);
      return;
    }
    try {
      await updatePhoto(restaurant.restaurantId, selectedFile);
      message.success(text.restaurantView.photos.uploadSuccess);
    } catch (error) {
      console.error('Error uploading photo:', error);
      message.error(text.restaurantView.photos.uploadError);
    }

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleSelectFile = () => {
    document.getElementById('fileInput').click();
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await getRestaurant(id);
        setRestaurant(prevRestaurant => {
          const updatedRestaurant = {...prevRestaurant, ...response.data};
          updatePopularityCount(id, updatedRestaurant.popularityCount + 1);
          return updatedRestaurant;
        });
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    fetchRestaurant();
  }, [id]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    checkTokenValidity(storedToken, history);
  }, []);

  return (
    <div className="restaurant-view">
      <RestaurantBreadcrumb restaurant={restaurant}/>
      <div className="restaurant-view-data">
        <div className="restaurant-view-data-left">
          <div className="restaurant-view-name">{restaurant.name}</div>
          <div className="restaurant-view-details">
            <div className="rating-view-container">
              <Rate allowHalf value={restaurant.rating} disabled/>
            </div>
            <div className="price-view-container">
              <div className="restaurant-view-details-font">
                {getPriceSymbol(restaurant.priceCategory)}
              </div>
            </div>
            <div className="cuisine-view-container">
              <div className="restaurant-view-details-font">
                {cuisineTranslation.cuisineTypes[restaurant.cuisineType]}
              </div>
            </div>
            <div className="city-view-container">
              <div className="restaurant-view-details-font">{restaurant.address.city}</div>
            </div>
            <div className="address-view-container">
              <div className="restaurant-view-details-font">{restaurant.address.formattedAddress}</div>
            </div>
          </div>

          <Carousel
            className="restaurant-view-carousel"
            effect="fade"
            dotPosition="bottom"
            autoplay
            autoplaySpeed={3000}
          >
            {(restaurant.photos.length > 0 ? restaurant.photos.slice(-10) : []).map((photo, index) => (
              <div key={index}>
                <img
                  className="restaurant-view-carousel-element"
                  src={photo}
                  alt={`Photo ${index + 1}`}
                />
              </div>
            ))}
            {restaurant.photos.length === 0 && (
              <div>
                <img
                  className="restaurant-view-carousel-element"
                  src={NoPhoto}
                  alt={restaurant.name}
                />
              </div>
            )}
          </Carousel>

          <div className="rating-view-details">
            <div className="rating-view-container-details">
              <Rate
                className="rating-view-details-rate"
                allowHalf
                value={restaurant.rating}
                disabled
              />
              <div className="rating-view-details-number">
                {restaurant.rating.toFixed(1)}
              </div>
              <div className="rating-view-details-number">
                {text.restaurantView.popularity}: {restaurant.popularityCount}
              </div>
            </div>
          </div>

          <div className="restaurant-view-description">
            <div className="restaurant-view-description-header">
              {text.restaurantView.details.description}
            </div>
            <div className="restaurant-view-description-text">
              {restaurant.description}
            </div>
          </div>

          <div className="restaurant-view-contact-info">
            <div className="restaurant-view-contact-info-header">
              {text.restaurantView.details.contactInfo}
            </div>
            <div className="restaurant-view-contact-info-data">
              {restaurant.contactInfo.phoneNumber}
            </div>
            <div className="restaurant-view-contact-info-data">
              <a href={`mailto:${restaurant.contactInfo.email}`}>
                {restaurant.contactInfo.email}
              </a>
            </div>
          </div>

          <div className="restaurant-view-feedbacks-container">
            <div className="restaurant-view-feedbacks-container-header">
              {text.restaurantView.details.reviews}
            </div>
            <FeedbackModal/>
            <div className="feedback-list">
              {restaurant.feedbackList
                .slice()
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((feedback, index) => (
                  <Feedback key={index} feedback={feedback}/>
                ))}
            </div>
          </div>
        </div>

        <div className="restaurant-view-data-right">
          <RestaurantDetails
            restaurant={restaurant}
            dayTranslation={dayTranslation}
          />

          <RestaurantPhotos
            selectedFile={selectedFile}
            onFileChange={handleFileChange}
            onUploadPhoto={handleUploadPhoto}
            onSelectFile={handleSelectFile}
          />

          <TableModal
            restaurantId={restaurant.restaurantId}
            userId={localStorage.getItem("userId")}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantView;