/*
   Created At : 24/04/2025 09:20:31
*/
import React, { FC, useEffect, useState } from "react";
import "./Container.css";
// import { title } from "process";
import VideoFormModal from "../VideoFormModal/VideoFormModal";
import { Video } from '../../models/Video';
import { getAllVideo } from "../../api/api-video";
import { convertBlobToUrl } from "../../helpers/fileHelper";
import ViewVideoModal from "../ViewVideoModal/ViewVideoModal";
import DeleteVideoModal from "../DeleteVideoModal/DeleteVideoModal";
import UploadModal from "../UploadModal/UploadModal";

// import { NumberLiteralType } from "typescript";

interface ContainerProps {}

const Container: FC<ContainerProps> = () => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [uploadModal, setUploadModal] = useState<boolean>(false);
  const [currentVideo, setCurrentVideol] = useState<Video | undefined>();
  const [videos, setVideos] = useState<Video[]>([]);

  const runLocalData = async () => {
    const data: any = await getAllVideo();
    // console.log(data);

    if (data.isSuccess) {
      data.results.map((video: Video) => {
        video.posterLink = video.posterLink = convertBlobToUrl(
          video.poster as Blob
        );
        video.videolLink = convertBlobToUrl(video.link as Blob);
        // video.poster = convertBlobToUrl(video.poster as Blob);
        // video.link = convertBlobToUrl(video.link as Blob);
        return video;
      });
      setVideos(data.results);
      // console.log(videos);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    runLocalData();
  }, []);

  const handleView = (video: Video) => {
    setCurrentVideol(video);
    setViewModal(true);
  };
  // const handleEdit = (id: number) => {
  const handleEdit = (video: Video) => {
    setCurrentVideol(video);
    setDisplayModal(true);
  };
  const handleAdd = () => {
    setCurrentVideol(undefined);
    setDisplayModal(true);
  };
  const handleUpload = () => {
    setCurrentVideol(undefined);
    setUploadModal(true);
  };
  const handleDelete = (video: Video) => {
    setCurrentVideol(video);
    setDeleteModal(true);
  };

  return (
    <div className="container py-2">
      <div className="d-flex gap-2 justify-content-between">
        <button className="btn btn-primary " onClick={() => handleAdd()}>
          Add vidéo
        </button>
        <button className="btn btn-danger " onClick={() => handleUpload()}>
          Add Many
        </button>
      </div>
      <br />
      {displayModal && (
        <VideoFormModal
          currentVideo={currentVideo}
          hideModal={() => setDisplayModal(false)}
          updateData={runLocalData}
        />
      )}
      {uploadModal && (
        <UploadModal
          hideModal={() => setUploadModal(false)}
          updateData={runLocalData}
        />
      )}
      {viewModal && currentVideo && (
        <ViewVideoModal
          hideModal={() => setViewModal(false)}
          videoId={currentVideo._id!}
        />
      )}
      {deleteModal && currentVideo && (
        <DeleteVideoModal
          hideModal={() => setDeleteModal(false)}
          currentVideo={currentVideo}
          updateData={runLocalData}
        />
      )}
      {videos.length == 0 ? (
        <h2>
          <strong>Aucune video en ligne </strong>
        </h2>
      ) : (
        <div className="video-list py-2">
          <table className="table table-bordered border-primary ">
            <thead>
              <tr>
                <th scope="col">N°</th>
                <th scope="col">Title</th>
                <th scope="col">Poster</th>
                <th scope="col">Categoty</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video, index) => {
                return (
                  <tr key={video._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{video.title}</td>
                    <td>
                      <img
                        src={video.posterLink as string}
                        alt={video.title}
                        width={80}
                        height={80}
                      />
                    </td>
                    <td>{video.category}</td>
                    <td>
                      <button
                        className="btn btn-success m-1"
                        onClick={() => handleView(video)}
                      >
                        View
                      </button>

                      <button
                        className="btn btn-primary m-1"
                        onClick={() => handleEdit(video)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger m-1"
                        onClick={() => handleDelete(video)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Container;
