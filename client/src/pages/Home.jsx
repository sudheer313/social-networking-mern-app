import React from "react";
import Navbar from "../components/Navbar";
import { FiTrendingUp } from "react-icons/fi";
import { MdAdd } from "react-icons/md";

import Post from "../components/Post";
import { useQuery } from "@apollo/client";
import { QUERY_ALLPOSTS } from "../utils/queries";
import { QUERY_ALLTRENDINGPOSTS } from "../utils/queries";
import TrendingPost from "../components/TrendingPost";
const Home = () => {
  const { loading, error, data } = useQuery(
    QUERY_ALLPOSTS,

    {
      fetchPolicy: "no-cache",
    }
  );

  const {
    loading: trendLoader,
    error: trendError,
    data: trendData,
  } = useQuery(QUERY_ALLTRENDINGPOSTS, {
    fetchPolicy: "no-cache",
  });

  const allPosts = data?.getAllPosts || []; //data.getAllPosts

  const getallTrendingPosts = trendData?.getAllTrendingPosts || [];
  console.log(getallTrendingPosts);
  if (loading) {
    console.log("Request loading", loading);
  }
  if (error) {
    console.log("error request", error);
  }

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
          <div className="">
            {loading ? (
              <div> Request is loading </div>
            ) : (
              <>
                {allPosts.map((post) => (
                  <Post key={post._id} post={post} />
                ))}
              </>
            )}
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default Home;
