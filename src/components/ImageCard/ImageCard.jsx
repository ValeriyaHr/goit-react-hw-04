import styles from './ImageCard.module.css';

const ImageCard = ({ image, showModal }) => {
  return (
    <div className={styles.imageCard} onClick={() => showModal(image.imageLinkModal, image.alternativeName)}>
      <img src={image.imageLinkSmall} alt={image.alternativeName} className={styles.image} />
    </div>
  );
};

export default ImageCard;
