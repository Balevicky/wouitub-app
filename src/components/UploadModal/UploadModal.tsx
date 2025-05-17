/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 16/05/2025 16:09:29
*/
import React, { FC, useEffect, useState } from "react";
import "./UploadModal.css";
import { Button, Modal } from "react-bootstrap";
import FileDrop from "../FileDrop/FileDrop";
import { convertFileToBlob, linkToBlob } from "../../helpers/fileHelper";
import { Video } from "../../models/Video";
import { addVideo } from "../../api/api-video";
import Loading from "../Loading/Loading";
import { emitNotification } from "../../helpers/notificationHelpers";
import { ADD } from "../../redux/type/actions";
import { useDispatch } from "react-redux";

interface UploadModalProps {
  hideModal: () => void;
  updateData: () => void;
}

const UploadModal: FC<UploadModalProps> = ({ hideModal, updateData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {};
    runLocalData();
  });
  // ============
  const handleFileDrop = async (files: File[]) => {
    setIsLoading(true);

    try {
      await Promise.all(
        files.map(async (file) => {
          const fileNameParts = file.name.split(".");
          const extension = fileNameParts.pop();
          const title = fileNameParts.join(" ");
          const videoBlob = await convertFileToBlob(file);
          const imageLink = window.origin + "/assets/images/5569190_7d1c.jpg";
          const posterBlob = await linkToBlob(imageLink);

          const video: Video = {
            title: title,
            description: title,
            link: videoBlob,
            poster: posterBlob,
            category: "Divers",
            isAvailable: false,
            creatdate_at: new Date(),
          };

          await addVideo(video);
        })
      );

      updateData();
      hideModal();
      // Add all video notification
      emitNotification(
        dispatch,
        "All video Added successfully !",
        ADD,
        "success"
      );
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors du traitement des fichiers :",
        error
      );
    }

    setIsLoading(false);
  };

  return (
    <div className="UploadModal">
      <Modal show={true} scrollable size="lg" centered>
        <Modal.Header>
          <Modal.Title className="titleColor">
            <h2>Upload Video</h2>
          </Modal.Title>
          <button onClick={hideModal} className="btn-close"></button>
        </Modal.Header>
        <Modal.Body>
          <div className="upload-zone">
            {isLoading ? <Loading /> : <FileDrop onFileDrop={handleFileDrop} />}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={hideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadModal;
