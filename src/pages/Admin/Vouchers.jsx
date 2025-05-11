import React, { useEffect, useState } from "react";
import {
  fetchVouchers,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} from "../../apis/endpoints";

const AdminVouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newVoucher, setNewVoucher] = useState({ code: "", discount: 0 });
  const [editingVoucher, setEditingVoucher] = useState(null);

  const loadVouchers = async () => {
    setLoading(true);
    try {
      const res = await fetchVouchers();
      setVouchers(res.data);
      setError(null);
    } catch {
      setError("Failed to fetch vouchers");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadVouchers();
  }, []);

  const handleCreate = async () => {
    try {
      await createVoucher(newVoucher);
      setNewVoucher({ code: "", discount: 0 });
      loadVouchers();
    } catch {
      setError("Failed to create voucher");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateVoucher(editingVoucher.id, editingVoucher);
      setEditingVoucher(null);
      loadVouchers();
    } catch {
      setError("Failed to update voucher");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVoucher(id);
      loadVouchers();
    } catch  {
      setError("Failed to delete voucher");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Vouchers Management</h2>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h3 className="font-semibold mb-2">Add New Voucher</h3>
        <input
          className="border p-2 mr-2"
          placeholder="Code"
          value={newVoucher.code}
          onChange={(e) =>
            setNewVoucher({ ...newVoucher, code: e.target.value })
          }
        />
        <input
          className="border p-2 mr-2"
          type="number"
          placeholder="Discount"
          value={newVoucher.discount}
          onChange={(e) =>
            setNewVoucher({ ...newVoucher, discount: Number(e.target.value) })
          }
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Add
        </button>
      </div>
      {editingVoucher && (
        <div className="bg-yellow-100 rounded shadow p-4 mb-6">
          <h3 className="font-semibold mb-2">Edit Voucher</h3>
          <input
            className="border p-2 mr-2"
            placeholder="Code"
            value={editingVoucher.code}
            onChange={(e) =>
              setEditingVoucher({ ...editingVoucher, code: e.target.value })
            }
          />
          <input
            className="border p-2 mr-2"
            type="number"
            placeholder="Discount"
            value={editingVoucher.discount}
            onChange={(e) =>
              setEditingVoucher({
                ...editingVoucher,
                discount: Number(e.target.value),
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
            onClick={() => setEditingVoucher(null)}
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
                <th className="text-left">Code</th>
                <th className="text-left">Discount</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((voucher) => (
                <tr key={voucher.id}>
                  <td>{voucher.id}</td>
                  <td>{voucher.code}</td>
                  <td>{voucher.discount}</td>
                  <td>
                    <button
                      className="bg-yellow-400 px-2 py-1 rounded mr-2"
                      onClick={() => setEditingVoucher(voucher)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(voucher.id)}
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

export default AdminVouchers;
