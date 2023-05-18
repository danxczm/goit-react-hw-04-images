import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ pictures, onPictureClick }) => {
  return (
    <>
      {pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li key={id} className={css.ImageGalleryItem}>
          <img
            onClick={() => onPictureClick(largeImageURL)}
            className={css.ImageGalleryItemImage}
            src={webformatURL}
            alt={tags}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onPictureClick: PropTypes.func.isRequired,
};
