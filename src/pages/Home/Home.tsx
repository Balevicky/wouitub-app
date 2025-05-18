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
import { Video } from "../../models/Video";
import VideoCard from "../../components/VideoCard/VideoCard";
import SearchBox from "../../components/SearchBox/SearchBox";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);

  // =============
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(false);
    // runLocalData();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="Home container-fluid py-2">
          <SearchBox handleChange={setVideos} />
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
