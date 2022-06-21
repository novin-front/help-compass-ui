import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import AccessDenied from "../../../../assets/images/access_denied.svg";
export default function AccessDeniedPage() {
  let history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { userInof} =
    useSelector((state) => state.dashboard);
  if(userInof.profile_status === "not_completed"){
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
                    <img className="img-fluid" src={AccessDenied} alt="" />
                  </div>
                </div>
              </div>
              <div className="card-description">
                <h5 className="text-center my-5">
                  To use the site features, please complete your profile
                </h5>
                <div className="row justify-content-center">
                  <div className="col-10 col-md-4">
                    <Link
                      to="/dashboard/complete-profile"
                      className="btn btn-primary btn-lg btn-block"
                    >
                      <i className="typcn icon typcn-pencil px-1"></i>
                      Complete profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }else{
    return <></>
  }
}
