import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { name, cuisines, avgRating, costForTwo, areaName, cloudinaryImageId } =
    resData?.info || {};

  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={CDN_URL + cloudinaryImageId}
        alt="resImg"
      />
      <h3 className="res-name">{name}</h3>

      <div className="res-rating">
        <h4>{avgRating} ⭐</h4>
      </div>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{costForTwo}</h4>
      <h4>{areaName}</h4>
    </div>
  );
};

export default RestaurantCard;
