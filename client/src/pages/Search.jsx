import React from "react";
import Navbar from "../components/Navbar";
import { MdAdd } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import TrendingPostList from "../components/TrendingPostList";
import PostList from "../components/PostList";

const Search = () => {
  const [search] = useSearchParams();

  if (search.get("search") && search.get("search").length > 0) {
    console.log(search.get("search"));
  }

  return (
    <div className="md:container md:mx-auto md:px-40">
      <Navbar />
      <div className="flex flex-row gap-2">
        <div className="mx-4 md:mx-0 md:basis-3/4">
          <div className="flex items-center gap-4 border p-4 rounded-md">
            <Link to="/posts/create">
              <div className="flex items-center gap-2 border p-2 rounded-md cursor-pointer">
                <MdAdd className="text-xl" />
                <h1>NEW POST</h1>
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center pt-4">
            <h1 className="text-2xl">Showing results for "something"</h1>
            <p className="text-xl">0 results found</p>
          </div>
          <PostList />
        </div>
        <TrendingPostList />
      </div>
    </div>
  );
};

export default Search;
