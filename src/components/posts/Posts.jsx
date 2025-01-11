import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllposts } from "./postsApi";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.postsData.isLoading);
  useEffect(() => {
    dispatch(getAllposts())
      .unwrap()
      .then((res) => {
        setPosts(res);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [dispatch]);

  return (
    <>
      <h6>POSTS LIST</h6>

      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {error ? (
            <p className="text-danger fst-italic ">{error}</p>
          ) : (
            <>
              {posts.length >= 1 ? (
                <div>
                  {posts.map((post, i) => {
                    return <h6 key={i}>{post.title}</h6>;
                  })}
                </div>
              ) : (
                "no data"
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Posts;
