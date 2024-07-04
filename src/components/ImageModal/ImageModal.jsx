import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ modalShow, modalHide }) => {
  return (
    <Modal
      isOpen={!!modalShow.link}
      onRequestClose={modalHide}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button className={styles.closeButton} onClick={modalHide}>
        &times;
      </button>
      {modalShow.link && (
        <img src={modalShow.link} alt={modalShow.alt} className={styles.image} />
      )}
    </Modal>
  );
};

export default ImageModal;
