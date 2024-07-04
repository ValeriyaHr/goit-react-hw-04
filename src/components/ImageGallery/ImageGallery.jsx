import React from 'react';
import styles from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ imagesForGallery, showModal }) => {
  if (imagesForGallery.length === 0) {
    return null;
  }

  return (
    <ul className={styles.imageGallery}>
      {imagesForGallery.map((image) => (
        <li key={image.id} className={styles.imageItem}>
          <ImageCard image={image} showModal={showModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
