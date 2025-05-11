import React, { useEffect, useState } from "react";
import {
  fetchOrders,
  // fetchOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../../apis/endpoints";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newOrder, setNewOrder] = useState({ user_id: "", total: 0 });
  const [editingOrder, setEditingOrder] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetchOrders();
      setOrders(res.data);
      setError(null);
    } catch {
      setError("Failed to fetch orders");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleCreate = async () => {
    try {
      await createOrder(newOrder);
      setNewOrder({ user_id: "", total: 0 });
      loadOrders();
    } catch {
      setError("Failed to create order");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateOrder(editingOrder.id, editingOrder);
      setEditingOrder(null);
      loadOrders();
    } catch {
      setError("Failed to update order");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      loadOrders();
    } catch {
      setError("Failed to delete order");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Orders Management</h2>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h3 className="font-semibold mb-2">Add New Order</h3>
        <input
          className="border p-2 mr-2"
          placeholder="User ID"
          value={newOrder.user_id}
          onChange={(e) =>
            setNewOrder({ ...newOrder, user_id: e.target.value })
          }
        />
        <input
          className="border p-2 mr-2"
          type="number"
          placeholder="Total"
          value={newOrder.total}
          onChange={(e) =>
            setNewOrder({ ...newOrder, total: Number(e.target.value) })
          }
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Add
        </button>
      </div>
      {editingOrder && (
        <div className="bg-yellow-100 rounded shadow p-4 mb-6">
          <h3 className="font-semibold mb-2">Edit Order</h3>
          <input
            className="border p-2 mr-2"
            placeholder="User ID"
            value={editingOrder.user_id}
            onChange={(e) =>
              setEditingOrder({ ...editingOrder, user_id: e.target.value })
            }
          />
          <input
            className="border p-2 mr-2"
            type="number"
            placeholder="Total"
            value={editingOrder.total}
            onChange={(e) =>
              setEditingOrder({
                ...editingOrder,
                total: Number(e.target.value),
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
            onClick={() => setEditingOrder(null)}
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
                <th className="text-left">User ID</th>
                <th className="text-left">Total</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user_id}</td>
                  <td>{order.total}</td>
                  <td>
                    <button
                      className="bg-yellow-400 px-2 py-1 rounded mr-2"
                      onClick={() => setEditingOrder(order)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(order.id)}
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

export default AdminOrders;
