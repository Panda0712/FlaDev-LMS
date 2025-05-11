import React, { useEffect, useState } from "react";
import {
  fetchModules,
  createModule,
  updateModule,
  deleteModule,
} from "../../apis/endpoints";

const AdminModules = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newModule, setNewModule] = useState({ name: "", description: "" });
  const [editingModule, setEditingModule] = useState(null);

  const loadModules = async () => {
    setLoading(true);
    try {
      const res = await fetchModules();
      setModules(res.data);
      setError(null);
    } catch {
      setError("Failed to fetch modules");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadModules();
  }, []);

  const handleCreate = async () => {
    try {
      await createModule(newModule);
      setNewModule({ name: "", description: "" });
      loadModules();
    } catch {
      setError("Failed to create module");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateModule(editingModule.id, editingModule);
      setEditingModule(null);
      loadModules();
    } catch {
      setError("Failed to update module");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteModule(id);
      loadModules();
    } catch {
      setError("Failed to delete module");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Modules Management</h2>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h3 className="font-semibold mb-2">Add New Module</h3>
        <input
          className="border p-2 mr-2"
          placeholder="Name"
          value={newModule.name}
          onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Description"
          value={newModule.description}
          onChange={(e) =>
            setNewModule({ ...newModule, description: e.target.value })
          }
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Add
        </button>
      </div>
      {editingModule && (
        <div className="bg-yellow-100 rounded shadow p-4 mb-6">
          <h3 className="font-semibold mb-2">Edit Module</h3>
          <input
            className="border p-2 mr-2"
            placeholder="Name"
            value={editingModule.name}
            onChange={(e) =>
              setEditingModule({ ...editingModule, name: e.target.value })
            }
          />
          <input
            className="border p-2 mr-2"
            placeholder="Description"
            value={editingModule.description}
            onChange={(e) =>
              setEditingModule({
                ...editingModule,
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
            onClick={() => setEditingModule(null)}
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
                <th className="text-left">Name</th>
                <th className="text-left">Description</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module.id}>
                  <td>{module.id}</td>
                  <td>{module.name}</td>
                  <td>{module.description}</td>
                  <td>
                    <button
                      className="bg-yellow-400 px-2 py-1 rounded mr-2"
                      onClick={() => setEditingModule(module)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(module.id)}
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

export default AdminModules;
