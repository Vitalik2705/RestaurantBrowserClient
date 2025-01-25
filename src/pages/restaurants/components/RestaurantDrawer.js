import React from 'react';
import {Drawer, Row, Col, Rate, Divider} from 'antd';
import {Link} from 'react-router-dom';
import {useLanguage} from "../../../contexts/LanguageContext";
import {getPriceSymbol, handleAddressClick} from "../helpers/restaurantsHelper";

const DescriptionItem = ({title, content}) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const RestaurantDrawer = ({open, onClose, restaurant, cuisineTranslation}) => {
  const {text} = useLanguage();

  return (
    <Drawer
      width={640}
      placement="right"
      closable={true}
      onClose={onClose}
      open={open}
    >
      <p className="site-description-item-profile-p-main">
        {text.restaurant.drawer.mainTitle}
      </p>
      <p className="site-description-item-profile-p-header">{text.restaurant.drawer.details.title}</p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={text.restaurant.drawer.details.name}
            content={restaurant.name}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={text.restaurant.drawer.details.cuisineType}
            content={cuisineTranslation.cuisineTypes[restaurant.cuisineType]}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={text.restaurant.drawer.details.rating}
            content={<Rate allowHalf value={restaurant.rating} disabled/>}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={text.restaurant.drawer.details.popularity}
            content={restaurant.popularityCount}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={text.restaurant.drawer.details.priceCategory}
            content={getPriceSymbol(restaurant.priceCategory)}
          />
        </Col>
      </Row>
      <Divider/>
      <p className="site-description-item-profile-p-header">
        {text.restaurant.drawer.contactInfo.title}
      </p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={text.restaurant.drawer.contactInfo.phone}
            content={restaurant.contactInfo.phoneNumber}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={text.restaurant.drawer.contactInfo.email}
            content={restaurant.contactInfo.email}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={text.restaurant.drawer.contactInfo.city}
            content={restaurant.address.city}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={text.restaurant.drawer.contactInfo.address}
            content={
              <Link
                onClick={() => handleAddressClick(restaurant)}
                to={`/restaurants`}
              >
                {restaurant.address.formattedAddress}
              </Link>
            }
          />
        </Col>
      </Row>
      <Divider/>
      <p className="site-description-item-profile-p-header">
        {text.restaurant.drawer.additionalInfo.title}
      </p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={text.restaurant.drawer.additionalInfo.website}
            content={<a href={restaurant.website}>{restaurant.website}</a>}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={text.restaurant.drawer.additionalInfo.menu}
            content={<a href={restaurant.menu}>{restaurant.menu}</a>}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={text.restaurant.drawer.additionalInfo.reviewCount}
            content={restaurant.feedbackList.length}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={text.restaurant.drawer.additionalInfo.moreDetails}
            content={
              <Link
                onClick={() => window.scrollTo(0, 0)}
                to={`/restaurants/${restaurant.restaurantId}`}
              >
                {text.restaurant.drawer.additionalInfo.clickHere}
              </Link>
            }
          />
        </Col>
      </Row>
    </Drawer>
  );
};

export default RestaurantDrawer;