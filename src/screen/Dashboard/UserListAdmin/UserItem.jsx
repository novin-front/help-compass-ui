import React, { useState } from "react";
import { Button, Modal, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  feachAllUsersList,
  submitActiveUserByID,
  submitDeleteUserByID,
  submitLoguot,
  submitUpdateProfileForm,
  updateFirstName,
  updateLastName,
  updateUniversityId,
  updateUserGender,
} from "../../../services/actions/dashboard";
import { isEmpty } from "../../../services/function";

export default function UserItem(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const state = useSelector((state) => state);
  const [showModal, setshowModal] = useState(false);
  const [modalstatus, setmodalstatus] = useState("");
  const {} = useSelector((state) => state.dashboard);
  const renderFullName = (firstName, lastName) => {
    if (isEmpty(firstName) || isEmpty(lastName)) {
      return "---";
    }
    return firstName + " " + lastName;
  };
  const IsActive = (status) => {
    if (status == "not_active") {
      return <div className="badge badge-danger">No Active</div>;
    } else {
      return <div className="badge badge-success">Active</div>;
    }
  };

  const IsComplet = (status) => {
    if (status == "not_completed") {
      return <div className="badge badge-danger">No Complet</div>;
    } else {
      return <div className="badge badge-success">Completed</div>;
    }
  };

  const handleClose = () => {
    setshowModal(false);
  };
  const ActivateUser  = () => {
    dispatch(submitActiveUserByID(props.userData.id, props.userData.email));
    setshowModal(false);
  };
  const delteUusrById = () => {
    dispatch(submitDeleteUserByID(props.userData.id, props.userData.email));
    setshowModal(false);
  };
  const renderModalBtn = () => {
    if (modalstatus == "active") {
      return (
        <>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => ActivateUser()}>
            active
          </Button>
        </>
      );
    }
    return (
      <>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={(e) => delteUusrById()}>
          delete
        </Button>
      </>
    );
  };
  const renderModalHeader = ()=>{
    if (modalstatus == "active") {
      return (
       <>
        do you hav active this user "{props.userData.email}"?
       </>
      )
    }
    return (
      <>
       do you hav delete this user "{props.userData.email}"?
      </>
     )
  }
  return (
    <>
      <tr>
        <td>{props.index}</td>
        <td>
          {renderFullName(props.userData.first_name, props.userData.last_name)}
        </td>
        <td>{props.userData.email}</td>
        <td>{props.userData.role}</td>
        <td>{props.userData.university_id}</td>
        <td> {IsComplet(props.userData.profile_status)}</td>
        <td>{IsActive(props.userData.is_active)}</td>
        <td>
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-success btn-sm btn-icon-text mr-3"
              disabled={props.userData.is_active === "activated"}
              onClick={(e) => {
                setmodalstatus("active");
                setshowModal(true);
              }}
            >
              active
              <i className="typcn typcn-edit btn-icon-append"></i>
            </button>
            <button
              className="btn btn-danger btn-sm btn-icon-text"
              onClick={(e) => {
                setmodalstatus("delete");
                setshowModal(true);
              }}
            >
              Delete 
              <i className="typcn typcn-delete-outline btn-icon-append"></i>
            </button>
          </div>
        </td>
      </tr>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Active user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {renderModalHeader()}
        </Modal.Body>
        <Modal.Footer>{renderModalBtn()}</Modal.Footer>
      </Modal>
    </>
  );
}
