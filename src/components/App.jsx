import { useState, useEffect } from 'react';

import { fetchData } from 'API/fetchData';
import { Loader } from 'components/Loader/Loader.jsx';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';

export function App() {
  const [pictures, setPictures] = useState([]);
  const [largePictureOpened, setLargePictureOpened] = useState(null);
  const [tags, setTags] = useState('');
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    setStatus('pending');

    fetchData(searchQuery, page)
      .then(data => {
        if (data.data.hits.length === 0)
          throw new Error(`There are no pictures with ${searchQuery} tag`);
        else {
          setPictures(prevPictures => [...prevPictures, ...data.data.hits]);
          setTotalHits(data.data.totalHits);
          setStatus('resolved');
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [page, searchQuery]);

  const loadMoreHandler = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onPictureClick = (largePictureOpened, tags) => {
    setLargePictureOpened(largePictureOpened);
    setTags(tags);
    toggleModal();
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handleFormSubmit} />

      {status === 'pending' && <Loader />}

      {status === 'rejected' && (
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>
          {error.message}
        </h1>
      )}
      {status === 'resolved' && (
        <div>
          {searchQuery && (
            <ImageGallery pictures={pictures} onPictureClick={onPictureClick} />
          )}
          {showModal && (
            <Modal
              onModalClose={toggleModal}
              largePictureOpened={largePictureOpened}
              tags={tags}
            />
          )}
          {pictures.length > 0 && pictures.length < totalHits && (
            <Button onClick={loadMoreHandler} />
          )}
        </div>
      )}
    </div>
  );
}
