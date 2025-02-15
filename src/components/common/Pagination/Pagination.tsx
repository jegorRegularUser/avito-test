import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) => {
  return (
    <div className="pagination">
      <button
        className="pagination-button"
        disabled={currentPage === 1 || disabled}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`pagination-button ${currentPage === i + 1 ? "active" : ""}`}
          onClick={() => onPageChange(i + 1)}
          disabled={disabled}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="pagination-button"
        disabled={currentPage === totalPages || disabled}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;