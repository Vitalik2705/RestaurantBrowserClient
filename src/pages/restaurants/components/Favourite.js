import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { checkTokenValidity } from "../../../utils/tokenValidation";
import Restaurant from "./Restaurant";
import '../styles/Favourite.css';
import {useLanguage} from "../../../contexts/LanguageContext";
import Pagination from "../../common/components/Pagination";

const Favourite = ({data, currentPage, getAllRestaurants}) => {
  const history = useNavigate();
  const { text } = useLanguage();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    checkTokenValidity(storedToken, history);
  }, []);

  return (
    <div className="favourite">
      {data?.content?.length === 0 && (
        <div className="favourite-text-with-nothing">
          {text.favourite.noFavorites}
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
    </div>
  );
};

export default Favourite;