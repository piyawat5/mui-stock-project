import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducers } from "../reducers";

const ProtectedRoutes = (props: any) => {
  //method 1
  const authenReducer = useSelector(
    (state: RootReducers) => state.authenReducer
  );
  //method 2
  //   const auth = store.getState().authenReducer.res;
  //protect user direct to private route by without logging in
  return authenReducer.res ? <Outlet></Outlet> : <Navigate to="/login" />;
};
export default ProtectedRoutes;
