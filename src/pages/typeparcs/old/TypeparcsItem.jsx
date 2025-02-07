import moment from "moment";
import React from "react";

import { openModal } from "../../utils/utils";
import { resetErrors } from "../../features/sites/SitesSlice";
import { useDispatch } from "react-redux";

const TypeparcsItem = ({ site, setEditSite, setDestroySite, setOperation }) => {
  const dispatch = useDispatch();
  return (
    <>
      <tr>
        <td>{site.name}</td>
        <td>{site.description}</td>
        <td>{moment(site.created_at).format("DD-MM-YYYY")}</td>
        <td>{moment(site.updated_at).format("DD-MM-YYYY")}</td>
        <td>
          <div className="d-flex gap-3 float-end mx-2">
            <i
              onClick={() => {
                setDestroySite(site);
                setOperation("delete");
                openModal("staticBackdrop");
              }}
              role="button"
              className="bi bi-trash text text-sm text-danger pointer-events"
            ></i>
            <i
              onClick={() => {
                setEditSite(site);
                dispatch(resetErrors());
                setOperation("edit");
                openModal("staticBackdrop");
              }}
              role="button"
              className="bi bi-pencil text text-sm text-info pointer-events"
            ></i>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TypeparcsItem;
