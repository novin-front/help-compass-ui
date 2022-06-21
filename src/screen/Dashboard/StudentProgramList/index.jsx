import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  fetchAllLanguagesList,
 fetchProgramListById,
} from "../../../services/actions/dashboard";
import NotAccess from "../../../assets/images/no-access.svg";
import UserItem from "./UserItem";

export default function StudentProgramList() {
  const dispatch = useDispatch();
  let history = useHistory();

  const state = useSelector((state) => state);
  const { requestProgramList ,userInof } = useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(fetchProgramListById());
    dispatch(fetchAllLanguagesList());
  }, [requestProgramList.length]);

  const renderUserItem = () => {
    if (requestProgramList.length === 0) {
      return (
        <td colSpan="8">
          <h4 className="text-center">No Items</h4>
        </td>
      );
    }
    return requestProgramList.map((item,index) => {
      return <UserItem key={index} requestData={item} />;
    });
  };
  console.log("requestProgramList =>", requestProgramList);
  console.log("requestProgramList =>", userInof.role ,userInof.activated );
  if(userInof.role === "student" && userInof.activated === "activated"){
    return (
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="table-responsive pt-3">
              <table class="table table-striped project-orders-table">
                <thead>
                  <tr>
                    <th class="ml-5">ID</th>
                    <th>Student ID</th>
                    <th>teacher name</th>
                    <th>Program Time </th>
                    <th>Availabilities</th>
                    <th>program comment</th>
                    <th>Request Status</th>
                    {/* <th>Actions</th> */}
                  </tr>
                </thead>
                <tbody>{renderUserItem()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }else{
    return <div className="row">
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
  }
}
