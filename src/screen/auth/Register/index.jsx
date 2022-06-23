import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  submitRegisterForm,
  updateEmail,
  updatePassword,
  updateReplacePassword,
  updateUserType,
} from "../../../services/actions/register";
export default function Register() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    email,
    password,
    replacePassword,
    userType,
    feaching,
    userIsRegister,
  } = useSelector((state) => state.register);
  let classMessage = userIsRegister.isRegister
    ? "alert-success"
    : "alert-danger";
  return (
    <div className="container-fluid page-body-wrapper full-page-wrapper bg-back">
      <div className="content-wrapper d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <h4>New here?</h4>
              <h6 className="font-weight-light">
                Signing up is easy. It only takes a few steps
              </h6>
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
              <div className="form-group row">
                <div className="col-sm-4">
                  <div className="form-check">
                    <label className="form-check-label ml-4">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="userType"
                        id="student"
                        onChange={(e) => dispatch(updateUserType("student"))}
                      />
                      Student
                      <i className="input-helper"></i>
                    </label>
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="form-check">
                    <label className="form-check-label ml-4">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="userType"
                        id="teacher"
                        onChange={(e) => dispatch(updateUserType("teacher"))}
                      />
                      Teacher
                      <i className="input-helper"></i>
                    </label>
                  </div>
                </div>
                <div className="col-12">
                {userType.containErrors && (
                  <span className="msg text-danger">
                    Please select a user type
                  </span>
                )}
                </div>
              </div>
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
                {userIsRegister.show && (
                  <div className={"alert " + classMessage}>
                    {userIsRegister.message}
                  </div>
                )}
              </div>
              <div className="mt-3">
                <button
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  onClick={(e) => dispatch(submitRegisterForm())}
                >
                  <span className="auth-form-btn-text">Register</span>
                  {feaching && <div className="lds-dual-ring"></div>}
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
