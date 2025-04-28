/*
   Created At : 24/04/2025 09:20:31
*/
import React, { FC, useEffect, useState } from "react";
import "./Container.css";
import { title } from "process";
import VideoFormModal from "../VideoFormModal/VideoFormModal";
import { Video } from "../../models/Video";
import { getAllVideo } from "../../api/api-video";
import { convertBlobToUrl } from "../../helpers/fileHelper";

interface ContainerProps {}

const Container: FC<ContainerProps> = () => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [videos, setVideos] = useState<Video[]>([]);

  const runLocalData = async () => {
    const data: any = await getAllVideo();
    console.log(data);

    if (data.isSucces) {
      data.results.map((video: Video) => {
        console.log(video);

        video.poster = convertBlobToUrl(video.poster as Blob);
        video.link = convertBlobToUrl(video.link as Blob);
        return video;
      });
      setVideos(data.results);
      // console.log(videos);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    runLocalData();
  }, [videos]);

  return (
    <div className="container py-2">
      <button
        className="btn btn-primary "
        onClick={() => setDisplayModal(true)}
      >
        Add vidéo
      </button>
      {displayModal && (
        <VideoFormModal hideModal={() => setDisplayModal(false)} />
      )}
      <div className="video-list py-2">
        <table className="table table-bordered border-primary ">
          <thead>
            <tr>
              <th scope="col">N°</th>
              <th scope="col">Title</th>
              <th scope="col">Poster</th>
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
                      src={video.poster as string}
                      alt={video.title}
                      width={80}
                      height={80}
                    />
                  </td>
                  <td>
                    <button className="btn btn-success m-1">View</button>
                    <button className="btn btn-primary m-1">Edit</button>
                    <button className="btn btn-danger m-1">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Container;
