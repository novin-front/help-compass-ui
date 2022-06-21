import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  submitChangePasswordForm,
  updatePassword,
  updateReplacePassword,
} from "../../../services/actions/forgotPassword";
export default function ChangePassword() {
  let history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { password, replacePassword, feachingChangePassword, userIsChangePassword } =
    useSelector((state) => state.forgotPassword);
  let classMessage = userIsChangePassword.success
    ? "alert-success"
    : "alert-danger";
  const redirectPage = () => {
    if (userIsChangePassword.show) {
      if (userIsChangePassword.success) {
        setTimeout(() => {
          history.push("/");
        }, 3000);
      }
    }
  };
  return (
    <div className="container-fluid page-body-wrapper full-page-wrapper bg-back">
      <div className="content-wrapper d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <h4>restore password</h4>
              {/* <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6> */}
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  placeholder="Password"
                  value={password.value}
                  onChange={(e) => dispatch(updatePassword(e.target.value))}
                />
                {password.containErrors && (
                  <span className="msg text-danger">
                    Please check the input value
                  </span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="replacePassword"
                  placeholder="Password"
                  value={replacePassword.value}
                  onChange={(e) =>
                    dispatch(updateReplacePassword(e.target.value))
                  }
                />
                {replacePassword.containErrors && (
                  <span className="msg text-danger">
                    Please check the input value
                  </span>
                )}
              </div>
              <div className="mt-3">
                {userIsChangePassword.show && (
                  <div className={"alert " + classMessage}>
                    {userIsChangePassword.message}
                  </div>
                )}
              </div>

              <div className="mt-3">
                <button
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  onClick={(e) => dispatch(submitChangePasswordForm())}
                >
                   {userIsChangePassword.success && redirectPage()}
                  <span className="auth-form-btn-text">Restore Password</span>
                 {feachingChangePassword && <div className="lds-dual-ring"></div> } 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
