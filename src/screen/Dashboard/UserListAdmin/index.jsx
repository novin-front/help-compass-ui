import React, { useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  feachAllUsersList,
} from "../../../services/actions/dashboard";
import { isEmpty } from "../../../services/function";
import UserItem from "./UserItem";
import NotAccess from "../../../assets/images/no-access.svg";
export default function UserListAdmin() {
  const dispatch = useDispatch();
  let history = useHistory();

  const state = useSelector((state) => state);
  const { users,userInof } = useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(feachAllUsersList());
  }, [users.length]);

  const renderUserItem = () => {
    if (users.length === 0) {
      return (
        <td colSpan="8">
          <h4 className="text-center">No Items</h4>
        </td>
      );
    }
    return users.map((item,index) => {
      index = ++index;
      return <UserItem userData={item} index={index} />;
    });
  };
  if(userInof.role.toUpperCase() === "ADMIN"){
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="table-responsive pt-3">
              <table className="table table-striped project-orders-table">
                <thead>
                  <tr>
                    <th className="ml-5">ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>User Type</th>
                    <th>User Id </th>
                    <th>Profile Status</th>
                    <th>Active</th>
                    <th>Actions</th>
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
