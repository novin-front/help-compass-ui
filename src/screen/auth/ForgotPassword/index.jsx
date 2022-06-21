import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  submitForgotPasswordForm,
  updateEmail,
} from "../../../services/actions/forgotPassword";
export default function ForgotPassword() {
  let history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { email, feaching, userIsForgotPassword } = useSelector(
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
    <div className="container-fluid page-body-wrapper full-page-wrapper bg-back">
      <div className="content-wrapper d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <h4>Forgot Password</h4>
              {/* <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6> */}
              <div className="form-group">
                <input
                  value={email.value}
                  onChange={(e) => dispatch(updateEmail(e.target.value))}
                  type="text"
                  className="form-control form-control-lg"
                  id="email"
                  placeholder="email"
                />
                {email.containErrors && (
                  <span className="msg text-danger">
                    Please check the input value
                  </span>
                )}
              </div>
              <div className="mt-3">
                {userIsForgotPassword.show && (
                  <div className={"alert " + classMessage}>
                    {userIsForgotPassword.message}
                  </div>
                )}
              </div>

              <div className="mt-3">
                <button
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  onClick={(e) => dispatch(submitForgotPasswordForm())}
                >
                   {userIsForgotPassword.success && redirectPage()}
                  <span className="auth-form-btn-text">Forgot Password</span>
                 {feaching && <div className="lds-dual-ring"></div> } 
                </button>
              </div>
              <div className="text-center mt-4 font-weight-light">
                Already have an account?{" "}
                <Link to="/" className="text-primary">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
