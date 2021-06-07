import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";

function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  const handlePagebtn = (index) => {
    setPage(index);
  };

  const handlePrev = () => {
    setPage((page - 1 + followers.length) % followers.length);
  };

  const handleNext = () => {
    setPage((page + 1) % followers.length);
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    setFollowers(data[page]);
  }, [loading, page]);

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "Loading..." : "Pagination"}</h1>
        <div className="underline"></div>
        <section className="followers">
          <div className="container">
            {followers.map((follower) => {
              return <Follower key={follower.id} {...follower} />;
            })}
          </div>
          {!loading && (
            <div className="btn-container">
              <button className="prev-btn" onClick={handlePrev}>
                Prev
              </button>
              {console.log("data", data.length)}
              {data.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`page-btn ${
                      page === index ? "active-btn" : null
                    }`}
                    onClick={() => handlePagebtn(index)}
                  >
                    {index + 1}{" "}
                  </button>
                );
              })}
              <button className="next-btn" onClick={handleNext}>
                Next
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
