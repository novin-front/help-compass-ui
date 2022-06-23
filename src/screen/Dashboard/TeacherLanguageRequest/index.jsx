import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NotAccess from "../../../assets/images/no-access.svg";
import { useHistory } from "react-router-dom";
import {
  fetchAllLanguagesList,
  fetchTeacherLanguageRequest,
  submitLanguageRequestForm,
  updateLanguageList,
} from "../../../services/actions/dashboard";

export default function TeacherLanguageRequest() {
  const dispatch = useDispatch();
  let history = useHistory();
  const state = useSelector((state) => state);
  const {
    userInof,
    languagesList,
    updateResponselanguagesListForm,
    teacherLanguageRequest,
  } = useSelector((state) => state.dashboard);
  useEffect(() => {
    if(teacherLanguageRequest.languageListId == 0){
      dispatch(fetchTeacherLanguageRequest());
    }
    if(languagesList.length === 0){
      dispatch(fetchAllLanguagesList());
    }
  }, []);

  let classMessage = updateResponselanguagesListForm.success
    ? "alert-success"
    : "alert-danger";
  const redirectPage = () => {
    if (updateResponselanguagesListForm.show) {
      if (updateResponselanguagesListForm.success) {
        setTimeout(() => {
          if (updateResponselanguagesListForm.profileStatus === "completed") {
            if (updateResponselanguagesListForm.activated === "not_active") {
              history.push("/dashboard/not-active");
            }
          }
        }, 3000);
      }
    }
  };
  const createLanguageList = () => {
    if(languagesList.length){
      return languagesList.map((language, index) => {
        return (
          <div
            key={index}
            className="col-12 col-md-4 col-xl-3 form-check form-check-info"
          >
            <label htmlFor={"language" + language.id} className="form-check-label">
              <input
                onChange={(e) =>
                  dispatch(updateLanguageList(language.id.toString()))
                }
                name="language"
                id={"language" + language.id}
                type="checkbox"
                value={language.id.toString()}
                className="form-check-input"
                checked={teacherLanguageRequest.languageListId.includes(
                  language.id.toString()
                )}
              />
              {language.lable}
              <i className="input-helper"></i>
            </label>
          </div>
        );
      });
    }else{
      return(
        <div className="col-12">
              <blockquote className="blockquote">
                    <h5 className="card-title">
                      No Item
                    </h5>
              </blockquote>
        </div>
      )
    }
  };
  
  if(userInof.role.toUpperCase() === "TEACHER" && userInof.activated.toUpperCase() === "ACTIVATED" ){
  return (
    <div className="row">
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Add New Request</h4>
            <p className="card-description">program info</p>

            <div className="row">
              <div className="col-12 col-md-12 form-group">
                <label for="">Languages List</label>
                <div className="row">{createLanguageList()}</div>
                {teacherLanguageRequest.containErrors && (
                  <span className="msg text-danger">
                    Please check the teacher Language check value
                  </span>
                )}
              </div>
            </div>

            <div className="col-12 mt-3">
              {updateResponselanguagesListForm.show && (
                <div className={"alert " + classMessage}>
                  {updateResponselanguagesListForm.message}
                  {updateResponselanguagesListForm.success && redirectPage()}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary mr-2"
              disabled={updateResponselanguagesListForm.success}
              onClick={(e) => dispatch(submitLanguageRequestForm())}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  }else{
    return (
      <div className="row">
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h3 className="text-center">
            You do not have access to this list
            </h3>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-md-4">
              <div className="complet-profile-icon">
                <img className="img-fluid" src={NotAccess} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
  }
}
