import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NotAccess from "../../../assets/images/no-access.svg";
import { useHistory } from "react-router-dom";
import {
  fetchAllLanguagesList,
  fetchAllStudyList,
  submitProgramRequestForm,
  updateAvailabilities,
  updateComment,
  updateLanguage,
  updateProgramTime,
  updateStudy,
} from "../../../services/actions/dashboard";

export default function StudentNewRequestForm() {
  const dispatch = useDispatch();
  let history = useHistory();
  const state = useSelector((state) => state);
  const {
    availabilities,
    language,
    programTime,
    comment,
    study,
    studyList,
    languagesList,
    updateRequestProgramResponse,
    userInof,
  } = useSelector((state) => state.dashboard);
  useEffect(async () => {
   if(languagesList.length === 0){
    await dispatch(fetchAllLanguagesList());
   }
   if(studyList.length === 0){
    await dispatch(fetchAllStudyList());
   }
  }, []);

  let classMessage = updateRequestProgramResponse.success
    ? "alert-success"
    : "alert-danger";
  const redirectPage = () => {
    if (updateRequestProgramResponse.show) {
      if (updateRequestProgramResponse.success) {
        setTimeout(() => {
          if (updateRequestProgramResponse.profileStatus === "completed") {
            if (updateRequestProgramResponse.activated === "not_active") {
              history.push("/dashboard/not-active");
            }
          }
        }, 3000);
      }
    }
  };
  const createLanguageList = () => {
    return languagesList.map((language) => {
      return <option value={language.id}>{language.lable}</option>;
    });
  };
  const createStudyList = () => {
    if(studyList.length === 0){
      return(
        <blockquote class="blockquote w-100">
            <h4 class="card-title">No Items</h4>        
        </blockquote>
      )
    }
    return studyList.map((studyItem) => {
      return (
        <div className="col-12 col-md-4 col-xl-3  form-check">
      <label className="form-check-label" htmlFor={"study-id-"+ studyItem.id}
       onClick={(e) => dispatch(updateStudy(studyItem.id.toString()))}
      >
        <input 
                type="radio" 
                className="form-check-input" 
                name="studySelect" 
                id={"study-id-"+ studyItem.id} 
                value={studyItem.id}/>
        {studyItem.lable}
      <i className="input-helper"></i></label>
    </div>
      )
    });
  };
  

  if(userInof.role.toUpperCase() === "STUDENT" && userInof.activated.toUpperCase() === "ACTIVATED"){
    return (
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add New Request</h4>
              <p className="card-description">program info</p>

              <div className="row">
                <div className="col-12 col-md-6 form-group">
                  <label for="exampleInputName1">Type of Training class</label>
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="individual">
                      <input
                        onChange={(e) =>
                          dispatch(updateAvailabilities("individual"))
                        }
                        type="radio"
                        className="form-check-input"
                        name="language"
                        id="individual"
                      />
                      Individual
                      <i className="input-helper"></i>
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="group">
                      <input
                        onChange={(e) => dispatch(updateAvailabilities("group"))}
                        type="radio"
                        className="form-check-input"
                        name="language"
                        id="group"
                      />
                      Group
                      <i className="input-helper"></i>
                    </label>
                  </div>
                  {availabilities.containErrors && (
                    <span className="msg text-danger">
                      Please check the input value
                    </span>
                  )}
                </div>
  
                <div className="col-12 col-md-6 form-group">
                  <label for="programTime">Availability Time</label>
                  <input
                    onChange={(e) => dispatch(updateProgramTime(e.target.value))}
                    type="text"
                    className="form-control"
                    id="programTime"
                    value={programTime.value}
                    placeholder="programTime"
                  />
  
                  {programTime.containErrors && (
                    <span className="msg text-danger">
                      Please check the input value
                    </span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-12 form-group">
                  <label for="language">study</label>
                  <div className="row">
                  {createStudyList()}
                  </div>
                  {study.containErrors && (
                    <span className="msg text-danger">
                      Please check the input value
                    </span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 form-group">
                  <label for="language">languages</label>
                  <select
                    className="form-control"
                    id="language"
                    value={language.value}
                    onChange={(e) => dispatch(updateLanguage(e.target.value))}
                  >
                    <option> select languages </option>
                    {createLanguageList()}
                  </select>
                  {language.containErrors && (
                    <span className="msg text-danger">
                      Please check the input value
                    </span>
                  )}
                </div>
  
                <div className="col-12 col-md-6 form-group">
                  <label for="exampleTextarea1">Comment</label>
                  <textarea
                    className="form-control"
                    id="exampleTextarea1"
                    rows="4"
                    value={comment.value}
                    onChange={(e) => dispatch(updateComment(e.target.value))}
                  ></textarea>
                  {comment.containErrors && (
                    <span className="msg text-danger">
                      Please check the input value
                    </span>
                  )}
                </div>
              </div>
  
              <div className="col-12 mt-3">
                {updateRequestProgramResponse.show && (
                  <div className={"alert " + classMessage}>
                    {updateRequestProgramResponse.message}
                    {updateRequestProgramResponse.success && redirectPage()}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary mr-2"
                disabled={updateRequestProgramResponse.success}
                onClick={e => dispatch(submitProgramRequestForm())}
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
