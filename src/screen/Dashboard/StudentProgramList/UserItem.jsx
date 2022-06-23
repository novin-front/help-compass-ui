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
  const requestStatus = (status) => {
    if (status == "Unknown") {
      return <div className="badge badge-info">Unknown</div>;
    } else if(status == "accept") {
      return <div className="badge badge-success">Accept</div>;
    }else {
      return <div className="badge badge-danger">Reject</div>;
    }
  };

  const handleClose = () => {
    setshowModal(false);
  };
  const ActivateUser  = () => {
    dispatch(submitActiveUserByID(props.requestData.id, props.requestData.email));
    setshowModal(false);
  };
  const delteUusrById = () => {
    dispatch(submitDeleteUserByID(props.requestData.id, props.requestData.email));
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
        do you hav active this user "{props.requestData.email}"?
       </>
      )
    }
    return (
      <>
       do you hav delete this user "{props.requestData.email}"?
      </>
     )
  }
  return (
    <>
      <tr>
        <td>{props.index}</td>
        <td>{props.requestData.student_id}</td>
        <td>{props.requestData.teacher_name ? props.requestData.teacher_name : '---'}</td>
        <td>{props.requestData.program_time}</td>
        <td>{props.requestData.availabilities}</td>
        <td> <p className="limeted-item-text">{props.requestData.comment}</p></td>
        <td> {requestStatus(props.requestData.request_status)}</td>
        {/* <td>
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-success btn-sm btn-icon-text mr-3"
              disabled={props.requestData.is_active === "activated"}
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
        </td> */}
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
