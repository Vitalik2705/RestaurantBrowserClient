import React from 'react';
import { Button } from 'antd';
import {useLanguage} from "../../../../contexts/LanguageContext";

const RestaurantPhotos = ({ selectedFile, onFileChange, onUploadPhoto, onSelectFile }) => {
  const { text } = useLanguage();

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        onChange={onFileChange}
        style={{display: 'none'}}
      />
      <div
        className="thumbnail-container"
        style={{display: selectedFile ? 'block' : 'none'}}
      >
        {selectedFile && (
          <img
            className="thumbnail"
            src={URL.createObjectURL(selectedFile)}
            alt="Selected Thumbnail"
          />
        )}
      </div>
      <Button
        className="feedback-modal-button"
        size="large"
        onClick={onSelectFile}
      >
        {text.restaurantView.photos.selectFile}
      </Button>
      <Button
        className="feedback-modal-button"
        size="large"
        onClick={onUploadPhoto}
      >
        {text.restaurantView.photos.uploadPhoto}
      </Button>
    </div>
  );
};

export default RestaurantPhotos;