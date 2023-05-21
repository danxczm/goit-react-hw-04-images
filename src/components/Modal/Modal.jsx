import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export function Modal({ largePictureOpened, tags, onModalClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  const onBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onModalClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={onBackDropClick}>
      <div className={css.Modal}>
        <img src={largePictureOpened} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largePictureOpened: PropTypes.string.isRequired,
};
