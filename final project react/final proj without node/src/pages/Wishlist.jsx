import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishList } from "../store/slices/wishListCounter"; // استيراد الـ action الصحيح

export default function Wishlist() {
  const wishList = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  const handleFavorite = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromWishList(item.id)); // استخدام الـ action الصحيح لإزالة العنصر
  };

  return (
    <div className="mt-5 container " style={{ minHeight: "61.2vh" }}>
      <h2 className="fw-bold text-center p-5 text-warning">My Wishlist</h2>
      {wishList.length === 0 ? (
        <h5 className="text-muted fw-bold text-center pb-5">
          No items in your wishlist
        </h5>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4 p-2">
          {wishList.map((item) => {
            const vote = Math.round(item.vote_average / 2);
            const isFavorite = true;
            const title = item.title || item.name;
            const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
            const detailPath =
              item.media_type === "movie"
                ? `/movie/${item.id}`
                : `/tv/${item.id}`;

            return (
              <div className="col" key={item.id}>
                <Link to={detailPath} className="text-decoration-none">
                  <div className="card h-100">
                    <img
                      src={imageUrl}
                      alt={title}
                      className="img img-fluid"
                      data-aos="fade-right"
                      data-aos-delay="100"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      <p className="card-text">
                        {item.overview.slice(0, 100)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>
                          {Array(5)
                            .fill()
                            .map((_, index) =>
                              index < vote ? (
                                <i
                                  className="bi bi-star-fill text-warning fs-5 me-1"
                                  key={index}
                                ></i>
                              ) : (
                                <i
                                  className="bi bi-star text-warning fs-5 me-1"
                                  key={index}
                                ></i>
                              )
                            )}
                        </span>
                        <button
                          className="btn p-0"
                          onClick={(e) => handleFavorite(e, item)}
                        >
                          {isFavorite ? (
                            <i className="bi bi-heart-fill text-warning fs-5"></i>
                          ) : (
                            <i className="bi bi-heart text-warning fs-5"></i>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
