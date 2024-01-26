import Restaurant from "./Restaurant";
import '../styles/RestaurantList.css';
import Search from "./Search";
import Filter from "./Filter";
import Sorter from "./Sorter";
import {useEffect} from "react";
import {checkTokenValidity} from "../utils/validation";
import {Outlet, useNavigate} from "react-router-dom";

const RestaurantList = ({data, currentPage, getAllRestaurants, handleSearch, handleFilter, handleSort}) => {
    const history = useNavigate();

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
            </div>
            {data?.content?.length === 0 && <div className="text-with-nothing">Ресторани не знайдено</div>}

            <div className='restaurant_list'>
                {data?.content?.length > 0 && data.content.map(restaurant => <Restaurant restaurant={restaurant} key={restaurant.id} />)}
            </div>

            {data?.content?.length > 0 && data?.totalPages > 1 &&
                <div className='pagination'>
                    <a onClick={() => getAllRestaurants(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>

                    { data && [...Array(data.totalPages).keys()].map((page, index) =>
                        <a onClick={() => getAllRestaurants(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}

                    <a onClick={() => getAllRestaurants(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
                </div>
            }
        </main>

    );
};

export default RestaurantList;