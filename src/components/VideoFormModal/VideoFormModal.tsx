/*

  Created At : 24/04/2025 15:22:41
*/
import React, { FC, useEffect, useState } from "react";
import "./VideoFormModal.css";
import { Button, Modal } from "react-bootstrap";
import { Video } from "../../models/Video";
import { category } from "../../models/category";
import { log } from "console";

interface VideoFormModalProps {
  hideModal: () => void;
}

const VideoFormModal: FC<VideoFormModalProps> = ({ hideModal }) => {
  const [formData, setFormData] = useState<Video>({
    title: "",
    description: "",
    poster: null,
    link: null,
    category: "",
    isAvailabble: true,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {};
    runLocalData();
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, file, checked } = e.target;

    console.log(name, value, type, file, checked);
  };

  return (
    <div className="VideoFormModal">
      <Modal show={true} size="lg">
        <Modal.Header>
          <Modal.Title> Video form</Modal.Title>
          <button className="btn-close" onClick={hideModal}></button>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div className="form-group pt-1">
              <label htmlFor="title" className="form-label">
                Title :
              </label>
              <input
                defaultValue={formData.title}
                onChange={handleInputChange}
                type="text"
                className="form-control"
                name="title"
                id="title"
              />
            </div>
            <div className="form-group pt-1">
              <label
                htmlFor="description"
                // id="description"
                className="form-label"
              >
                Description :
              </label>
              <textarea
                defaultValue={formData.description}
                onChange={handleInputChange}
                name="description"
                id="description"
                className="form-control"
              ></textarea>
            </div>
            <div className="form-group pt-1">
              <label htmlFor="poster" className="form-label">
                Image (Poster) :
              </label>
              <input
                type="file"
                className="form-control"
                name="poster"
                id="poster"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group pt-1">
              <label htmlFor="link" className="form-label">
                Video :
              </label>
              <input
                type="file"
                className="form-control"
                name="link"
                id="link"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group pt-1">
              <label htmlFor="category" className="form-label">
                Category :
              </label>
              <select
                defaultValue={formData.category}
                onChange={handleInputChange}
                className="form-select"
                id="category"
                name="category"
              >
                <option value="">Select video gategory</option>
                <option value="Politique">Politique</option>
                <option value="Education">Education</option>
                <option value="Culture">Culture</option>
                <option value="Formation">Formation</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Santé">Santé</option>
              </select>
            </div>

            <div className="form-check form-switch pt-1">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="isAvailable"
                defaultChecked={formData.isAvailabble}
                onChange={handleInputChange}
              />
              <label htmlFor="isAvailable" className="form-check-label ">
                <a href="http://" target="_blank" rel="noopener noreferrer"></a>
                vailable :
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger " onClick={hideModal}>
            Close
          </Button>
          <Button variant="primary">Save video</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VideoFormModal;
