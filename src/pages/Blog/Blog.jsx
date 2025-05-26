import { Spin } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchBlogs } from "~/apis/endpoints";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetchBlogs();
        setBlogs(response || []);
      } catch (error) {
        console.error("Lỗi tải dữ liệu bài viết:", error);
        toast.error("Lỗi tải dữ liệu bài viết");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1
            className="lg:text-4xl md:text-[32px] text-[24px] 
           font-bold text-gray-900 mb-4"
          >
            Bài viết
          </h1>
          <p
            className="lg:text-xl md:text-[18px] text-[16px] 
          text-gray-600 max-w-2xl mx-auto"
          >
            Khám phá góc nhìn, hướng dẫn và những câu chuyện hữu ích trong cộng
            đồng
          </p>
        </div>

        {currentBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {currentBlogs.map((blog) => (
                <div
                  key={blog.id || blog._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={blog.coverImage || "/api/placeholder/400/300"}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6">
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {blog.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{blog.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {truncateText(blog.summary || blog.content)}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {blog.author || "Ẩn danh"}
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {formatDate(blog.created_at || blog.createdAt)}
                      </span>
                    </div>

                    <Link
                      to={`/blog/${blog.id || blog._id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                    >
                      Đọc thêm
                      <svg
                        className="w-4 h-4 ml-1"
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
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  }`}
                >
                  Trước
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => {
                    const showPage =
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1);

                    if (!showPage) {
                      // Show ellipsis
                      if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return (
                          <span
                            key={pageNumber}
                            className="px-3 py-2 text-gray-500"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          currentPage === pageNumber
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                )}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  }`}
                >
                  Sau
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Chưa có bài viết nào
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Hãy quay lại sau nhé!!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
