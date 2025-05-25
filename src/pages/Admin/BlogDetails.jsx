import { Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteBlog, fetchBlogById } from "~/apis/endpoints";
import DeleteConfirmationModal from "~/components/DeleteConfirmationModal/DeleteConfirmationModal";

const AdminBlogDetails = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchBlogById(blogId);
        setBlog(response);
      } catch (error) {
        console.error("Lỗi tải nội dung bài viết:", error);
        setError("Lỗi tải nội dung bài viết");
        toast.error("Lỗi tải nội dung bài viết!!!");
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      loadBlog();
    }
  }, [blogId]);

  const handleDeleteBlog = async () => {
    try {
      await deleteBlog(blogId);
      toast.success("Xóa bài viết thành công!");
      navigate("/admin/blogs");
    } catch (error) {
      console.error("Lỗi xóa bài viết:", error);
      toast.error("Lỗi xóa bài viết!! Vui lòng thử lại sau!!!");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatContent = (content) => {
    if (!content) return "";
    let formattedContent = content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>') // Inline code
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>') // H1
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mb-3">$1</h2>') // H2
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mb-2">$1</h3>') // H3
      .replace(
        /^> (.*$)/gm,
        '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4">$1</blockquote>'
      )
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>') // List items
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>') // Numbered list items
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
      );

    formattedContent = formattedContent.replace(
      /((<li class="ml-4">.*<\/li>\s*)+)/g,
      '<ul class="list-disc mb-4">$1</ul>'
    );

    return formattedContent
      .split("\n")
      .map((paragraph, index) => {
        if (paragraph.trim() === "") return null;
        if (
          paragraph.includes("<h1") ||
          paragraph.includes("<h2") ||
          paragraph.includes("<h3") ||
          paragraph.includes("<blockquote") ||
          paragraph.includes("<ul")
        ) {
          return (
            <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
          );
        }
        return (
          <p
            key={index}
            className="mb-4 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
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
      <div className="min-h-screen py-12">
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
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                Không tìm thấy bài viết
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Bài viết bạn đang tìm không tồn tại hoặc đã bị xóa.
              </p>
              <div className="mt-6">
                <Link
                  to="/admin/blogs"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Quay lại danh sách
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteBlog}
        title="Xóa bài viết"
        message="Bạn có chắc chắn muốn xóa bài viết này không? Sau khi xóa không thể hoàn tác!"
        confirmButtonText="Xóa"
        cancelButtonText="Hủy"
        modalStyle="w-[450px]"
      />

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/admin/blogs"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
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
                Quay lại danh sách
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-lg font-medium text-gray-900">
                Chi tiết bài viết
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Xóa bài viết
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-2">
                Thông tin cơ bản
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-700">ID:</span>
                  <span className="ml-2 text-sm text-gray-900">
                    {blog.id || blog._id}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Tác giả:
                  </span>
                  <span className="ml-2 text-sm text-gray-900">
                    {blog.author || "Ẩn danh"}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Ngày tạo:
                  </span>
                  <span className="ml-2 text-sm text-gray-900">
                    {formatDate(blog.created_at || blog.createdAt)}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Cập nhật lần cuối:
                  </span>
                  <span className="ml-2 text-sm text-gray-900">
                    {formatDate(blog.updated_at || blog.updatedAt)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-2">Tags</h2>
              {blog.tags && blog.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-gray-500">Không có tags</span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {blog.coverImage && (
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>

            {blog.summary && (
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Tóm tắt
                </h2>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                  {blog.summary}
                </p>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Nội dung
              </h2>
              <div className="prose max-w-none">
                <div className="text-gray-700 leading-relaxed">
                  {formatContent(blog.content)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogDetails;
