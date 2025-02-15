import PropTypes from "prop-types";
import ReusableButton from "./common/ReusableButton";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    if (currentPage > 3) pageNumbers.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    if (currentPage < totalPages - 2) pageNumbers.push("...");
    pageNumbers.push(totalPages);
  }

  return (
    <div className="pagination">
      <ReusableButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination__prev"
      >
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M10 12L6 8l4-4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </ReusableButton>

      {pageNumbers.map((page, index) => (
        <span key={index}>
          {page === "..." ? (
            <span className="pagination__ellipsis">...</span>
          ) : (
            <ReusableButton
              onClick={() => onPageChange(page)}
              className={`pagination__number ${
                currentPage === page ? "active" : ""
              }`}
            >
              {page}
            </ReusableButton>
          )}
        </span>
      ))}

      <ReusableButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination__next"
      >
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </ReusableButton>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
