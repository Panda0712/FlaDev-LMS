import React, { useEffect, useState } from "react";
import {
  fetchReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../../apis/endpoints";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState({ content: "", rating: 1 });
  const [editingReview, setEditingReview] = useState(null);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await fetchReviews();
      setReviews(res.data);
      setError(null);
    } catch {
      setError("Failed to fetch reviews");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleCreate = async () => {
    try {
      await createReview(newReview);
      setNewReview({ content: "", rating: 1 });
      loadReviews();
    } catch {
      setError("Failed to create review");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateReview(editingReview.id, editingReview);
      setEditingReview(null);
      loadReviews();
    } catch {
      setError("Failed to update review");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      loadReviews();
    } catch {
      setError("Failed to delete review");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Reviews Management</h2>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h3 className="font-semibold mb-2">Add New Review</h3>
        <input
          className="border p-2 mr-2"
          placeholder="Content"
          value={newReview.content}
          onChange={(e) =>
            setNewReview({ ...newReview, content: e.target.value })
          }
        />
        <input
          className="border p-2 mr-2"
          type="number"
          min={1}
          max={5}
          placeholder="Rating"
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({ ...newReview, rating: Number(e.target.value) })
          }
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Add
        </button>
      </div>
      {editingReview && (
        <div className="bg-yellow-100 rounded shadow p-4 mb-6">
          <h3 className="font-semibold mb-2">Edit Review</h3>
          <input
            className="border p-2 mr-2"
            placeholder="Content"
            value={editingReview.content}
            onChange={(e) =>
              setEditingReview({ ...editingReview, content: e.target.value })
            }
          />
          <input
            className="border p-2 mr-2"
            type="number"
            min={1}
            max={5}
            placeholder="Rating"
            value={editingReview.rating}
            onChange={(e) =>
              setEditingReview({
                ...editingReview,
                rating: Number(e.target.value),
              })
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
            onClick={() => setEditingReview(null)}
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
                <th className="text-left">Content</th>
                <th className="text-left">Rating</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>{review.content}</td>
                  <td>{review.rating}</td>
                  <td>
                    <button
                      className="bg-yellow-400 px-2 py-1 rounded mr-2"
                      onClick={() => setEditingReview(review)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(review.id)}
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

export default AdminReviews;
