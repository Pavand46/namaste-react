import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import OfflineBanner from "./OfflineBanner";
import Error from "./Error";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]); // ✅ store original list
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(null); // ✅ keep error message
  const [loading, setLoading] = useState(true); // ✅ track loading

  const OnlineStatus = useOnlineStatus();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // ✅ For deployment: CORS safe API call
      const API_URL =
        "/.netlify/functions/swiggy/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }

      const json = await response.json();

      const fetchedRestaurants =
        json?.data?.cards
          ?.map(
            (card) => card.card?.card?.gridElements?.infoWithStyle?.restaurants
          )
          .filter(Boolean)[0] || [];

      setRestaurantList(fetchedRestaurants);
      setAllRestaurants(fetchedRestaurants);
      setLoading(false);
    } catch (err) {
      setError(err.message); // ✅ show error message
      setLoading(false);
    }
  };

  // ✅ Show Offline Banner
  if (OnlineStatus === false) {
    return <OfflineBanner />;
  }

  // ✅ Show Error Component if something goes wrong
  if (error) {
    return <Error message={error} />;
  }

  // ✅ Show Shimmer while fetching
  if (loading) {
    return <Shimmer />;
  }

  return (
    <div className="body-container">
      <div className="button-container">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = allRestaurants.filter(
              (restaurant) => restaurant.info.avgRating > 4.5
            );
            setRestaurantList(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>

        <div className="filter-restaurants">
          <input
            className="input-btn"
            type="text"
            value={searchText}
            placeholder="Search Restaurants..."
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="search-restaurant"
            onClick={() => {
              const filteredList = allRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setRestaurantList(filteredList);
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* ✅ Show "No results found" instead of empty container */}
      <div className="res-container">
        {restaurantList.length === 0 ? (
          <h2>No restaurants found 🚫</h2>
        ) : (
          restaurantList.map((restaurant) => {
            const resId = restaurant.info.id;
            return (
              <Link to={"restaurant/" + resId} key={resId}>
                <RestaurantCard resData={restaurant} />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Body;
