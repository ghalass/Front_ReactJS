import React from "react";
import SitesItem from "./SitesItem";
import { useSelector } from "react-redux";

function SitesList({ sites, setEditSite, setDestroySite, setOperation }) {
  const { isLoading } = useSelector((state) => state.sites);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            <div className="d-flex align-items-center justify-content-between">
              <span>
                <span className="me-1">POSTS LIST</span>
                <span className="badge rounded-pill bg-info text-dark">
                  Total : {sites.length}
                </span>
              </span>
              {isLoading && (
                <span className="text-center">
                  <div
                    className="spinner-border spinner-border-sm me-1"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Chargement...
                </span>
              )}
            </div>
          </h5>

          <table className="table table-sm table-hover">
            <thead>
              <tr>
                <th>Site</th>
                <th>Description</th>
                <th>Crée</th>
                <th>Modifié</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site, i) => {
                return (
                  <SitesItem
                    key={i}
                    site={site}
                    setEditSite={setEditSite}
                    setDestroySite={setDestroySite}
                    setOperation={setOperation}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default SitesList;
