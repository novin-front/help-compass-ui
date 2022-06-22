import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Sidebar() {
  let history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { userInof } = useSelector((state) => state.dashboard);
  const renderSidebarItemMenu = () => {
    let menuItem = [
      {
        key: "admin",
        component: (
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard/user-list">
              <i className="typcn icon typcn-th-menu-outline menu-icon"></i>
              <span className="menu-title">User List</span>
            </Link>
          </li>
        ),
      },
      {
        key: "student",
        component: (
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard/add-new-request">
              <i className="typcn icon typcn-pencil menu-icon"></i>
              <span className="menu-title">Add New Program</span>
            </Link>
          </li>
        ),
      },
      {
        key: "student",
        component: (
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/dashboard/student-program-request-list"
            >
              <i className="typcn icon typcn-th-menu-outline menu-icon"></i>
              <span className="menu-title">Program Request List</span>
            </Link>
          </li>
        ),
      },
      {
        key: "teacher",
        component: (
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard/teacher-language-request">
              <i className="typcn icon typcn-edit active-before menu-icon"></i>
              <span className="menu-title">Teacher Languages</span>
            </Link>
          </li>
        ),
      },
      {
        key: "teacher",
        component: (
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/dashboard/teacher-program-request-list"
            >
              <i className="typcn icon typcn-th-menu-outline menu-icon"></i>
              <span className="menu-title">Program Request List</span>
            </Link>
          </li>
        ),
      },
    ];

    return menuItem.map((item) => {
      if (item.key === userInof.role) {
        return item.component;
      }
    });
  };
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard/index">
            <i className="typcn typcn-device-desktop menu-icon"></i>
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>
        {renderSidebarItemMenu()}
      </ul>
    </nav>
  );
}
