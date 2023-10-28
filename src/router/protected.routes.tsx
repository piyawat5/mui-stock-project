import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducers } from "../reducers";

const ProtectedRoutes = (props: any) => {
  //method 1
  const tokenReducer = useSelector((state: RootReducers) => state.tokenReducer);
  //method 2
  //   const auth = store.getState().tokenReducer.res;
  //protect user direct to private route by without logging in
  return tokenReducer.res ? <Outlet></Outlet> : <Navigate to="/login" />;
};
export default ProtectedRoutes;
