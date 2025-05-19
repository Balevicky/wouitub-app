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
import Paginations from "../Paginations/Paginations";
import { findVideo, getVideoByPage } from "../../api/api-video";

interface SearchBoxProps {
  handleChange: (videos: Video[]) => void;
}
interface resultData {
  isSuccess: boolean;
  results?: Record<string, any>[];
  totalPages?: number;
  currentPage?: number;
  nextPage?: number | null;
  previousPage?: number | null;
  allCount?: number | null;
  pageLinks?: string[];
}

const SearchBox: FC<SearchBoxProps> = ({ handleChange }) => {
  // const [videos, setVideos] = useState<Video[]>([]);
  const currentSearchParams = new URLSearchParams(window.location.search);
  const searchQuery = currentSearchParams.get("searchVideo") || "";
  const pageQuery = parseInt(currentSearchParams.get("page") || "1");
  const [datas, setDatas] = useState<resultData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(pageQuery);
  const [pageSize, setPageSize] = useState<number>(8);
  const location = useLocation();

  const runLocalData = async () => {
    const data: any = await findVideo(
      searchQuery,
      "title",
      currentPage,
      pageSize
    );
    // const data: any = await getVideoByPage(currentPage, pageSize);
    setDatas(data);
    // const data: any = await getAllVideo();
    console.log(data);

    if (data.isSuccess) {
      data.results?.map((video: Video) => {
        video.posterLink = video.posterLink = convertBlobToUrl(
          video.poster as Blob
        );
        video.videolLink = convertBlobToUrl(video.link as Blob);
        return video;
      });

      // const filteredVideos = data.results.filter((video: Video) =>
      //   video.title.toLowerCase().includes(searchQuery.toLowerCase())
      // );
      // setVideos(filteredVideos);
      // handleChange(filteredVideos);
      handleChange(data.results);
      console.log(data.results);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    runLocalData();
  }, [location.search, currentPage, pageSize]);

  return (
    <div className="SearchBox">
      {searchQuery !== "" && (
        <div className="homeHeader">
          <h2>Search Result</h2>
          <p>
            Displaying {datas?.allCount} video matching the search query "
            <strong>{searchQuery}</strong>"
          </p>
        </div>
      )}
      <div className="d-flex justify-content-start gap-3">
        <Paginations
          pageLinks={datas?.pageLinks}
          currentPage={datas?.currentPage}
          totalPages={datas?.totalPages}
          nextPage={datas?.nextPage}
          previousPage={datas?.previousPage}
          onPageChange={setCurrentPage}
        />
        <div>
          <select
            name="pageSize"
            id="pageSize"
            className="form-control "
            onChange={(e) => setPageSize(parseInt(e.target.value))}
          >
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
