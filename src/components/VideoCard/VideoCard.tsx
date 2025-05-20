/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 03/05/2025 19:27:32
*/
import React, { FC, useEffect } from "react";
import "./VideoCard.css";
import { Video } from "../../models/Video";
import { Link } from "react-router-dom";
import moment from "moment";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";

interface VideoCardProps {
  video: Video;
}

const VideoCard: FC<VideoCardProps> = ({ video }) => {
  const createdAt = moment(video?.creatdate_at);
  return (
    <div className=" VideoCard col-lg-3 col-md-6">
      {/* key={video._id} */}
      {/* <Link to={"/reader/" + video._id}> */}
      <Link to={"/reader/" + video.slug}>
        <div className="shadow-lg card my-1">
          <img
            src={video.posterLink as string}
            className="card-img-top"
            alt={video.title}
            height="200px"
          />
          <div className="card-body">
            <h5 className="card-title">
              {capitalizeFirstLetter(video.title.toLowerCase())}
            </h5>
            <p className="card-text">
              created at: <strong>{createdAt.format("DD/MM/YYYY")}</strong>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
