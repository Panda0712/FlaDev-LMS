import { Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchBlogById } from "~/apis/endpoints";

const BlogDetails = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchBlogById(blogId);
        setBlog(response);
      } catch (error) {
        console.error("Lỗi tải dữ liệu chi tiết bài viết:", error);
        setError("Lỗi tải nội dung bài viết");
        toast.error("Lỗi tải dữ liệu nội dung bài viết");
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      loadBlog();
    }
  }, [blogId]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatContent = (content) => {
    if (!content) return "";
    return content
      .split("\n")
      .map((paragraph, index) => {
        if (paragraph.trim() === "") return null;
        return (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {paragraph.trim()}
          </p>
        );
      })
      .filter(Boolean);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h3 className="mt-2 md:text-lg text-[16px] font-medium text-gray-900">
                Không tìm thấy nội dung bài viết!!!
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate("/blog")}
                  className="inline-flex items-center px-4 py-2 border border-transparent 
                  text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 
                  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Trở về danh sách bài viết
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Trang chủ
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Link
                    to="/blog"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
                  >
                    Bài viết
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    {blog.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="mb-8">
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1
              className="lg:text-4xl md:text-[32px] text-[24px]
             font-bold text-gray-900 mb-6 leading-tight"
            >
              {blog.title}
            </h1>

            {blog.summary && (
              <p
                className="lg:text-xl md:text-[18px] text-[16px]
               text-gray-600 mb-6 leading-relaxed"
              >
                {blog.summary}
              </p>
            )}

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">{blog.author || "Ẩn danh"}</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{formatDate(blog.created_at || blog.createdAt)}</span>
              </div>
            </div>
          </div>

          {blog.coverImage && (
            <div className="mb-8">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="md:text-lg text-[16px] leading-relaxed">
              {formatContent(blog.content)}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              to="/blog"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
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
              Trở về danh sách bài viết
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
