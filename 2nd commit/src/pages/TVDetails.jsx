import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTVDetails } from "../apis/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeFromWishList,
} from "../store/slices/wishListCounter";

export default function TVDetails() {
  const params = useParams();
  const [tvDetails, setTVDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const wishList = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getTVDetails(params.id)
      .then((res) => {
        setTVDetails(res.data);
        console.log(res.data);
        setLoading(false);
        const isInwishList = wishList.some((item) => item.id === res.data.id);
        setFavorite(isInwishList);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [params.id]);

  const HandleIsFavorite = (e) => {
    e.preventDefault();
    if (favorite) {
      dispatch(removeFromWishList(tvDetails.id));
      setFavorite(false);
    } else {
      dispatch(addToWishList(tvDetails));
      setFavorite(true);
    }
  };

  return (
    <div className="mt-5 tvDetails">
      {loading ? (
        <h5>Loading...</h5>
      ) : (
        <div className="row d-flex align-items-center">
          <div className="col-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`}
              alt={tvDetails.name}
              className="img img-fluid"
            />
          </div>

          <div className="col-8">
            <h2>{tvDetails.name}</h2>
            <p>{`(${tvDetails.first_air_date})`}</p>
            <h5>Overview</h5>
            <p>{tvDetails.overview}</p>

            <Link href="#" onClick={(e) => HandleIsFavorite(e)}>
              {favorite ? (
                <i className="bi bi-heart-fill"></i>
              ) : (
                <i className="bi bi-heart"></i>
              )}
            </Link>
            <Link to="/wishlist" className="btn btn-primary ms-3">
              Go to Wishlist
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
