import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./App.module.css";
import "modern-normalize";
import { Toaster } from "react-hot-toast";
import fetchImages from '../../unsplashAPI';

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState({
    results: [],
    total_pages: 0,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [isLoad, setLoad] = useState(false);
  const [modalData, setModalData] = useState({});
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef(null);

  const fetchImagesData = async (search, page) => {
    setLoad(true);
    try {
      const data = await fetchImages(search, page);
      setImages(prevImages => ({
        results: [...prevImages.results, ...data.results],
        total_pages: data.total_pages,
        total: data.total,
      }));
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    if (search.length !== 0) {
      setImages({ results: [], total_pages: 0, total: 0 });
      setPage(1);
      fetchImagesData(search, 1);
    }
  }, [search]);

  useEffect(() => {
    if (page > 1) {
      fetchImagesData(search, page);
    }
  }, [page]);

  useEffect(() => {
    if (images.results.length > 0 && page > 1) {
      const timeoutId = setTimeout(() => {
        scrollToLoadMore();
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [images]);

  const imagesForGallery = useMemo(() => {
    return images.results.map((image) => ({
      id: image.id,
      imageLinkSmall: image.urls.small,
      imageLinkModal: image.urls.regular,
      alternativeName: image.alt_description ?? image.description,
    }));
  }, [images.results]);

  const scrollToLoadMore = () => {
    loadMoreRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const modalHide = () => {
    setModalData({});
  };

  const showModal = (imageLink, alt) => {
    setModalData({ link: imageLink, alt: alt });
  };

  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={styles.app}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={setSearch} />
      {imagesForGallery.length > 0 && (
        <ImageGallery
          imagesForGallery={imagesForGallery}
          showModal={showModal}
        />
      )}
      {isLoad && <Loader />}
      {error && <ErrorMessage errorMessage={error} />}
      {images.results.length > 0 && page < images.total_pages && (
        <LoadMoreBtn endRef={loadMoreRef} onClick={incrementPage} />
      )}
      <ImageModal modalShow={modalData} modalHide={modalHide} />
    </div>
  );
}

export default App;