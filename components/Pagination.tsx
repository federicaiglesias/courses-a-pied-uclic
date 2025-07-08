import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  lang: "fr" | "en";
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  lang,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const translations = {
    fr: {
      previous: "Précédent",
      next: "Suivant",
      page: "Page",
      of: "sur",
    },
    en: {
      previous: "Previous",
      next: "Next",
      page: "Page",
      of: "of",
    },
  };

  const t = translations[lang];

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination with ellipsis
      if (currentPage <= 3) {
        // Near start
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* Previous button */}
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}${
            currentPage === 2 ? "" : `?page=${currentPage - 1}`
          }`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t.previous}
        </Link>
      )}

      {/* Page numbers */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-sm text-gray-400"
              >
                ...
              </span>
            );
          }

          const isCurrentPage = page === currentPage;
          const pageUrl = page === 1 ? baseUrl : `${baseUrl}?page=${page}`;

          return (
            <Link
              key={page}
              href={pageUrl}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isCurrentPage
                  ? "bg-blue-600 text-white border border-blue-600"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* Next button */}
      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
        >
          {t.next}
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      )}

      {/* Page info */}
      <div className="ml-4 text-sm text-gray-500">
        {t.page} {currentPage} {t.of} {totalPages}
      </div>
    </div>
  );
}
