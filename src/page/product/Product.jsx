 import React, { useContext, useEffect, useState } from "react";
import ProductCart from "../product/ProductCart";
import { ProductContext } from "../../context/ProductContext";

const Product = () => {
  const { product, search, category, loading, error } =
    useContext(ProductContext);

  // Debounce Search
  const [debounce, setDebounce] = useState(search);

  // Pagination
  const [pagination, setPagination] = useState(1);
  const limit = 8;

  // Debounce Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Filter Products
  const dataFiltered = product.filter((item) => {
    const searchMatched = item.title
      .toLowerCase()
      .includes(debounce.toLowerCase());

    const categoryMatched =
      category === "All" || item.category === category.toLowerCase();

    return searchMatched && categoryMatched;
  });

  // Pagination Logic
  const lastIndex = pagination * limit;
  const firstIndex = lastIndex - limit;

  const currentPage = dataFiltered.slice(firstIndex, lastIndex);

  const totalPage = Math.ceil(dataFiltered.length / limit);

  // Reset Pagination on Search / Category Change
  useEffect(() => {
    setPagination(1);
  }, [search, category]);

  // Scroll to Top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pagination]);

  return (
    <div className="bg-slate-950 min-h-screen w-full p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold text-white mb-8 tracking-tight">
          Featured Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* Loading */}
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-24">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-slate-700 rounded-full"></div>

                <div className="absolute inset-0 w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-white">
                Loading Products...
              </h2>

              <p className="text-slate-400 mt-2">
                Please wait while we fetch products.
              </p>
            </div>
          ) : error ? (

            /* Error */
            <div className="col-span-full flex justify-center py-20">
              <div className="max-w-md w-full bg-red-500/10 border border-red-500/30 rounded-3xl p-8 text-center backdrop-blur-sm">

                <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center text-4xl mb-5">
                  ❌
                </div>

                <h2 className="text-2xl font-bold text-red-400 mb-3">
                  Something Went Wrong
                </h2>

                <p className="text-slate-300">{error}</p>

                <p className="text-slate-500 text-sm mt-4">
                  Please refresh the page and try again.
                </p>
              </div>
            </div>
          ) : currentPage.length === 0 ? (

            /* No Product */
            <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-900/40 border border-slate-800 rounded-3xl">

              <div className="h-16 w-16 bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-700 text-3xl mb-5 animate-bounce">
                🔍
              </div>

              <h2 className="text-2xl font-bold text-white">
                No Products Found
              </h2>

              <p className="text-slate-400 mt-2">
                Try searching with another keyword.
              </p>
            </div>
          ) : (
            currentPage.map((item) => (
              <ProductCart key={item.id} data={item} />
            ))
          )}
        </div>
      </div>

      {/* Pagination */}

      {totalPage > 1 && (
        <div className="flex justify-center items-center gap-6 mt-12 pb-6">

          <button
            onClick={() => setPagination((prev) => prev - 1)}
            disabled={pagination === 1}
            className="px-5 py-2.5 text-xs font-bold uppercase text-slate-300 bg-slate-900 border border-slate-700 rounded-xl hover:border-indigo-500 hover:text-white transition disabled:opacity-30 disabled:pointer-events-none"
          >
            Prev
          </button>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg font-bold">
              {pagination}
            </span>

            <span className="text-slate-500">of</span>

            <span className="bg-slate-800 text-white px-3 py-1 rounded-lg font-bold">
              {totalPage}
            </span>
          </div>

          <button
            onClick={() => setPagination((prev) => prev + 1)}
            disabled={pagination === totalPage}
            className="px-5 py-2.5 text-xs font-bold uppercase text-slate-300 bg-slate-900 border border-slate-700 rounded-xl hover:border-indigo-500 hover:text-white transition disabled:opacity-30 disabled:pointer-events-none"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;