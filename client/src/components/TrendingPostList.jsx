import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import TrendingPost from "../components/TrendingPost";
import { useQuery } from "@apollo/client";
import { QUERY_ALLTRENDINGPOSTS } from "../utils/queries";

const TrendingPostList = () => {
  const { loading, error, data } = useQuery(QUERY_ALLTRENDINGPOSTS, {
    fetchPolicy: "no-cache",
  });
  const getallTrendingPosts = data?.getAllTrendingPosts || [];

  if (error) {
    console.log("error request", error);
  }

  return (
    <div className="hidden md:inline-flex md:flex-col md:basis-1/4">
      <div className="flex items-center gap-4 border p-4 rounded-md">
        <FiTrendingUp />
        <h1>Trending Posts</h1>
      </div>
      <div className="">
        {loading ? (
          <div> Request is loading </div>
        ) : (
          <>
            {getallTrendingPosts.map((trendPost) => (
              <TrendingPost key={trendPost._id} trendPost={trendPost} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TrendingPostList;
