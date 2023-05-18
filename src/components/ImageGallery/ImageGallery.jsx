import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem.jsx';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ pictures, onPictureClick }) => {
  return (
    <>
      <ul className={css.ImageGallery}>
        <ImageGalleryItem pictures={pictures} onPictureClick={onPictureClick} />
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
  onPictureClick: PropTypes.func.isRequired,
};
