import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();
  let navigate = useNavigate();

  return (<>
  <h1>{id}</h1>
  </>);
}

export default Post;
