import React, { useEffect, useState } from "react";
import { getMovieReviews } from "../apis/config";

export default function MovieReviews(props) {
  const { id } = props;
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(id)
      .then((res) => {
        console.log(res.data.results);
        setMovieReviews(res.data.results.slice(0, 3));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="my-5 container" data-aos="zoom-in-up" data-aos-delay="100">
      <h1 className="text-center text-warning">Reviews</h1>
      {movieReviews.length == 0 ? (
        <h2 className="text-center text-muted mt-5">There are no reviews</h2>
      ) : (
        <div className="row row-cols-1  g-4 mt-3 h-100">
          {movieReviews.map((review) => {
            return (
              <div
                className="col "
                key={review.id}
                data-aos="flip-up"
                data-aos-delay="100"
                data-aos-easing="linear"
              >
                <div className="card shadow-lg">
                  <div className="card-body d-flex align-items-center ">
                    <img
                      src={
                        review.author_details?.avatar_path
                          ? `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
                          : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                      }
                      className="rounded-circle me-3"
                      style={{ width: "70px", height: "70px" }}
                      alt={review.author}
                    />
                    <h5 className="fw-bold ">{review.author}</h5>
                  </div>
                  <p className="card-text pb-5 p-3">{review.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
