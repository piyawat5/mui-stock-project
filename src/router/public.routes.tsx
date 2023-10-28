import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { store } from "./../index";

const PublicRoutes = (props: any) => {
  const auth = store.getState().tokenReducer.res;
  // protect user direct to login by without logging out
  return auth ? <Navigate to="/stock"></Navigate> : <Outlet></Outlet>;
};

export default PublicRoutes;
