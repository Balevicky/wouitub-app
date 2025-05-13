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
import { Link } from "react-router-dom";

interface PlayListItemProps {
  video: Video;
  currentVideoId: number;
}

const PlayListItem: FC<PlayListItemProps> = ({ video, currentVideoId }) => {
  // const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState(true);

  return (
    <div className="PlayListItem p-1">
      <Link
        to={"/reader/" + video._id}
        className={
          currentVideoId == video._id ? "row border current" : "row border"
        }
      >
        <div className="col-md-4">
          <img
            className="p-1"
            width={"100%"}
            src={video.posterLink as string}
            alt={video.title}
          />
        </div>
        <div className="col-md-8">
          <div className="d-flex align-item-center">
            <strong>{video.title}</strong>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlayListItem;
