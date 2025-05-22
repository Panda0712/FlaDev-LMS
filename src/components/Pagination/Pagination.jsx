import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ReactPaginate from "react-paginate";

const Pagination = ({ handlePageChange, totalPages, currentPage }) => {
  return (
    <div className="mt-10">
      <ReactPaginate
        breakLabel="..."
        nextLabel={<FiChevronRight />}
        previousLabel={<FiChevronLeft />}
        onPageChange={(selected) => handlePageChange(selected.selected + 1)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
        containerClassName="flex items-center justify-center gap-2 mt-6"
        pageClassName="px-4 py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        activeClassName="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
        previousClassName="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        nextClassName="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        disabledClassName="opacity-50 cursor-not-allowed"
        breakClassName="px-3 py-2 text-gray-500"
      />
    </div>
  );
};

export default Pagination;
