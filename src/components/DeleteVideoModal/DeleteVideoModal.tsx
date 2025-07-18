/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 01/05/2025 10:53:37
*/
import React, { FC, useEffect } from "react";
import "./DeleteVideoModal.css";
import { Button, Modal } from "react-bootstrap";
import { deleteVideo } from "../../api/api-video";
import { Video } from "../../models/Video";
import { emitNotification } from "../../helpers/notificationHelpers";
import { useDispatch } from "react-redux";
import { ADD } from "../../redux/type/actions";

interface DeleteVideoModalProps {
  hideModal: () => void;
  updateData: () => void;
  currentVideo: Video;
  // videoId: number;
}

const DeleteVideoModal: FC<DeleteVideoModalProps> = ({
  currentVideo,
  updateData,
  hideModal,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {};
    runLocalData();
  });

  const handleDelete = async () => {
    await deleteVideo(currentVideo._id!);
    updateData();
    hideModal();
    // Add video
    emitNotification(dispatch, "Video deleted successfully !", ADD, "success");
  };

  return (
    <div className="DeleteVideoModal">
      <Modal show={true} scrollable centered>
        <Modal.Header>
          <Modal.Title>
            <h2>Delete Confirm</h2>
          </Modal.Title>
          <button onClick={hideModal} className="btn-close"></button>
        </Modal.Header>

        <Modal.Body>
          <p>
            Are you sure you want to delete this video :
            <strong>{currentVideo.title}</strong>?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleDelete}>
            Comfirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteVideoModal;
