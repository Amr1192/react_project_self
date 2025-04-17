import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTVDetails } from "../apis/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeFromWishList,
} from "../store/slices/wishListCounter";
import TVDetailsCard from "../components/TVDetailsCard";
import TVRecommendations from "../components/TVRecomendations";
import TVReviews from "../components/TVReviews";

export default function TVDetails() {
  const params = useParams();
  const [tvDetails, setTVDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const wishList = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  const vote = tvDetails ? Math.round(tvDetails.vote_average / 2) : 0;
  console.log("vote: ", vote);

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
    <>
      <div
        className="mt-5 tvDetails "
        style={{
          backgroundImage: tvDetails
            ? `url( https://image.tmdb.org/t/p/original${tvDetails.backdrop_path})`
            : "none",
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundSize: "cover",
        }}
      >
        {loading ? (
          <h5>Loading...</h5>
        ) : (
          <TVDetailsCard
            tvDetails={tvDetails}
            vote={vote}
            HandleIsFavorite={HandleIsFavorite}
            favorite={favorite}
          />
        )}
      </div>

      <TVReviews id={params.id} />
      <TVRecommendations id={params.id} vote={vote} />
    </>
  );
}
