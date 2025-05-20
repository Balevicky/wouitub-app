/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 13/05/2025 15:22:39
*/
import React, { FC, useEffect, Fragment, useState } from "react";
// import Loading from '../Loading/Loading';
import "./PlayListItem.css";
import { Video } from "../../models/Video";
import Loading from "../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";

interface PlayListItemProps {
  video: Video;
  currentVideoId: number;
  // currentVideoSlug: string;
}

const PlayListItem: FC<PlayListItemProps> = ({ video, currentVideoId }) => {
  const navigate = useNavigate();
  const createdAt = moment(video?.creatdate_at);

  const handleClick = (event: any) => {
    event.preventDefault();

    const currentSearchParams = new URLSearchParams(window.location.search);

    navigate("/reader/" + video.slug + "?" + currentSearchParams.toString());
  };

  return (
    <div
      className={
        "PlayListItem  my-3 card shadow-lg" +
        (currentVideoId == video._id ? " current" : "")
      }
    >
      <a onClick={handleClick} href="#" className="row">
        <div className="col-4">
          <img
            className="p-1 rounded"
            width={"100%"}
            src={video.posterLink as string}
            alt={video.title}
          />
        </div>
        <div className="col-8 align-self-center ">
          <div className="">
            <div className="video-title created_at d-flex align-items-center">
              <strong>
                {capitalizeFirstLetter(video.title.toLowerCase())}
              </strong>
            </div>
          </div>
          <div className="created_at d-flex align-items-center gap-1">
            Published at: <strong>{createdAt.fromNow()}</strong>
          </div>
        </div>
      </a>
    </div>
  );
};

export default PlayListItem;
