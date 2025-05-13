/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 13/05/2025 14:40:07
*/
import React, { FC, useEffect, useState } from "react";
import "./PlayList.css";
import { Video } from "../../models/Video";
import { getAllVideo } from "../../api/api-video";
import { convertBlobToUrl } from "../../helpers/fileHelper";
import PlayListItem from "../PlayListItem/PlayListItem";

interface PlayListProps {
  videoId: number;
}

const PlayList: FC<PlayListProps> = ({ videoId }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const runLocalData = async () => {
    const data: any = await getAllVideo();
    if (data.isSuccess) {
      data.results.map((video: Video) => {
        video.posterLink = convertBlobToUrl(video.poster as Blob);
        video.videolLink = convertBlobToUrl(video.link as Blob);
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

  return (
    <div className="PlayList">
      {videos.map((video: Video) => (
        <PlayListItem currentVideoId={videoId} video={video} />
      ))}
    </div>
  );
};

export default PlayList;
