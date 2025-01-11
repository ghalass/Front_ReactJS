import React, { useState } from "react";
import { closeModal } from "../../utils/utils";
import { resetErrors } from "../../features/sites/SitesSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateSite } from "../../features/sites/sitesApi";
import { showAlert } from "../../utils/alert";

import * as yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
setLocale(fr);

const SiteEdit = ({ setEditSite, editSite }) => {
  const dispatch = useDispatch();
  const { isProcessing, error } = useSelector((state) => state.sites);

  const [formErrors, setFormErrors] = useState({
    name: null,
    description: null,
  });

  const schema = yup.object().shape({
    name: yup.string().required().min(3),
    description: yup.string().required().min(2),
  });

  const handleUpdateSite = async () => {
    try {
      // FRONT-END ==> Validate form data
      await schema.validate(editSite, { abortEarly: false });
      // console.warn("FRONT-END VALIDATION : Form data is valid!", newSite);
      setFormErrors({ name: "", description: "" }); // Clear errors

      // BACK-END
      dispatch(updateSite(editSite)).then((res) => {
        // CHECH IF NO ERROR FROM BACK-END
        if (res.meta.requestStatus === "fulfilled") {
          showAlert("success", "Modifié avec succès!");

          closeModal("staticBackdrop");
          dispatch(resetErrors());
          setFormErrors({
            name: "",
            description: "",
          });
        }
      });
      // console.log(crudStatus);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors = err.inner.reduce((acc, currentError) => {
          acc[currentError.path] = currentError.message;
          return acc;
        }, {});
        setFormErrors(newErrors);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditSite((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="modal-body">
        <div className="">
          <div className="form-floating mb-3 ">
            <input
              type="text"
              name="name"
              className={`form-control ${error?.errors?.name && "is-invalid"} ${
                formErrors?.name && "is-invalid"
              }`}
              id="name"
              placeholder="Site"
              value={editSite.name}
              onChange={handleChange}
            />
            <label htmlFor="name">Site</label>
            <small className="text-danger fst-italic">
              {formErrors?.name || error?.errors?.name}
            </small>
          </div>
          <div className="form-floating  mb-3 ">
            <input
              type="text"
              name="description"
              className={`form-control ${
                error?.errors?.description && "is-invalid"
              } ${formErrors?.description && "is-invalid"}`}
              id="description"
              placeholder="description"
              value={editSite.description}
              onChange={handleChange}
            />
            <label htmlFor="description">Description</label>
            <small className="text-danger fst-italic">
              {formErrors?.description || error?.errors?.description}
            </small>
          </div>
        </div>
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
          onClick={handleUpdateSite}
          type="button"
          className="btn btn-sm btn-outline-primary"
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
          Modifier
        </button>
      </div>
    </>
  );
};

export default SiteEdit;
