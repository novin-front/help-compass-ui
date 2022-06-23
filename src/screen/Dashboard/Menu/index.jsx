import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { submitLoguot } from "../../../services/actions/dashboard";
import { isEmpty } from "../../../services/function";
import logoImage from "../../../assets/images/logo.png"
export default function Menu() {
  let history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { firstName, lastName } = useSelector((state) => state.dashboard);
  const renderUserFullName = () => {
    let fullName = "";
    if (!isEmpty(firstName.value)) {
      fullName = firstName.value;
    }
    if (!isEmpty(lastName.value)) {
      fullName += " " + lastName.value;
    }
    return fullName;
  };
  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex justify-content-center">
        <div className="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
          <a className="navbar-brand brand-logo" href="../../index.html">
            <img src={logoImage} alt="logo" />
          </a>
          <a className="navbar-brand brand-logo-mini" href="../../index.html">
            <img src={logoImage} alt="logo" />
          </a>
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
          >
            <span className="typcn typcn-th-menu"></span>
          </button>
        </div>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <ul className="navbar-nav mr-lg-2">
          <li className="nav-item nav-profile">
            <a className="nav-link" href=" " id="profileDropdown">
              {/* <img src="../../images/faces/face5.jpg" alt="profile"/> */}
              welcome
              <span className="nav-profile-name">{renderUserFullName()}</span>
            </a>
          </li>
          {/* <li className="nav-item nav-user-status dropdown">
            <p className="mb-0">Last login was 23 hours ago.</p>
          </li> */}
        </ul>
        <ul className="navbar-nav navbar-nav-right">
          {/* <li className="nav-item nav-date dropdown">
            <a
              className="nav-link d-flex justify-content-center align-items-center"
              href=" "
            >
              <h6 className="date mb-0">Today : Mar 23</h6>
              <i className="typcn typcn-calendar"></i>
            </a>
          </li> */}
          <li className="nav-item dropdown">
            <NavDropdown id="nav-dropdown-dark-example" title={"setting"}>
              <NavDropdown.Item href="/dashboard/complete-profile">
                profile
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.2"
                onClick={(e) => dispatch(submitLoguot())}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="typcn typcn-th-menu"></span>
        </button>
      </div>
    </nav>
  );
}
