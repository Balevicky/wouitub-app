/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 01/05/2025 12:09:57
*/
import React, { FC, useEffect, Fragment, useState } from "react";
// import Loading from '../Loading/Loading';
import "./Home.css";
import Loading from "../../components/Loading/Loading";
import { convertBlobToUrl } from "../../helpers/fileHelper";
import { getAllVideo } from "../../api/api-video";
import { Video } from "../../models/Video";
import VideoCard from "../../components/VideoCard/VideoCard";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [loading, setLoading] = useState(true);

  const [videos, setVideos] = useState<Video[]>([]);
  const runLocalData = async () => {
    const data: any = await getAllVideo();
    console.log(data);

    if (data.isSuccess) {
      data.results.map((video: Video) => {
        video.posterLink = video.posterLink = convertBlobToUrl(
          video.poster as Blob
        );
        video.videolLink = convertBlobToUrl(video.link as Blob);
        return video;
      });
      setVideos(data.results);
      setLoading(false);
      // console.log(videos);
    }
  };
  // =============
  useEffect(() => {
    window.scrollTo(0, 0);

    runLocalData();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="Home container">
          <div className="row">
            {videos.map((video: Video) => (
              <VideoCard video={video} key={video._id} />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
