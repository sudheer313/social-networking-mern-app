import React from "react";
import Navbar from "../components/Navbar";
import { MdAdd } from "react-icons/md";
import TrendingPostList from "../components/TrendingPostList";
import PostList from "../components/PostList";

const Home = () => {
  return (
    <div className="md:container md:mx-auto md:px-40">
      <Navbar />
      <div className="flex flex-row gap-2">
        <div className="mx-4 md:basis-3/4">
          <div className="flex items-center gap-4 border p-4 rounded-md">
            <div className="flex items-center gap-2 border p-2 rounded-md">
              <MdAdd className="text-xl" />
              <h1>NEW POST</h1>
            </div>
          </div>
          <PostList />
        </div>
        <TrendingPostList />
      </div>
    </div>
  );
};

export default Home;
