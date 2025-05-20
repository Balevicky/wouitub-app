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
import { useNavigate, useParams } from "react-router-dom";
import { searchVideoBySlug } from "../../api/api-video";
import { OuitubePlayer } from "ouitube-player";
import { convertBlobToUrl } from "../../helpers/fileHelper";
import PlayList from "../../components/PlayList/PlayList";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";

interface MediaReaderProps {}

const MediaReader: FC<MediaReaderProps> = () => {
  const [loading, setLoading] = useState(true);
  const [errorPage, setErrorPage] = useState(false);
  const [video, setVideo] = useState<Video | undefined>();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {
      if (slug) {
        // let id = parseInt(videoId);
        try {
          const data: any = await searchVideoBySlug(slug);
          if (data.isSuccess) {
            const currentVideo = data.result;

            currentVideo.posterLink = convertBlobToUrl(
              currentVideo.poster as Blob
            );
            currentVideo.videolLink = convertBlobToUrl(
              currentVideo.link as Blob
            );
            setVideo(currentVideo);
            // setidvideo(id);
            console.log(video);
            console.log(video?.link);
          } else {
            setErrorPage(true);
          }
        } catch (error) {
          setErrorPage(true);
        }
      }
      setLoading(false);
    };
    runLocalData();
  }, [slug]);

  if (errorPage) {
    navigate("/error");
  }

  return (
    <div className="container-fluid">
      {loading ? (
        <Loading />
      ) : video ? (
        <div className="MediaReader p-2">
          <div className="row">
            <div className="col-md-9 card">
              <OuitubePlayer src={video.videolLink as string} />
              <h2>{capitalizeFirstLetter(video.title.toLowerCase())}</h2>
              <div id="video-descriotion" className="video-description p-2 ">
                {video.description}
              </div>
            </div>

            <div className="col-md-3 card">
              <PlayList videoId={video._id!} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MediaReader;
