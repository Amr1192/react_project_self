import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

export default function Wishlist() {
  // const [tvWislist, setTVWishlist] = useState();
  // const [movieWislist, setMovieWishlist] = useState();

  const wishList = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  return (
    <div className="mt-5 bg-warning-subtle">
      <h2 className=" fw-bold text-center p-5">My Wishlist</h2>
      {wishList.length === 0 ? (
        <h5 className="text-muted fw-bold text-center pb-5">
          No items in your wishlist
        </h5>
      ) : (
        <div class="row row-cols-1 row-cols-md-3 g-4 p-2">
          {wishList.map((item) => {
            return (
              <div class="col">
                <div class="card">
                  <img src="..." class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
