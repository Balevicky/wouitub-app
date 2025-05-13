/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 12/05/2025 20:45:20
*/
import React, { FC, useEffect, Fragment, useState } from "react";
// import Loading from '../Loading/Loading';
import "./MediaReader.css";
import Loading from "../../components/Loading/Loading";
import { Video } from "../../models/Video";
import { useParams } from "react-router-dom";
import { getVideo } from "../../api/api-video";
import { OuitubePlayer } from "ouitube-player";
import { convertBlobToUrl } from "../../helpers/fileHelper";
import { log } from "node:console";

interface MediaReaderProps {}

const MediaReader: FC<MediaReaderProps> = () => {
  // const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const [idvideo, setidvideo] = useState<number>(0);
  const [video, setVideo] = useState<Video | undefined>();
  const { videoId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {
      if (videoId) {
        let id = parseInt(videoId);
        const data: any = await getVideo(id);

        if (data.isSuccess) {
          const currentVideo = data.result;

          currentVideo.posterLink = convertBlobToUrl(
            currentVideo.poster as Blob
          );
          currentVideo.videolLink = convertBlobToUrl(currentVideo.link as Blob);
          setVideo(currentVideo);
          setidvideo(id);
          console.log(video);
          console.log(video?.link);
        }
      }
      setLoading(false);
    };
    runLocalData();
  }, []);

  return (
    <div className="container-fluid">
      {loading ? (
        <Loading />
      ) : video ? (
        <div className="MediaReader p-2">
          <div className="row">
            <div className="col-md-9 card">
              <OuitubePlayer src={video.videolLink as string} />
              <h2>{video.title}</h2>
            </div>
            <div className="col-md-3 card"></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MediaReader;
