import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import dashboard from "../../../assets/images/dashboard.svg";
export default function Dashboard() {
  let history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { userInof} =
    useSelector((state) => state.dashboard);
    return (
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h3 className="text-center">
                  Welcome to Your Help Compass Center Dashboard !
                </h3>
              </div>
              <div className="row justify-content-center">
                <div className="col-12 col-md-4">
                  <div className="complet-profile-icon">
                    <img className="img-fluid" src={dashboard} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
