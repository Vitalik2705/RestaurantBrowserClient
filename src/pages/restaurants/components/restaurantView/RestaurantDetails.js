import React from 'react';
import {useLanguage} from "../../../../contexts/LanguageContext";
import {getCombinedTablesInfo, handleAddressClick} from "../../helpers/restaurantsHelper";
import {Link} from "react-router-dom";

const RestaurantDetails = ({ restaurant, dayTranslation }) => {
  const { text } = useLanguage();

  return (
    <div className="restaurant-view-data-right">
      <div className="restaurant-view-data-right-header">
        {text.restaurantView.details.location.title}
      </div>
      <div className="restaurant-view-data-right-location-info">
        <Link
          onClick={() => handleAddressClick(restaurant)}
          to={`/restaurants/${restaurant.restaurantId}`}
        >
          {restaurant.address.formattedAddress}
        </Link>
      </div>
      <div className="restaurant-view-data-right-location-info">
        {restaurant.address.city}
      </div>
      <div className="restaurant-view-data-right-header">
        {text.restaurantView.details.contacts.title}
      </div>
      <div className="restaurant-view-data-right-location-info">
        <a href={restaurant.website}>{restaurant.website}</a>
      </div>
      <div className="restaurant-view-data-right-header">
        {text.restaurantView.details.menu.title}
      </div>
      <div className="restaurant-view-data-right-location-info">
        <a href={restaurant.menu}>{restaurant.menu}</a>
      </div>
      <div className="restaurant-view-data-right-header">
        {text.restaurantView.details.workHours.title}
      </div>
      <div className="restaurant-view-data-right-work-hours">
        {restaurant.workHours.map((hours) => (
          <div key={hours.workHoursId} className="work-hours-item">
            {hours.isDayOff ?
              `${dayTranslation.days[hours.dayOfWeek]}: ${text.restaurantView.details.workHours.dayOff}` :
              `${dayTranslation.days[hours.dayOfWeek]}: ${hours.startTime} - ${hours.endTime}`
            }
          </div>
        ))}
      </div>
      <div className="restaurant-view-data-right-header">
        {text.restaurantView.details.tables.title}
      </div>
      <div className="restaurant-view-data-right-dining-tables">
        {getCombinedTablesInfo(restaurant.diningTables)}
      </div>
    </div>
  );
};

export default RestaurantDetails;