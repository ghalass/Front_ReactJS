import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";

const Typeparcs = () => {
  const [typeparcs, setTypeparcs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTypeparcs();
  }, []);

  const onDeleteClick = (typeparc) => {
    if (!window.confirm("Are you sure you want to delete this typeparc?")) {
      return;
    }
    axiosClient.delete(`/typeparcs/${typeparc.id}`).then(() => {
      getTypeparcs();
    });
  };

  const getTypeparcs = () => {
    setLoading(true);
    axiosClient
      .get("/typeparcs")
      .then(({ data }) => {
        setLoading(false);
        setTypeparcs(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container-fluid">
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Typeparcs Page</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">Pages</li>
              <li className="breadcrumb-item active">Typeparcs</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          {/* ******************** */}

          <h1>NEW COMPONENT</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            {loading && (
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center">
                    Loading...
                  </td>
                </tr>
              </tbody>
            )}
            {!loading && (
              <tbody>
                {typeparcs.map((typeparc) => (
                  <tr key={typeparc.id}>
                    <td>{typeparc.id}</td>
                    <td>{typeparc.name}</td>
                    <td>{typeparc.email}</td>
                    <td>
                      <Link
                        className="btn-edit"
                        to={"/typeparcs/" + typeparc.id}
                      >
                        Edit
                      </Link>
                      &nbsp;
                      <button
                        className="btn-delete"
                        onClick={(ev) => onDeleteClick(typeparc)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </section>
      </main>
    </div>
  );
};

export default Typeparcs;
