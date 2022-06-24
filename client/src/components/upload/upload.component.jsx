import "./upload.styles.scss";

import placeholder from "../../assets/img/noodles-with-bg.svg";
import { useEffect, useState } from "react";

const Upload = ({ removeDefaultImage, defaultImage, imageData, setImageData }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    if (imageData) {
      setImage(URL.createObjectURL(imageData));
    } else if (defaultImage) {
      setImage(defaultImage);
    } else {
      setImage(placeholder);
    }
  }, [imageData, defaultImage]);

  function imageChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      setImageData(e.target.files[0]);
    }
  }

  function removeSelectedFile() {
    setImageData(null);
    removeDefaultImage();
  }

  return (
    <div>
      <div className='upload__preview'>
        <img className='upload__preview__img' src={image} alt='thumb' />
        <div className='upload__preview__btn-container'>
          <input
            className='upload__preview__btn'
            accept='image/*'
            type='file'
            name='file'
            id='file'
            onChange={imageChange}
          />
          <label htmlFor='file'>Choose an image</label>
          <button className='upload__preview__btn--delete' onClick={removeSelectedFile}>
            Remove this image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
