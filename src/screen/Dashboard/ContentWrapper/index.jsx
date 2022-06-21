import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Content from "./Content";
import Sidebar from "./Sidebar"
export default function ContentWrapper() {
  let history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {  userIsForgotPassword } = useSelector(
    (state) => state.forgotPassword
  );
  let classMessage = userIsForgotPassword.success
    ? "alert-success"
    : "alert-danger";
  const redirectPage = () => {
    if (userIsForgotPassword.show) {
      if (userIsForgotPassword.success) {
        setTimeout(() => {
          history.push("/change-password");
        }, 2000);
      }
    }
  };
  return (
    <div className="container-fluid page-body-wrapper">
      <Sidebar/>
      <Content/>
    </div>
  );
}
