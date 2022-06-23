import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  submitUpdateProfileForm,
  updateFirstName,
  updateLastName,
  updateUniversityId,
  updateUserGender,
} from "../../../services/actions/dashboard";

export default function CompleteProfile() {
  const dispatch = useDispatch();
  let history = useHistory();
  const state = useSelector((state) => state);
  const { firstName, lastName, gender, universityId, userUpdateProfile } =
    useSelector((state) => state.dashboard);
  let classMessage = userUpdateProfile.success
    ? "alert-success"
    : "alert-danger";
  const redirectPage = () => {
    if (userUpdateProfile.show) {
      if (userUpdateProfile.success) {
        setTimeout(() => {
          if (userUpdateProfile.profileStatus === "completed") {
            if (userUpdateProfile.activated === "not_active") {
              history.push("/dashboard/not-active");
            }
          }
        }, 3000);
      }
    }
  };
  return (
    <div className="row">
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Complete Profile</h4>
            <p className="card-description">Personal info</p>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">First Name</label>
                  <div className="col-sm-8">
                    <input
                      value={firstName.value}
                      onChange={(e) =>
                        dispatch(updateFirstName(e.target.value))
                      }
                      type="text"
                      className="form-control form-control-lg"
                      id="first Name"
                      placeholder="first Name"
                    />
                    {firstName.containErrors && (
                      <span className="msg text-danger">
                        Please check the input value
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Last Name</label>
                  <div className="col-sm-8">
                    <input
                      value={lastName.value}
                      onChange={(e) => dispatch(updateLastName(e.target.value))}
                      type="text"
                      className="form-control form-control-lg"
                      id="lastName"
                      placeholder="last Name"
                    />
                    {firstName.containErrors && (
                      <span className="msg text-danger">
                        Please check the input value
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    student | teacher Id :
                  </label>
                  <div className="col-sm-8">
                    <input
                      value={universityId.value}
                      onChange={(e) =>
                        dispatch(updateUniversityId(e.target.value))
                      }
                      type="text"
                      className="form-control form-control-lg"
                      id="universityId"
                      placeholder="university Id"
                    />
                    {universityId.containErrors && (
                      <span className="msg text-danger">
                        Please check the input value
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Gender</label>
                  <div className="col-sm-8">
                    <select
                      className="form-control"
                      value={gender.value}
                      onChange={(e) =>
                        dispatch(updateUserGender(e.target.value))
                      }
                    >
                      <option>select gender</option>
                      <option value="male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-3">
                {userUpdateProfile.show && (
                  <div className={"alert " + classMessage}>
                    {userUpdateProfile.message}
                    {userUpdateProfile.success && redirectPage()}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary mr-2"
                disabled={userUpdateProfile.success}
                onClick={(e) => dispatch(submitUpdateProfileForm())}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
