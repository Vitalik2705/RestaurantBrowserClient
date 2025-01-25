import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Home from "./pages/home/components/Home";
import RestaurantList from "./pages/restaurants/components/RestaurantList";
import {filterRestaurants, getRestaurants, searchRestaurants} from "./api/RestaurantService";
import {useEffect, useState} from "react";
import RestaurantView from "./pages/restaurants/components/restaurantView/RestaurantView";
import Login from "./pages/common/components/Login";
import Register from "./pages/common/components/Register";
import Favourite from "./pages/restaurants/components/Favourite";
import {getUserFavoriteRestaurants} from "./api/UserService";
import Layout from "./pages/common/components/AppLayout";
import About from "./pages/about/components/About";
import {LanguageProvider} from "./contexts/LanguageContext";

function App() {
  const [data, setData] = useState({});
  const [favourite, setFavourite] = useState({});
  const [favouriteCurrentPage, setFavouriteCurrentPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOption, setSortOption] = useState(1);

  const getAllRestaurants = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const {data} = await getRestaurants(page, size, sortOption);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllFavoriteRestaurants = async (page = 0, size = 10) => {
    try {
      setFavouriteCurrentPage(page);
      const favorites = await getUserFavoriteRestaurants(page, size);
      setFavourite(favorites);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = (selectedValue) => {
    setSortOption(selectedValue);
  };

  useEffect(() => {
    getAllRestaurants(currentPage);
  }, [sortOption, currentPage]);

  const handleSearch = async (searchTerm, page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const {data} = await searchRestaurants(searchTerm, page, size);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = async (searchTerms, page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const {data} = await filterRestaurants(searchTerms, page, size);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFavoriteRestaurants(favouriteCurrentPage);
  }, [favouriteCurrentPage]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/favourite" element={<Favourite data={favourite}
                                                       getAllRestaurants={getAllFavoriteRestaurants}
                                                       currentPage={favouriteCurrentPage}/>}></Route>
          <Route path="/restaurants"
                 element={<RestaurantList data={data}
                                          getAllRestaurants={getAllRestaurants}
                                          currentPage={currentPage}
                                          handleSearch={handleSearch}
                                          handleFilter={handleFilter}
                                          handleSort={handleSort}/>}>
          </Route>
          <Route path="/restaurants/:id" element={<RestaurantView/>}/>
        </Route>
      </>
    ))


  return (
    <LanguageProvider>
        <RouterProvider router={router} />
    </LanguageProvider>
  );
}

export default App;
