import React from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  let params = useParams();

  return (
    <div>
      Details Page
      <p>name: {params.name}</p>
    </div>
  );
};

export default Details;
