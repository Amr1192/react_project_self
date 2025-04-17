import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";

const TVCard = ({ tv }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  //   const vote = tvDetails ? Math.round(tvDetails.vote_average / 2) : 0;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsFavorite(saved.some((item) => item.id === tv.id));
  }, [tv.id]);

  const toggleFavorite = () => {
    let saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (isFavorite) {
      saved = saved.filter((item) => item.id !== tv.id);
    } else {
      saved.push(tv);
    }
    localStorage.setItem("wishlist", JSON.stringify(saved));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card bg-white shadow-md rounded relative overflow-hidden mb-4">
      <img
        src={tv.image}
        alt={tv.title}
        className="card-img-top w-100 h-100 object-cover rounded"
      />

      {/* Rating Badge */}
      <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
        {tv.rating}%
      </div>

      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className="position-absolute bottom-0 end-0 m-2 btn btn-light rounded-circle border border-primary "
        style={{ zIndex: 1 }}
      >
        {isFavorite ? "💛" : "🤍"}
      </button>

      {/* Title & Date */}
      <div className="p-2">
        <h3 className="card-title text-base font-semibold">{tv.title}</h3>
        <p className="text-xs text-gray-500">{tv.date}</p>
      </div>
      {tv.rating !== "N/A" ? (
        <div className="flex items-center mt-1">
          <ReactStars
            count={5}
            value={tv.rating / 10}
            size={24}
            color2={"#ffd700"}
            edit={false}
          />
        </div>
      ) : (
        <span className="text-gray-400 text-xs">No Rating</span>
      )}
    </div>
  );
};

export default TVCard;
