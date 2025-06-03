import React from 'react';
import { Breadcrumb } from 'antd';
import {useLanguage} from "../../../../contexts/LanguageContext";

const RestaurantBreadcrumb = ({restaurant}) => {
  const { text } = useLanguage();

  return (
    <Breadcrumb
      className="restaurant-view-breadcrumb"
      items={[
        {
          className: "restaurant-view-breadcrumb-title",
          title: <a className="restaurant-view-breadcrumb-link" href="/restaurants">
            {text.restaurantView.breadcrumb.restaurantsList}
          </a>,
        },
        {
          className: "restaurant-view-breadcrumb-title",
          title: <div>{text.restaurantView.breadcrumb.restaurant + " " + restaurant.name}</div>,
        },
      ]}
    />
  );
};

export default RestaurantBreadcrumb;