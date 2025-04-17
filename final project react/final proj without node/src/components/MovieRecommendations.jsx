import React, { useEffect, useState } from "react";
import { getMovieRecommendations } from "../apis/config";

export default function MovieRecommendations(props) {
  const { id, vote } = props;
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    getMovieRecommendations(id)
      .then((res) => {
        console.log(res.data.results);
        setRecommendations(res.data.results.slice(0, 8));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="my-5 container" data-aos="zoom-in-up" data-aos-delay="100">
      <h1 className="text-center text-warning">recommendations</h1>
      <div className="row row-cols-1 row-cols-md-4 g-4 mt-3 h-100">
        {recommendations.map((recommend) => {
          return (
            <div
              className="col"
              key={recommend.id}
              data-aos="zoom-in-right"
              data-aos-delay="100"
            >
              <div className="card shadow">
                <img
                  src={`https://image.tmdb.org/t/p/w500${
                    recommend.poster_path || recommend.profile_path
                  }`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="fw-bold ">
                    {recommend.title || recommend.name}
                  </h5>
                  <p className="text-muted ">{`(${
                    recommend.first_air_date || recommend.release_date
                  })`}</p>
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
