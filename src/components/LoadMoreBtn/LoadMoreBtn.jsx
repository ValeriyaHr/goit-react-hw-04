import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, endRef }) => {
  return (
    <div ref={endRef} className={styles.loadMoreContainer}>
      <button className={styles.loadMoreBtn} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;