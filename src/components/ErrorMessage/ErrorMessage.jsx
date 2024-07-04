import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className={styles.errorMessage}>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;