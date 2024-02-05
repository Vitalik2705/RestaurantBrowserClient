import {useEffect, useState} from "react";
import {getRestaurant, updatePopularityCount} from "../api/RestaurantService";
import {useNavigate, useParams} from "react-router-dom";
import '../styles/RestaurantView.css';
import {Breadcrumb, Carousel, Rate} from "antd";
import {getCombinedTablesInfo} from "../utils/utils";
import FeedbackModal from "./FeedbackModal";
import Feedback from "./Feedback";
import dayTranslation from "../data/dayTranslation.json"
import cuisineTranslation from "../data/cuisineTranslation.json"
import {checkTokenValidity} from "../utils/validation";

const RestaurantView = () => {
    const {id} = useParams();
    const history = useNavigate();
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

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await getRestaurant(id);
                setRestaurant(prevRestaurant => {
                    const updatedRestaurant = {...prevRestaurant, ...response.data};

                    updatePopularityCount(id, updatedRestaurant.popularityCount + 1);

                    return updatedRestaurant;
                });

                console.log(response);
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
            <Breadcrumb
                className="restaurant-view-breadcrumb"
                items={[
                    {
                        className: "restaurant-view-breadcrumb-title",
                        title: <a className="restaurant-view-breadcrumb-link" href="/restaurants">Список ресторанів</a>,
                    },
                    {
                        className: "restaurant-view-breadcrumb-title",
                        title: 'Ресторан',
                    },
                ]}
            />
            <div className="restaurant-view-data">
                <div className="restaurant-view-data-left">
                    <div className="restaurant-view-name">{restaurant.name}</div>
                    <div className="restaurant-view-details">
                        <div className="rating-view-container">
                            <Rate allowHalf value={restaurant.rating} disabled/>
                        </div>
                        <div className="cuisine-view-container">
                            <div
                                className="restaurant-view-details-font"> {cuisineTranslation.cuisineTypes[restaurant.cuisineType]}</div>
                        </div>
                        <div className="city-view-container">
                            <div className="restaurant-view-details-font">{restaurant.city}</div>
                        </div>
                        <div className="address-view-container">
                            <div className="restaurant-view-details-font">{restaurant.address}</div>
                        </div>
                    </div>
                    <Carousel className="restaurant-view-carousel" effect="fade" dotPosition="bottom" autoplay
                              autoplaySpeed={3000}>
                        {restaurant.photos.map((photo, index) => (
                            <div key={index}>
                                <img className="restaurant-view-carousel-element" src={photo}
                                     alt={`Photo ${index + 1}`}/>
                            </div>
                        ))}
                    </Carousel>
                    <div className="rating-view-details">
                        <div className="rating-view-container-details">
                            <Rate className="rating-view-details-rate" allowHalf value={restaurant.rating} disabled/>
                            <div className="rating-view-details-number">{restaurant.rating.toFixed(1)}</div>
                            <div className="rating-view-details-number">Популярність: {restaurant.popularityCount}</div>
                        </div>
                    </div>
                    <div className="restaurant-view-description">
                        <div className="restaurant-view-description-header">Опис</div>
                        <div className="restaurant-view-description-text">{restaurant.description}</div>
                    </div>
                    <div className="restaurant-view-contact-info">
                        <div className="restaurant-view-contact-info-header">Контактна Інформація</div>
                        <div className="restaurant-view-contact-info-data">{restaurant.contactInfo.phoneNumber}</div>
                        <div className="restaurant-view-contact-info-data">
                            <a href={`mailto:${restaurant.contactInfo.email}`}>{restaurant.contactInfo.email}</a>
                        </div>
                    </div>
                    <div className="restaurant-view-feedbacks-container">
                        <div className="restaurant-view-feedbacks-container-header">
                            Відгуки
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
                    <div className="restaurant-view-data-right-header">
                        Деталі
                    </div>
                    <div className="restaurant-view-data-right-location-info">
                        {restaurant.address}
                    </div>
                    <div className="restaurant-view-data-right-location-info">
                        {restaurant.city}
                    </div>
                    <div className="restaurant-view-data-right-header">
                        Контакти
                    </div>
                    <div className="restaurant-view-data-right-location-info">
                        <a href={restaurant.website}>{restaurant.website}</a>
                    </div>
                    <div className="restaurant-view-data-right-header">
                        Меню
                    </div>
                    <div className="restaurant-view-data-right-location-info">
                        <a href={restaurant.menu}>{restaurant.menu}</a>
                    </div>
                    <div className="restaurant-view-data-right-header">
                        Години роботи
                    </div>
                    <div className="restaurant-view-data-right-work-hours">
                        {restaurant.workHours.map((hours) => (
                            <div key={hours.workHoursId} className="work-hours-item">
                                {`${dayTranslation.days[hours.dayOfWeek]}: ${hours.startTime} - ${hours.endTime}`}
                            </div>
                        ))}
                    </div>
                    <div className="restaurant-view-data-right-header">
                        Вмістимість столиків
                    </div>
                    <div className="restaurant-view-data-right-dining-tables">
                        {getCombinedTablesInfo(restaurant.diningTables)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantView;