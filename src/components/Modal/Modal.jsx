import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  onBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onModalClose();
    }
  };

  render() {
    console.log(`this.props: `, this.props);
    const { largePictureOpened, tags } = this.props;
    return (
      <div className={css.Overlay} onClick={this.onBackDropClick}>
        <div className={css.Modal}>
          <img src={largePictureOpened} alt={tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largePictureOpened: PropTypes.string.isRequired,
};
