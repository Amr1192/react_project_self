// import React, { useEffect, useState } from "react";
// import { searchMoviesTV } from "../apis/config";

// export default function Search() {
//   const [search, setSearch] = useState("");
//   const [resultSearch, setResultSearch] = useState([]);

//   useEffect(() => {
//     search.length === 0
//       ? setResultSearch([])
//       : searchMoviesTV(search)
//           .then((res) => {
//             console.log(res.data.results);
//             setResultSearch(res.data.results);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//   }, [search]);

//   return (
//     <div className="container my-5 ">
//       <h2 className="fs-2 fw-bold text-warning mb-4">Search Movies & TV</h2>
//       <form class="row g-3">
//         <div class="col-10">
//           <input
//             className="form-control rounded-pill h-75 "
//             type="search"
//             id="exampleDataList"
//             placeholder="Type to search..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//             }}
//           />
//         </div>

//         <button
//           type="text"
//           class="btn btn-dark mb-3 col-2 rounded-4 h-100"
//           onClick={(e) => e.preventDefault()}
//         >
//           Search
//         </button>
//       </form>

//       {/* result */}
//       {resultSearch === 0 ? (
//         // <p className="text-dark text-center">
//         //   "Start typing to search for movies and TV shows."
//         // </p>
//         <p className="text-dark text-center">"No results found."</p>
//       ) : (
//         <div className="row row-cols-1 row-cols-md-3 g-4 mt-3 h-100">
//           {resultSearch.map((result) => {
//             return (
//               <div className="col" key={result.id}>
//                 <div className="card shadow">
//                   <img
//                     src={`https://image.tmdb.org/t/p/w500${
//                       result.poster_path || result.profile_path
//                     }`}
//                     className="card-img-top"
//                     alt={result.name || result.title}
//                   />
//                   <div className="card-body">
//                     <h5 className="fw-bold ">{result.name || result.title}</h5>
//                     <p className="text-muted ">{`(${
//                       result.first_air_date || result.release_date || 1235
//                     })`}</p>

//                     {/* <span>
//                       {Array(5)
//                         .fill()
//                         .map((_, index) =>
//                           index < vote ? (
//                             <i
//                               className="bi bi-star-fill text-warning fs-5 me-1"
//                               key={index}
//                             ></i>
//                           ) : (
//                             <i
//                               className="bi bi-star text-warning fs-5 me-1"
//                               key={index}
//                             ></i>
//                           )
//                         )}
//                     </span> */}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMoviesTV } from "../apis/config";

export default function Search() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [resultSearch, setResultSearch] = useState([]);
  const [filterType, setFilterType] = useState("all"); // لفلترة النتائج (all, movies, tv)

  const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    if (query) {
      setSearch(query);
    }
  }, [query]);

  useEffect(() => {
    if (search.length === 0) {
      setResultSearch([]);
      return;
    }

    searchMoviesTV(search)
      .then((res) => {
        console.log(res.data.results);
        setResultSearch(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [search]);

  const filteredResults = resultSearch.filter((result) => {
    if (filterType === "movies") return result.media_type === "movie";
    if (filterType === "tv") return result.media_type === "tv";
    return true;
  });

  return (
    <div className="container my-5" style={{ minHeight: "61.2vh" }}>
      <h2 className="fs-2 fw-bold text-warning mb-4">Search Movies & TV</h2>

      <form className="row g-3">
        <div className="col-10">
          <input
            className="form-control rounded-pill h-75"
            type="search"
            id="exampleDataList"
            placeholder="Type to search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-dark mb-3 col-2 rounded-4 h-100"
          onClick={(e) => e.preventDefault()}
        >
          Search
        </button>
      </form>

      <div className="my-3">
        <button
          className={`btn ${
            filterType === "all" ? "btn-warning" : "btn-outline-warning"
          } me-2`}
          onClick={() => setFilterType("all")}
        >
          All
        </button>
        <button
          className={`btn ${
            filterType === "movies" ? "btn-warning" : "btn-outline-warning"
          } me-2`}
          onClick={() => setFilterType("movies")}
        >
          Movies
        </button>
        <button
          className={`btn ${
            filterType === "tv" ? "btn-warning" : "btn-outline-warning"
          }`}
          onClick={() => setFilterType("tv")}
        >
          TV Shows
        </button>
      </div>

      <div>
        {search.length === 0 ? (
          <p className="text-dark text-center">
            Start typing to search for movies and TV shows.
          </p>
        ) : filteredResults.length === 0 ? (
          <p className="text-dark text-center">No results found.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4 mt-3 h-100">
            {filteredResults.map((result) => {
              const vote = Math.round(result.vote_average / 2);
              return (
                <div className="col" key={result.id}>
                  <div className="card shadow">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${
                        result.poster_path || result.profile_path
                      }`}
                      className="card-img-top"
                      alt={result.name || result.title}
                    />
                    <div className="card-body">
                      <h5 className="fw-bold">{result.name || result.title}</h5>
                      <p className="text-muted">
                        (
                        {result.first_air_date ||
                          result.release_date ||
                          "Unknown"}
                        )
                      </p>

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
        )}
      </div>
    </div>
  );
}
