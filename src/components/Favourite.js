import '../styles/Favourite.css';
import Restaurant from "./Restaurant";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {checkTokenValidity} from "../utils/validation";

const Favourite = ({data, currentPage, getAllRestaurants}) => {
    const history = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        checkTokenValidity(storedToken, history);
    }, []);

    return (
        <div className="favourite">
            {data?.content?.length === 0 &&
                <div className="favourite-text-with-nothing">Немає улюблених ресторанів</div>}

            <div className='restaurant_list'>
                {data?.content?.length > 0 && data.content.map(restaurant => <Restaurant restaurant={restaurant}
                                                                                         key={restaurant.id}/>)}
            </div>

            {data?.content?.length > 0 && data?.totalPages > 1 &&
                <div className='pagination'>
                    <a onClick={() => getAllRestaurants(currentPage - 1)}
                       className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>

                    {data && [...Array(data.totalPages).keys()].map((page, index) =>
                        <a onClick={() => getAllRestaurants(page)} className={currentPage === page ? 'active' : ''}
                           key={page}>{page + 1}</a>)}

                    <a onClick={() => getAllRestaurants(currentPage + 1)}
                       className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
                </div>
            }
        </div>
    );
};

export default Favourite;