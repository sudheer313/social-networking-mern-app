import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";

const Post = () => {
  return (
    <div className="flex flex-row border my-4 cursor-pointer">
      <div className="basis-1/12 bg-slate-200 p-2">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col items-center gap-2">
            <AiOutlineHeart className="text-2xl" />
            <span>80</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AiOutlineComment className="text-2xl" />
            <span>80</span>
          </div>
        </div>
      </div>
      <div className="basis-11/12 p-4">
        <div className="flex items-center gap-4">
          <img
            src="https://robohash.org/random"
            alt="roboimgs"
            className="h-10 w-10 p-1 rounded-full cursor-pointer bg-slate-400"
          />
          <h2>Michel</h2>
        </div>
        <div className="py-4">🎉 Welcome to PostIt 🎉</div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
          pariatur enim placeat deleniti quos recusandae incidunt quasi repellat
          laudantium mollitia. Natus porro aliquam tempora.
        </div>
      </div>
    </div>
  );
};

export default Post;
