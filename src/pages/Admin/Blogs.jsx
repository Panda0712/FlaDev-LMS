import React, { useEffect, useState } from "react";
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../../apis/endpoints";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });
  const [editingBlog, setEditingBlog] = useState(null);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetchBlogs();
      setBlogs(res.data);
      setError(null);
    } catch {
      setError("Failed to fetch blogs");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleCreate = async () => {
    try {
      await createBlog(newBlog);
      setNewBlog({ title: "", content: "" });
      loadBlogs();
    } catch {
      setError("Failed to create blog");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateBlog(editingBlog.id, editingBlog);
      setEditingBlog(null);
      loadBlogs();
    } catch {
      setError("Failed to update blog");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      loadBlogs();
    } catch {
      setError("Failed to delete blog");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Blogs Management</h2>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h3 className="font-semibold mb-2">Add New Blog</h3>
        <input
          className="border p-2 mr-2"
          placeholder="Title"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Content"
          value={newBlog.content}
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Add
        </button>
      </div>
      {editingBlog && (
        <div className="bg-yellow-100 rounded shadow p-4 mb-6">
          <h3 className="font-semibold mb-2">Edit Blog</h3>
          <input
            className="border p-2 mr-2"
            placeholder="Title"
            value={editingBlog.title}
            onChange={(e) =>
              setEditingBlog({ ...editingBlog, title: e.target.value })
            }
          />
          <input
            className="border p-2 mr-2"
            placeholder="Content"
            value={editingBlog.content}
            onChange={(e) =>
              setEditingBlog({ ...editingBlog, content: e.target.value })
            }
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleUpdate}
          >
            Save
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={() => setEditingBlog(null)}
          >
            Cancel
          </button>
        </div>
      )}
      <div className="bg-white rounded shadow p-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">ID</th>
                <th className="text-left">Title</th>
                <th className="text-left">Content</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.id}</td>
                  <td>{blog.title}</td>
                  <td>{blog.content}</td>
                  <td>
                    <button
                      className="bg-yellow-400 px-2 py-1 rounded mr-2"
                      onClick={() => setEditingBlog(blog)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;
