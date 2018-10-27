import React from "react";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  console.log(`Current page from Pagination: ${currentPage}`);
  // Calculate the number of pages then use Math.ceil to have an integer
  const pagesCount = Math.ceil(itemsCount / pageSize);
  // Dont render Pagination if page is only one
  if (pagesCount === 1) return null;
  // Create/generate an array [1,...pagesCount] by using lodash(install)
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
