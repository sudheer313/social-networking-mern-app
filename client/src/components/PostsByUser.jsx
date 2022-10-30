import { useQuery } from "@apollo/client";
import React from "react";


import { QUERY_POSTBYUSER } from "../utils/queries";
import Post from "./Post";

const PostsByUser = ({ userId }) => {
  const { loading, error, data } = useQuery(QUERY_POSTBYUSER, {
    variables: { userId },
    fetchPolicy: "no-cache",
  });

  const getPostsByUser = data?.getPostsByUser || [];

  if (error) {
    console.log("error request", error);
  }
  return (
    <div className="">
      {loading ? (
        <div> Request is loading </div>
      ) : (
        <>
          {getPostsByUser.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </>
      )}
    </div>
  );
};

export default PostsByUser;
