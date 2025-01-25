import React from 'react';
import {useLanguage} from "../../../contexts/LanguageContext";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { text } = useLanguage();

  if (totalPages <= 1) return null;

  return (
    <div className='pagination'>
      <a
        onClick={() => onPageChange(currentPage - 1)}
        className={0 === currentPage ? 'disabled' : ''}
      >
        {text.favourite.pagination.prev}
      </a>

      {[...Array(totalPages).keys()].map((page) => (
        <a
          onClick={() => onPageChange(page)}
          className={currentPage === page ? 'active' : ''}
          key={page}
        >
          {page + 1}
        </a>
      ))}

      <a
        onClick={() => onPageChange(currentPage + 1)}
        className={totalPages === currentPage + 1 ? 'disabled' : ''}
      >
        {text.favourite.pagination.next}
      </a>
    </div>
  );
};

export default Pagination;