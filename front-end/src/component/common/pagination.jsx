import React from "react";
import propTypes from "prop-types";
import _ from "lodash";

const Pagination = (props) => {
  const { itemCount, pageSize, currentPage, onPageChange } = props;

  const pagesCount = Math.ceil(itemCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  // we cant add pagination directly as it will break the logic if the -
  // movies increases in the database so set it dynamically by mapping it.
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              onClick={() => onPageChange(page)}
              className="page-link"
              href="#/"
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.prototype = {
  itemCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
};

export default Pagination;
