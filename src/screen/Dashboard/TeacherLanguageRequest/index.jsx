import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
    languagesList,
    updateResponselanguagesListForm,
    teacherLanguageRequest,
  } = useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(fetchTeacherLanguageRequest());
    dispatch(fetchAllLanguagesList());
  }, [languagesList.length]);

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
    console.log("teacherLanguageRequest =>", teacherLanguageRequest);
    return languagesList.map((language, index) => {
      // return <option value={language.id}>{language.lable}</option>;
      return (
        <div
          key={index}
          class="col-12 col-md-4 col-xl-3 form-check form-check-info"
        >
          <label htmlFor={"language" + language.id} class="form-check-label">
            <input
              onChange={(e) =>
                dispatch(updateLanguageList(language.id.toString()))
              }
              name="language"
              id={"language" + language.id}
              type="checkbox"
              value={language.id.toString()}
              class="form-check-input"
              checked={teacherLanguageRequest.languageListId.includes(
                language.id.toString()
              )}
            />
            {language.lable}
            <i class="input-helper"></i>
          </label>
        </div>
      );
    });
  };
  return (
    <div className="row">
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Add New Request</h4>
            <p className="card-description">program info</p>

            <div className="row">
              <div class="col-12 col-md-12 form-group">
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
}
