import { Component } from 'react';

import { fetchData } from 'API/fetchData';
import { Loader } from 'components/Loader/Loader.jsx';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';

export class App extends Component {
  state = {
    pictures: [],
    largePictureOpened: null,
    tags: '',
    page: null,
    searchQuery: '',
    showModal: false,
    status: '',
    totalHits: null,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ status: 'pending', pictures: [], page: 1 });

      return fetchData(searchQuery, page)
        .then(data => {
          if (data.data.hits.length === 0)
            throw new Error(`There are no pictures with ${searchQuery} tag`);
          else
            this.setState({
              pictures: data.data.hits,
              totalHits: data.data.totalHits,
              status: 'resolved',
            });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  loadMoreHandler = () => {
    const { page, searchQuery } = this.state;

    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        fetchData(searchQuery, page)
          .then(data => {
            this.setState(prevState => ({
              pictures: [...prevState.pictures, ...data.data.hits],
            }));
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      }
    );
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onPictureClick = (largePictureOpened, tags) => {
    this.setState({ largePictureOpened, tags });
    this.toggleModal();
  };

  render() {
    const {
      pictures,
      totalHits,
      error,
      status,
      showModal,
      largePictureOpened,
      tags,
      searchQuery,
    } = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'pending' && <Loader />}

        {status === 'rejected' && (
          <h1 style={{ display: 'flex', justifyContent: 'center' }}>
            {error.message}
          </h1>
        )}
        {status === 'resolved' && (
          <div>
            {searchQuery && (
              <ImageGallery
                pictures={pictures}
                onPictureClick={this.onPictureClick}
              />
            )}
            {showModal && (
              <Modal
                onModalClose={this.toggleModal}
                largePictureOpened={largePictureOpened}
                tags={tags}
              />
            )}
            {pictures.length > 0 && pictures.length < totalHits && (
              <Button onClick={this.loadMoreHandler} />
            )}
          </div>
        )}
      </div>
    );
  }
}
