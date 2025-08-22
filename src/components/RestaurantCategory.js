import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import Error from "./Error"; // import your Error component

const RestaurantCategory = ({ title, items, showItems, setShowIndex }) => {
  const dispatch = useDispatch();

  const toggleCategory = () => {
    try {
      setShowIndex();
    } catch (error) {
      console.error("Error in toggleCategory:", error);
      return <Error />;
    }
  };

  const handleAddItems = (item) => {
    try {
      dispatch(addItem(item));
    } catch (error) {
      console.error("Error while adding item:", error);
      return <Error />;
    }
  };

  try {
    // check if items is valid array
    if (!Array.isArray(items)) {
      throw new Error("Invalid items data");
    }

    return (
      <div className="restaurant-category">
        <div className="category-header" onClick={toggleCategory}>
          <h3>{title}</h3>
          <span>{showItems ? "▲" : "▼"}</span>
        </div>

        {showItems && (
          <ul className="menu-list">
            {items.map((item) => (
              <li key={item.id} className="menu-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <p>
                    ₹
                    {Math.floor(item.price / 100) ||
                      Math.floor(item.defaultPrice / 100)}
                  </p>
                </div>
                <div className="item-image-container">
                  <img
                    className="item-image"
                    alt={item.name}
                    src={
                      item.imageId
                        ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1000,h_1000,c_fit/${item.imageId}`
                        : "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1000,h_1000,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/12/11/3f893abc-d141-4665-9826-7e2afa305865_e555da13-457f-436c-a567-1b0a54a0e51c.jpg"
                    }
                  />
                  <button
                    onClick={() => handleAddItems(item)}
                    className="item-button"
                  >
                    Add
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  } catch (error) {
    // console.error("Error in RestaurantCategory:", error);
    return <Error />;
  }
};

export default RestaurantCategory;
