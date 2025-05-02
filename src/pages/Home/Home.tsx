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

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  // const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  // const [value, setValue] = useState("");
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
              <div className="col-lg-3 col-md-6" key={video._id}>
                <div className="card my-1">
                  <img
                    src={video.posterLink as string}
                    className="card-img-top"
                    alt={video.title}
                    height="200px"
                    width="15%"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{video.title} </h5>
                    <p className="card-text">
                      created at: {video?.creatdate_at?.toDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
