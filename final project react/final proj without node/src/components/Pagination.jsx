import React from "react";

const Pagination = ({ currentPage, setPage }) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6 text-start mt-4">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        className="mx-2 px-3 py-1 border rounded hover:bg-gray-100"
      >
        Previous
      </button>
      <span className="font-semibold text-lg">{currentPage}</span>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        className="mx-2 px-3 py-1 border rounded hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
