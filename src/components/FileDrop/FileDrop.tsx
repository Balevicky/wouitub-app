/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 16/05/2025 16:52:49
*/
import React, { FC, useState } from "react";
import "./FileDrop.css";

interface FileDropProps {
  onFileDrop: (files: Array<File>) => void;
}

const FileDrop: FC<FileDropProps> = ({ onFileDrop }) => {
  const [dragging, setDragging] = useState<boolean>(false);

  // =====================
  const handleDragEnter = (event: any) => {
    event.preventDefault();
    setDragging(true);
  };
  // =====================
  const handleDragOver = (event: any) => {
    event.preventDefault();
    setDragging(true);
  };
  // =====================
  const handleDragLeave = (event: any) => {
    event.preventDefault();
    setDragging(false);
  };
  // =====================
  const handleDrop = (event: any) => {
    event.preventDefault();
    setDragging(false);
    const files: File[] = Array.from(event.dataTransfer.files);
    onFileDrop(files);
  };
  return (
    <div className="fileDrop ">
      <div
        className={"upload-zone " + (dragging ? "dragging" : "")}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p>Glissez dépossez vos fichiers vidéos !</p>
      </div>
    </div>
  );
};

export default FileDrop;
