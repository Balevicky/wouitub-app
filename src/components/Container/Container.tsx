/*
   Created At : 24/04/2025 09:20:31
*/
import React, { FC, useEffect, useState } from "react";
import "./Container.css";
import { title } from "process";
import VideoFormModal from "../VideoFormModal/VideoFormModal";

interface ContainerProps {}

const Container: FC<ContainerProps> = () => {
  // {
  //   title,
  //     descrption,
  //     poster,
  //     link,
  //     author,
  //     isavailable,
  //     createdate_at,
  //     update_at,
  // }
  const [displayModal, setDisplayModal] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {};
    runLocalData();
  });

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
            <tr>
              <th scope="row">1</th>
              <td>Formation react</td>
              <td>
                <img src="assets/images/5569190_7d1c.jpg" alt="" width={80} />
              </td>
              <td>
                <button className="btn btn-success m-1">View</button>
                <button className="btn btn-primary m-1">Edit</button>
                <button className="btn btn-danger m-1">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Container;
