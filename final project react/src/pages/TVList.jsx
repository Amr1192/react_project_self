import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTVShows } from "../apis/config"; // هنفترض إنك هتعملي دالة جديدة لجلب المسلسلات
import {
  addToWishList,
  removeFromWishList,
} from "../store/slices/wishListCounter";
import { Link, useNavigate } from "react-router-dom";

export default function TVList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const wishList = useSelector((state) => state.wishList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getTVShows(page)
      .then((res) => {
        setList(res.data.results);
        setTotalPages(res.data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [page]);

  const handleFavorite = (e, tvShow) => {
    e.preventDefault();
    e.stopPropagation();
    const isInWishList = wishList.some((item) => item.id === tvShow.id);
    if (isInWishList) {
      dispatch(removeFromWishList(tvShow.id));
    } else {
      dispatch(addToWishList(tvShow));
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="mt-5 container">
      <h1 className="text-warning text-center mb-3">Search Movies & TV</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <div
          className="d-flex justify-content-center"
          style={{ maxWidth: "500px" }}
        >
          <input
            type="text"
            className="form-control rounded-pill me-2"
            placeholder="Type to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn btn-dark rounded-pill"
            type="submit"
            style={{ width: "100px" }}
          >
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <h5>Loading...</h5>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {list.map((tvShow) => {
              const vote = Math.round(tvShow.vote_average / 2);
              const isFavorite = wishList.some((item) => item.id === tvShow.id);
              return (
                <div className="col" key={tvShow.id}>
                  <Link
                    to={`/tv/${tvShow.id}`}
                    className="text-decoration-none"
                  >
                    <div className="card h-100">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                        alt={tvShow.name}
                        className="img img-fluid"
                        data-aos="fade-right"
                        data-aos-delay="100"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{tvShow.name}</h5>
                        <p className="card-text">
                          {tvShow.overview.slice(0, 100)}...
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
                            onClick={(e) => handleFavorite(e, tvShow)}
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

          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </button>
              </li>
              {[...Array(Math.min(totalPages, 10))].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <li
                    key={pageNum}
                    className={`page-item ${page === pageNum ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  </li>
                );
              })}
              <li
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
