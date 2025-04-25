/*

  Created At : 24/04/2025 15:22:41
*/
import React, { FC, useEffect, useState } from "react";
import "./VideoFormModal.css";
import { Button, Modal } from "react-bootstrap";
import { Video } from "../../models/Video";
import { category } from "../../models/category";
import { title } from "process";
import { convertFileToLink } from "../../helpers/fileHelper";

interface VideoFormModalProps {
  hideModal: () => void;
}

const VideoFormModal: FC<VideoFormModalProps> = ({ hideModal }) => {
  const [posterPreviw, setPosterPreviw] = useState<string>("");
  const [videoPreviw, setVideoPreviw] = useState<string>("");
  const [formData, setFormData] = useState<Video>({
    title: "",
    description: "",
    poster: null,
    link: null,
    category: "",
    isAvailable: true,
  });
  const [formError, setFormError] = useState<Record<string, string>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {};
    runLocalData();
  });
  // ======= Recuperer les données saisie
  const handleInputChange = async (e: any) => {
    const { name, value, type, files, checked } = e.target;

    const newValue: any = formData;

    if (type === "checkbox") {
      newValue[name] = checked;
    } else if (type === "file") {
      const file = files[0];
      const link = await convertFileToLink(file);
      if (name === "poster") {
        if (!file.type.startsWith("image/")) {
          return;
        }
        setPosterPreviw(link);
      }
      if (name === "link") {
        if (!file.type.startsWith("video/")) {
          return;
        }
        setVideoPreviw(link);
      }
      newValue[name] = files[0];
    } else {
      newValue[name] = value;
    }

    const errors = formError;
    delete errors[name];
    setFormError({ ...errors });
    setFormData(newValue);
  };

  // ======= Gerer les erreur à la validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    if (!formData.poster) {
      errors.poster = "Poster file is required";
    }
    if (!formData.link) {
      errors.link = "Video file is required";
    }
    if (!formData.category.trim()) {
      errors.category = "Please select a category";
    }
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const video: Video = formData;
    video.creatdate_at = new Date();
    console.log(video);
  };

  return (
    <div className="VideoFormModal">
      <Modal show={true} size="lg" scrollable>
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
                defaultValue={formData.title.trim()}
                onChange={handleInputChange}
                type="text"
                name="title"
                // className="form-control"
                className={`form-control ${
                  formError.title ? "is-invalid" : ""
                }`}
                id="title"
              />
              {formError.title && (
                <div className="invalid-feedback">{formError.title} </div>
              )}
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
                className={`form-control ${
                  formError.description ? "is-invalid" : ""
                }`}
              ></textarea>
              {formError.description && (
                <div className="invalid-feedback">{formError.description} </div>
              )}
            </div>
            <div className="form-group pt-1">
              <label htmlFor="poster" className="form-label">
                Image (Poster) :
              </label>
              <input
                type="file"
                className={`form-control ${
                  formError.poster ? "is-invalid" : ""
                }`}
                name="poster"
                accept="image/*"
                id="poster"
                onChange={handleInputChange}
              />
              {posterPreviw && (
                <div className="preview-image card m-1">
                  <img
                    className="img-fluid"
                    src={posterPreviw}
                    width={"100%"}
                  />
                </div>
              )}

              {formError.poster && (
                <div className="invalid-feedback">{formError.poster} </div>
              )}
            </div>
            <div className="form-group pt-1">
              <label htmlFor="link" className="form-label">
                Video :
              </label>
              <input
                type="file"
                className={`form-control ${formError.link ? "is-invalid" : ""}`}
                name="link"
                accept="video/*"
                id="link"
                onChange={handleInputChange}
              />
              {videoPreviw && (
                <div className="video-preview card m-1 brodered">
                  <video
                    className="video-fluid "
                    src={videoPreviw}
                    width={"100%"}
                    controls
                  ></video>
                </div>
              )}
              {formError.link && (
                <div className="invalid-feedback">{formError.link} </div>
              )}
            </div>
            <div className="form-group pt-1">
              <label htmlFor="category" className="form-label">
                Category :
              </label>
              <select
                defaultValue={formData.category}
                onChange={handleInputChange}
                // className="form-select"
                className={`form-control ${
                  formError.category ? "is-invalid" : ""
                }`}
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
              {formError.category && (
                <div className="invalid-feedback">{formError.category} </div>
              )}
            </div>

            <div className="form-check form-switch pt-1">
              <input
                className="form-check-input"
                // className={`form-control form-check-input ${
                //   formError.isAvailable ? "is-invalid" : ""
                // }`}
                type="checkbox"
                role="switch"
                id="isAvailable"
                name="isAvailable"
                defaultChecked={formData.isAvailable}
                onChange={handleInputChange}
              />
              <label htmlFor="isAvailable">Is available :</label>
              {/* {formError.isAvailable && (
                <div className="invalid-feedback">{formError.isAvailable} </div>
              )} */}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger " onClick={hideModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save video
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VideoFormModal;
