import React from "react";
import { closeModal } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../utils/alert";
import { deleteSite } from "../../features/sites/sitesApi";

const SiteDelete = ({ setDestroySite, destroySite }) => {
  const dispatch = useDispatch();
  const { error, status, isProcessing } = useSelector((state) => state.sites);

  const handleDeleteSite = (sitetId) => {
    dispatch(deleteSite(sitetId));

    if (status === "succeeded" && !error) {
      closeModal("staticBackdrop");
      showAlert("success", "Supprimé avec succès!");
    } else {
      console.log("error");
    }
  };
  return (
    <>
      <div className="modal-body">
        <div className="">
          <div className="form-floating mb-3 ">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Site"
              value={destroySite.name}
              onChange={(e) =>
                setDestroySite({ ...destroySite, name: e.target.value })
              }
              disabled
            />
            <label htmlFor="name">Site</label>
            <small className="text-danger fst-italic">
              {error?.errors?.name}
            </small>
          </div>
          <div className="form-floating  mb-3 ">
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="description"
              value={destroySite.description}
              onChange={(e) =>
                setDestroySite({ ...destroySite, description: e.target.value })
              }
              disabled
            />
            <label htmlFor="description">Description</label>
            <small className="text-danger fst-italic">
              {error?.errors?.description}
            </small>
          </div>
        </div>
        <h5 className="text-danger">
          <i className="bi bi-exclamation-triangle"></i> Voulez-vous vraiment
          <span className="badge rounded-pill text-bg-danger mx-1 ">
            Supprimer
          </span>
          ce site?
        </h5>
      </div>
      <div className="modal-footer">
        <button
          onClick={() => closeModal("staticBackdrop")}
          type="button"
          className="btn btn-sm btn-outline-secondary"
        >
          Close
        </button>

        <button
          onClick={() => {
            handleDeleteSite(destroySite.id);
          }}
          type="button"
          className="btn btn-sm btn-outline-danger"
          disabled={isProcessing}
        >
          {isProcessing && (
            <span className="text-center">
              <div
                className="spinner-border spinner-border-sm me-1"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </span>
          )}
          Supprimer <i className="bi bi-trash"></i>
        </button>
      </div>
    </>
  );
};

export default SiteDelete;
