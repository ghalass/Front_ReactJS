import React, { useEffect, useState } from "react";
import { fetchSites } from "../../features/typeparcs/typeparcsApi";
import { useDispatch, useSelector } from "react-redux";
import TypeparcsList from "./TypeparcsList";
import TypeparcModal from "./TypeparcModal";
import { openModal } from "../../utils/utils";
import { resetErrors } from "../../features/typeparcs/typeparcsSlice";

const Typeparcs = () => {
  const [operation, setOperation] = useState("new");
  const [newSite, setNewSite] = useState({ name: "", description: "" });
  const [editSite, setEditSite] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [destroySite, setDestroySite] = useState({
    id: "",
    name: "",
    description: "",
  });

  const { sites, status, error } = useSelector((state) => state.sites);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSites());
    }
  }, [status, dispatch]);

  return (
    <div className="container-fluid">
      <main id="main" className="main">
        <section className="section">
          <button
            onClick={() => {
              setOperation("new");
              openModal("staticBackdrop");
              dispatch(resetErrors());
              setEditSite({
                id: "",
                name: "",
                description: "",
              });
              setNewSite({
                name: "",
                description: "",
              });
            }}
            type="button"
            className="btn btn-sm btn-outline-primary mb-2"
          >
            <i className="bi bi-plus-lg"></i> Nouveau
          </button>

          {/* LISTE DES SITES */}
          <TypeparcsList
            sites={sites}
            setEditSite={setEditSite}
            setDestroySite={setDestroySite}
            setOperation={setOperation}
          />
        </section>
      </main>

      {/* MODAL CRUD */}
      <TypeparcModal
        newSite={newSite}
        editSite={editSite}
        destroySite={destroySite}
        setNewSite={setNewSite}
        setEditSite={setEditSite}
        setDestroySite={setDestroySite}
        operation={operation}
      />
    </div>
  );
};

export default Typeparcs;
