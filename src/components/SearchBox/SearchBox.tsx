/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 18/05/2025 15:14:58
*/
import React, { FC, useEffect, useState } from "react";
import "./SearchBox.css";
import { useLocation } from "react-router-dom";
import { Video } from "../../models/Video";
import { convertBlobToUrl } from "../../helpers/fileHelper";
import { getAllVideo } from "../../api/api-video";

interface SearchBoxProps {
  handleChange: (videos: Video[]) => void;
}

const SearchBox: FC<SearchBoxProps> = ({ handleChange }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const currentSearchParams = new URLSearchParams(window.location.search);
  const searchQuery = currentSearchParams.get("searchVideo") || "";
  const location = useLocation();
  const runLocalData = async () => {
    const data: any = await getAllVideo();

    if (data.isSuccess) {
      data.results.map((video: Video) => {
        video.posterLink = video.posterLink = convertBlobToUrl(
          video.poster as Blob
        );
        video.videolLink = convertBlobToUrl(video.link as Blob);
        return video;
      });

      const filteredVideos = data.results.filter((video: Video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setVideos(filteredVideos);
      handleChange(filteredVideos);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    runLocalData();
  }, [location.search]);

  return (
    <div className="SearchBox">
      {searchQuery !== "" && (
        <div className="homeHeader">
          <h2>Search Result</h2>
          <p>
            Displaying {videos.length} video matching the search query "
            <strong>{searchQuery}</strong>"
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
