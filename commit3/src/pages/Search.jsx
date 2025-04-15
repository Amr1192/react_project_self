import React, { useEffect, useState } from "react";
import { searchMoviesTV } from "../apis/config";

export default function Search() {
  const [search, setSearch] = useState("");
  const [resultSearch, setResultSearch] = useState([]);

  useEffect(() => {
    search.length === 0
      ? setResultSearch([])
      : searchMoviesTV(search)
          .then((res) => {
            console.log(res.data.results);
            setResultSearch(res.data.results);
          })
          .catch((err) => {
            console.log(err);
          });
  }, [search]);

  return (
    <div className="container my-5 ">
      <h2 className="fs-2 fw-bold text-warning mb-4">Search Movies & TV</h2>
      <form class="row g-3">
        <div class="col-10">
          <input
            className="form-control rounded-pill h-75 "
            type="search"
            id="exampleDataList"
            placeholder="Type to search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        <button type="submit" class="btn btn-dark mb-3 col-2 rounded-4 h-100">
          Search
        </button>
      </form>

      {/* result */}
      
    </div>
  );
}
