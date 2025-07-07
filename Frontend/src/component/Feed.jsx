import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constant";
import { addFeed } from "../utils/appSlice";
import { useEffect } from "react";
import FeedUser from "./FeedUser";

const Feed = () => {
  const dispatch = useDispatch();
  const feedForUser = useSelector((store)=> store.feedReducer?.data)

  const feedfetch = async () => {
    try {
        if(feedForUser) return;
      const feed = await fetch(BASE_URL + "/api/users/feed", {
        credentials: "include",
      });
      if (!feed.ok) {
        return;
      }
      const feedInJson = await feed.json();
      console.log("feedInJson.data->",feedInJson.data)
      dispatch(addFeed(feedInJson.data));
      console.log("feedForUser-",feedForUser)
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    feedfetch();
  }, []);

  return (
    <div className="flex flex-wrap gap-6 justify-center p-4 bg-gray-50 min-h-screen">
        {feedForUser && <FeedUser
          _id = {feedForUser[1]?._id}
          photoUrl={feedForUser[1]?.photoUrl}
          firstName={feedForUser[1]?.firstName}
          lastName={feedForUser[1]?.lastName}
          about={feedForUser[1]?.about}
        />}
    </div>
  );
};

export default Feed;
