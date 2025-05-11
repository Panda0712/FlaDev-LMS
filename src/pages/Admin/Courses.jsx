import React, { useEffect, useState } from "react";
import {
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../apis/endpoints";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });
  const [editingCourse, setEditingCourse] = useState(null);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const res = await fetchCourses();
      setCourses(res.data);
      setError(null);
    } catch {
      setError("Failed to fetch courses");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCreate = async () => {
    try {
      await createCourse(newCourse);
      setNewCourse({ title: "", description: "" });
      loadCourses();
    } catch {
      setError("Failed to create course");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateCourse(editingCourse.id, editingCourse);
      setEditingCourse(null);
      loadCourses();
    } catch {
      setError("Failed to update course");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      loadCourses();
    } catch {
      setError("Failed to delete course");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Courses Management</h2>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h3 className="font-semibold mb-2">Add New Course</h3>
        <input
          className="border p-2 mr-2"
          placeholder="Title"
          value={newCourse.title}
          onChange={(e) =>
            setNewCourse({ ...newCourse, title: e.target.value })
          }
        />
        <input
          className="border p-2 mr-2"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) =>
            setNewCourse({ ...newCourse, description: e.target.value })
          }
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Add
        </button>
      </div>
      {editingCourse && (
        <div className="bg-yellow-100 rounded shadow p-4 mb-6">
          <h3 className="font-semibold mb-2">Edit Course</h3>
          <input
            className="border p-2 mr-2"
            placeholder="Title"
            value={editingCourse.title}
            onChange={(e) =>
              setEditingCourse({ ...editingCourse, title: e.target.value })
            }
          />
          <input
            className="border p-2 mr-2"
            placeholder="Description"
            value={editingCourse.description}
            onChange={(e) =>
              setEditingCourse({
                ...editingCourse,
                description: e.target.value,
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
            onClick={() => setEditingCourse(null)}
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
                <th className="text-left">Description</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>
                    <button
                      className="bg-yellow-400 px-2 py-1 rounded mr-2"
                      onClick={() => setEditingCourse(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(course.id)}
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

export default AdminCourses;
