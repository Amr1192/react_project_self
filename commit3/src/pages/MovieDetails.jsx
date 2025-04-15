import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../apis/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeFromWishList,
} from "../store/slices/wishListCounter";
import MovieDetailsCard from "../components/MovieDetailsCard.jsx";
import MovieRecommendations from "../components/MovieRecommendations";
import MovieReviews from "../components/MovieReviews";

export default function MovieDetails() {
  const params = useParams();
  const [movieDetails, setMovieDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const wishList = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  const vote = movieDetails ? Math.round(movieDetails.vote_average / 2) : 0;
  console.log("vote: ", vote);

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
      dispatch(removeFromWishList(movieDetails.id));
      setFavorite(false);
    } else {
      dispatch(addToWishList(movieDetails));
      setFavorite(true);
    }
  };

  return (
    <>
      <div
        className="mt-5 movieDetails "
        style={{
          backgroundImage: movieDetails
            ? `url( https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`
            : "none",
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundSize: "cover",
        }}
      >
        {loading ? (
          <h5>Loading...</h5>
        ) : (
          <MovieDetailsCard
            movieDetails={movieDetails}
            vote={vote}
            HandleIsFavorite={HandleIsFavorite}
            favorite={favorite}
          />
        )}
      </div>

      <MovieReviews id={params.id} />
      <MovieRecommendations id={params.id} vote={vote} />
    </>
  );
}
