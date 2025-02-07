import React from "react";
import TypeparcCreate from "./TypeparcCreate";
import TypeparcEdit from "./TypeparcEdit";
import TypeparcDelete from "./TypeparcDelete";
import { closeModal } from "../../utils/utils";
import { resetErrors } from "../../features/sites/SitesSlice";
import { useDispatch } from "react-redux";

function TypeparcModal({
  newSite,
  editSite,
  destroySite,
  setNewSite,
  setEditSite,
  setDestroySite,
  operation,
}) {
  const dispatch = useDispatch();

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {operation === "new"
                ? "Ajouter un nouveau site"
                : operation === "edit"
                ? "Modifier un site"
                : operation === "delete"
                ? "Supprimer un site"
                : "aucune opération choisie!"}
            </h1>
            <button
              onClick={() => {
                closeModal("staticBackdrop");
                dispatch(resetErrors());
              }}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>

          {/* CREATE */}
          {operation === "new" && (
            <>
              <TypeparcCreate setNewSite={setNewSite} newSite={newSite} />
            </>
          )}

          {/* EDIT */}
          {operation === "edit" && (
            <>
              <TypeparcEdit setEditSite={setEditSite} editSite={editSite} />
            </>
          )}

          {/* DELETE */}
          {operation === "delete" && (
            <>
              <TypeparcDelete
                setDestroySite={setDestroySite}
                destroySite={destroySite}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TypeparcModal;
