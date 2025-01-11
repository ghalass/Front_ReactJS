import React from "react";
import Counter from "../components/counter/Counter";
import Posts from "../components/posts/Posts";

const Home = () => {
  return (
    <div className="container-fluid">
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Home Page</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">Pages</li>
              <li className="breadcrumb-item active">Home</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          {/* ******************** */}

          <h1>HOME PAGE</h1>

          {/* ******************** */}
          <Posts />
          <hr />
          <Counter />
        </section>
      </main>
    </div>
  );
};

export default Home;
