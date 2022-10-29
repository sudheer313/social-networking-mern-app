import React from "react";

const UserBio = () => {
  return (
    <div className="flex flex-col items-center">
      <img
        src="https://robohash.org/random"
        alt="roboimgs"
        className="h-28 w-28 p-1 rounded-full bg-slate-400"
      />
      <h2 className="py-2">Michel</h2>
      <p className="pb-2 text-slate-500">Bio of the user</p>
      <div className="flex gap-12">
        <p>Posts 0</p>
        <p>Followers 0</p>
      </div>
    </div>
  );
};

export default UserBio;
