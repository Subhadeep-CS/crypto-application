import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "../../components/ui/pagination";
import { PaginationComponentProps } from "./module";

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(currentPage - 1);
            }}
            aria-disabled={currentPage === 1}
            className={`${
              currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:text-green-500 hover:bg-green-500/20"
            }`}
          />
        </PaginationItem>

        {/* Dynamic Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis className="cursor-default" />
            ) : (
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(page as number);
                }}
                className={`cursor-pointer ${
                  currentPage === page
                    ? "font-semibold text-green-500 bg-green-500/20 hover:text-green-500 hover:bg-green-500/20"
                    : "hover:text-green-500 hover:bg-green-500/20"
                }`}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(currentPage + 1);
            }}
            aria-disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:text-green-500 hover:bg-green-500/20"
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
