import React, { useState } from "react";
import { Button, Modal, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  submitProgramStatus,
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
    } else if (status == "accept") {
      return <div className="badge badge-success">Accept</div>;
    } else {
      return <div className="badge badge-danger">Reject</div>;
    }
  };

  const handleClose = () => {
    setshowModal(false);
  };
  const AcceptProgram = () => {
    dispatch(submitProgramStatus(props.requestData.id, "accept"));
    setshowModal(false);
  };
  const RejectProgram = () => {
    dispatch(submitProgramStatus(props.requestData.id, "reject"));
    setshowModal(false);
  };
  const renderModalBtn = () => {
    if (modalstatus == "accept") {
      return (
        <>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => AcceptProgram()}>
            Accept
          </Button>
        </>
      );
    } else if (modalstatus == "reject") {
      return (
        <>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => RejectProgram()}>
            Reject
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </>
      );
    }
  };
  const renderModalHeader = () => {
    return (
      <>
        {modalstatus !== "detail"  && <h4 className="card-title"> do you hav {modalstatus} this program?</h4>}
        <div className="row">
          <div className="col-12">
            <h5 className="card-title">Student ID : </h5>
            <blockquote className="blockquote">
              <p className="mb-0">{props.requestData.student_id}</p>
            </blockquote>
            <h5 className="card-title">Availabilities : </h5>
            <blockquote className="blockquote">
              <p className="mb-0">{props.requestData.availabilities}</p>
            </blockquote>
            <h5 className="card-title">Program Time : </h5>
            <blockquote className="blockquote">
              <p className="mb-0">{props.requestData.program_time}</p>
            </blockquote>
            <h5 className="card-title">program comment : </h5>
            <blockquote className="blockquote">
              <p className="mb-0">{props.requestData.comment}</p>
            </blockquote>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <tr>
        <td>{props.index}</td>
        <td>{props.requestData.student_id}</td>
        <td>
          {props.requestData.teacher_name
            ? props.requestData.teacher_name
            : "---"}
        </td>
        <td>{props.requestData.program_time}</td>
        <td>{props.requestData.availabilities}</td>
        <td>
          {" "}
          <p className="limeted-item-text">{props.requestData.comment}</p>
        </td>
        <td> {requestStatus(props.requestData.request_status)}</td>
        <td>
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-success btn-sm btn-icon-text mr-3"
              disabled={props.requestData.request_status !== "Unknown"}
              onClick={(e) => {
                setmodalstatus("accept");
                setshowModal(true);
              }}
            >
              Accept
              <i className="typcn typcn-thumbs-up btn-icon-append"></i>
            </button>
            <button
              className="btn btn-danger btn-sm btn-icon-text"
              disabled={props.requestData.request_status !== "Unknown"}
              onClick={(e) => {
                setmodalstatus("reject");
                setshowModal(true);
              }}
            >
              Reject
              <i className="typcn typcn-thumbs-down btn-icon-append"></i>
            </button>
            <button
              className="btn btn-danger btn-sm btn-icon-text mx-1"
              onClick={(e) => {
                setmodalstatus("detail");
                setshowModal(true);
              }}
            >
              <i className=" typcn icon typcn-document-text btn-icon-append"></i>
            </button>
          </div>
        </td>
      </tr>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Active user</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderModalHeader()}</Modal.Body>
        <Modal.Footer>{renderModalBtn()}</Modal.Footer>
      </Modal>
    </>
  );
}
