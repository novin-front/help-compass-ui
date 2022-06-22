import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import CompleteProfile from "../../CompleteProfile";
import AccessDeniedPage from "../AccessDenied";
import NotActiveUser from "../NotActiveUser";
import UserListAdmin from "../../UserListAdmin";
import StudentNewRequestForm from "../../StudentNewRequestForm";
import Dashboard from "../../Dashboard";
import StudentProgramList from "../../StudentProgramList";
import TeacherLanguageRequest from "../../TeacherLanguageRequest";
import TeacherProgramList from "../../TeacherProgramList";
export default function Content() {
  let history = useHistory();
  // const { path, url } = useRouteMatch();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { userInof } = useSelector((state) => state.dashboard);
  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <Route exact path="/dashboard/index">
          <Dashboard />
        </Route>
        <Route exact path="/dashboard/access-denied">
          <AccessDeniedPage />
        </Route>
        <Route exact path="/dashboard/not-active">
          <NotActiveUser />
        </Route>
        <Route exact path="/dashboard/complete-profile">
          <CompleteProfile />
        </Route>
        <Route exact path="/dashboard/user-list">
          <UserListAdmin />
        </Route>
        <Route exact path="/dashboard/add-new-request">
          <StudentNewRequestForm />
        </Route>
        <Route exact path="/dashboard/student-program-request-list">
          <StudentProgramList />
        </Route>
        <Route exact path="/dashboard/teacher-language-request">
          <TeacherLanguageRequest />
        </Route>
        <Route exact path="/dashboard/teacher-program-request-list">
          <TeacherProgramList />
        </Route>
      </div>
      <footer className="footer">
        <div className="card">
          <div className="card-body">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Copyright © 2020 All rights reserved.
              </span>
              <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">
                dashboard university footer
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
