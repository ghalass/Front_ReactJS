import useStoreTypeparcs from "../../app/useStoreTypeparcs";
import Form from "./Form";
import List from "./List";

const Typeparcs = () => {
  const { error } = useStoreTypeparcs();

  return (
    <div className="container-fluid">
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Blank Page</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">Pages</li>
              <li className="breadcrumb-item active">Blank</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          {/* ******************** */}

          <h1>Typeparcs</h1>

          {error && (
            <div className="alert alert-danger py-1">Error: {error}</div>
          )}

          <div className="row">
            <div className="col">
              <List />
            </div>
            <div className="col">
              <Form />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Typeparcs;
