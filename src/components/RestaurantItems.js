import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { MENU_API } from "../utils/constants";
import { useParams } from "react-router-dom";
import { ITEM_URL } from "../utils/constants";
import { DEFAULT_ITEM_URL } from "../utils/constants";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantItems = () => {
  const [resItems, setResItems] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // ✅ Correct, CORS-safe API call through your proxy
    const response = await fetch(
      `/.netlify/functions/swiggy/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.406498&lng=78.47724389999999&restaurantId=${resId}`
    );
    const json = await response.json();
    setResItems(json.data);
  };

  const [showIndex, setShowIndex] = useState(null);

  if (resItems == null) {
    return <Shimmer />;
  }

  const { name, cuisines, costForTwoMessage } =
    resItems?.cards[2]?.card?.card?.info;

  // const itemList1 =
  //   resItems?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
  //     ?.itemCards;

  // const itemList2 =
  //   resItems?.cards[1]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
  //     ?.restaurants[0];

  // const itemList = itemList1 == null ? itemList2 : itemList1;

  const itemList = resItems?.cards
    ?.find((card) => card.groupedCard)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.flatMap(
      (card) => card.card?.card?.itemCards || []
    )
    ?.filter((item) => item.card?.info);

  const categories = resItems?.cards
    ?.find((card) => card.groupedCard)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((card) => card.card?.card)
    ?.filter((card) => card?.title && card?.itemCards)
    ?.map((card) => ({
      categoryTitle: card.title,
      items: card.itemCards.map((item) => item.card?.info),
    }));

  console.log(categories);

  if (itemList == null) {
    return (
      <div className="no-menu">
        <h2>No Menu Available for This Restaurant</h2>
        <p>Please try another one. 😔</p>
      </div>
    );
  }

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>Menu</h1>
        <h2>{name}</h2>
        <h3>{cuisines.join(", ")}</h3>
      </div>

      {/* <div className="item-list">
        {itemList.map((item, index) => {
          return (
            <div key={item.card.info.id + "_" + index} className="menu-item">
              <div className="item-details">
                <h3 className="item-name">{item.card.info.name}</h3>
                <h5 className="item-price">
                  ₹{" "}
                  {Math.floor(item.card.info.price / 100) ||
                    Math.floor(item.card.info.defaultPrice / 100)}
                </h5>
                <p className="item-description">{item.card.info.description}</p>
              </div>

              <div className="item-image-container">
                <img
                  className="item-image"
                  alt="item"
                  src={
                    item.card.info.imageId
                      ? ITEM_URL + item.card.info.imageId
                      : DEFAULT_ITEM_URL
                  }
                />
              </div>
            </div>
          );
        })}
      </div> */}

      {categories.map((category, index) => (
        <RestaurantCategory
          key={category.categoryTitle}
          title={category.categoryTitle}
          items={category.items}
          showItems={index === showIndex && true}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantItems;
