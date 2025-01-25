import React from 'react';
import { Breadcrumb } from 'antd';
import {useLanguage} from "../../../../contexts/LanguageContext";

const RestaurantBreadcrumb = () => {
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
          title: text.restaurantView.breadcrumb.restaurant,
        },
      ]}
    />
  );
};

export default RestaurantBreadcrumb;