/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 13/05/2025 14:40:07
*/
import React, { FC, useEffect, useState } from "react";
import "./PlayList.css";
import { Video } from "../../models/Video";
import { findVideo, getAllVideo } from "../../api/api-video";
import { convertBlobToUrl } from "../../helpers/fileHelper";
import PlayListItem from "../PlayListItem/PlayListItem";
import { useLocation } from "react-router-dom";
import { ResultData } from "../../models/ResultData";
import Paginations from "../Paginations/Paginations";

interface PlayListProps {
  videoId: number;
}

const PlayList: FC<PlayListProps> = ({ videoId }) => {
  const currentSearchParams = new URLSearchParams(window.location.search);
  const searchQuery = currentSearchParams.get("searchVideo") || "";
  const pageQuery = parseInt(currentSearchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState<number>(pageQuery);
  const [pageSize, setPageSize] = useState<number>(8);
  const [videos, setVideos] = useState<Video[]>([]);
  const [datas, setDatas] = useState<ResultData | null>(null);
  const location = useLocation();

  const runLocalData = async () => {
    const data: any = await findVideo(
      searchQuery,
      "title",
      currentPage,
      pageSize
    );
    console.log(data);
    setDatas(data);
    // const data: any = await getAllVideo();
    if (data.isSuccess) {
      console.log(data.results);

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
  }, [location.search]);

  return (
    <div className="PlayList">
      <div className="PlayListHeader shadow-lg p-2">
        <h2>
          <strong>PlayList</strong>
        </h2>
        <p> {datas?.allCount} videos </p>
        <Paginations
          pageLinks={datas?.pageLinks}
          currentPage={datas?.currentPage}
          totalPages={datas?.totalPages}
          nextPage={datas?.nextPage}
          previousPage={datas?.previousPage}
          onPageChange={setCurrentPage}
        />
      </div>
      <div className="PlayListContent">
        {videos.map((video: Video) => (
          <PlayListItem
            currentVideoId={videoId}
            video={video}
            key={video._id}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayList;
