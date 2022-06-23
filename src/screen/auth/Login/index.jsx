import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { submitLoginForm, updateEmail, updatePassword } from '../../../services/actions/login';
export default function Login() {
    let history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const {
        email,
        password,
        feaching,
        userIsLogin,
    } = useSelector((state) => state.login);
    let classMessage = (userIsLogin.isLogin) ? "alert-success" : "alert-danger";
    const redirectPage = () => {
        if (userIsLogin.show) {
            if (userIsLogin.isLogin) {
              setTimeout(()=>{
                if(userIsLogin.role == "admin"){
                  history.push("/dashboard/user-list");
                }else{
                  if(userIsLogin.profileStatus !== "completed"){
                    history.push("/dashboard/access-denied");
                  }else if(userIsLogin.profileStatus === "completed"){
                    if(userIsLogin.activated === "not_active"){
                      history.push("/dashboard/not-active");
                    }else{
                      history.push("/dashboard/index");
                    }
                } 
                }
              },2000)
            }
        }
    }
    return (
    <div className="container-fluid page-body-wrapper full-page-wrapper bg-back">
      <div className="content-wrapper d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0 ">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
                <div className="form-group">
                  <input 
                      value={email.value}
                      onChange={(e) => dispatch(updateEmail(e.target.value))}
                      type="text" 
                      className="form-control form-control-lg" 
                      id="email" 
                      placeholder="email"/>
                      {email.containErrors && (
                              <span className="msg text-danger">
                                 Please check the input value
                              </span>
                      )}
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
                <div className="mt-3">
                  {userIsLogin.show && (
                    <div className={"alert " + classMessage}>
                      {userIsLogin.message}
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                          onClick={e => dispatch(submitLoginForm())}>
                            {userIsLogin.isLogin && redirectPage()}
                            <span className="auth-form-btn-text">SIGN IN</span>
                            {feaching && <div className="lds-dual-ring"></div> } 
                  </button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      Keep me signed in
                    </label>
                  </div>
                  <Link to="/forgot-password" className="auth-link text-black">Forgot password?</Link>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Don't have an account? <Link to="/register" className="text-primary">Register</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
