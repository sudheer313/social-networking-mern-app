import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";

const TrendingPost = () => {
  return (
    <div className="flex flex-col gap-4 border p-4 my-3 rounded-md cursor-pointer">
      <div className="flex items-center gap-4">
        <img
          src="https://robohash.org/random"
          alt="roboimgs"
          className="h-10 w-10 p-1 rounded-full cursor-pointer bg-slate-400"
        />
        <h2>Michel</h2>
      </div>
      <h1 className="my-2">🎉 Welcome to PostIt 🎉</h1>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <AiOutlineHeart className="text-2xl" />
          <span>80</span>
        </div>
        <div className="flex items-center gap-4">
          <AiOutlineComment className="text-2xl" />
          <span>80</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingPost;
