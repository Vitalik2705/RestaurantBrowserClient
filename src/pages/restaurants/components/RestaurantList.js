import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import { checkTokenValidity } from "../../../utils/tokenValidation";
import Restaurant from "./Restaurant";
import Search from "./searchFilter/Search";
import Filter from "./searchFilter/Filter";
import Sorter from "./searchFilter/Sorter";
import AddRestaurant from "./AddRestaurant";
import '../styles/RestaurantList.css';
import Pagination from "../../common/components/Pagination";

const RestaurantList = ({
                          data,
                          currentPage,
                          getAllRestaurants,
                          handleSearch,
                          handleFilter,
                          handleSort
                        }) => {
  const history = useNavigate();
  const { text } = useLanguage();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    checkTokenValidity(storedToken, history);
  }, []);

  return (
    <main className='main'>
      <div className="restaurants-list-search-section">
        <Sorter handleSort={handleSort}/>
        <Search handleSearch={handleSearch}/>
        <Filter handleFilter={handleFilter}/>
        <AddRestaurant/>
      </div>

      {data?.content?.length === 0 && (
        <div className="text-with-nothing">
          {text.restaurants.notFound}
        </div>
      )}

      <div className='restaurant_list'>
        {data?.content?.length > 0 && data.content.map(restaurant => (
          <Restaurant
            restaurant={restaurant}
            key={restaurant.id}
          />
        ))}
      </div>

      {data?.content?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          onPageChange={getAllRestaurants}
        />
      )}
    </main>
  );
};

export default RestaurantList;