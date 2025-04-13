import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../apis/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeFromWishList,
} from "../store/slices/wishListCounter";

export default function MovieDetails() {
  const params = useParams();
  const [MovieDetails, setMovieDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const wishList = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getMovieDetails(params.id)
      .then((res) => {
        setMovieDetails(res.data);
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
      dispatch(removeFromWishList(MovieDetails.id));
      setFavorite(false);
    } else {
      dispatch(addToWishList(MovieDetails));
      setFavorite(true);
    }
  };

  return (
    <div className="mt-5 MovieDetails">
      {loading ? (
        <h5>Loading...</h5>
      ) : (
        <div className="row d-flex align-items-center">
          <div className="col-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${MovieDetails.poster_path}`}
              alt={MovieDetails.title}
              className="img img-fluid"
            />
          </div>

          <div className="col-8">
            <h2>{MovieDetails.title}</h2>
            <p>{`(${MovieDetails.release_date})`}</p>
            <h5>Overview</h5>
            <p>{MovieDetails.overview}</p>

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
