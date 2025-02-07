import React, { useEffect } from "react";
import moment from "moment";
import useStoreTypeparcs from "../../app/useStoreTypeparcs";

const List = () => {
  const { typeparcs, isLoading, getTypeparcs } = useStoreTypeparcs();

  useEffect(() => {
    // Call the API when the component mounts
    getTypeparcs();
  }, [getTypeparcs]);

  return (
    <div>
      <div className="d-flex gap-2 align-items-center justify-content-between">
        <h1>List</h1>
        {isLoading && <strong className="text-success">Chargement...</strong>}
      </div>

      <table className="table table-sm table-hover">
        <thead>
          <tr className="text-uppercase">
            <th>typeparc</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {typeparcs.map((typeparc, i) => {
            return (
              <tr key={i}>
                <td>{typeparc.name}</td>
                <td>{typeparc.description}</td>
                <td>
                  <div className="d-flex gap-3 float-end mx-2">
                    <i
                      onClick={() => {
                        console.log("ok");
                      }}
                      role="button"
                      className="bi bi-trash text text-sm text-danger pointer-events"
                    ></i>
                    <i
                      onClick={() => {
                        console.log("ok");
                      }}
                      role="button"
                      className="bi bi-pencil text text-sm text-info pointer-events"
                    ></i>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
