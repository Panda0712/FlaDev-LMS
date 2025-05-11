import React, { useEffect, useState } from "react";
import {
  fetchContacts,
  createContact,
  deleteContact,
} from "../../apis/endpoints";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const loadContacts = async () => {
    setLoading(true);
    try {
      const res = await fetchContacts();
      setContacts(res.data);
      setError(null);
    } catch {
      setError("Failed to fetch contacts");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleCreate = async () => {
    try {
      await createContact(newContact);
      setNewContact({ name: "", email: "", message: "" });
      loadContacts();
    } catch {
      setError("Failed to create contact");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      loadContacts();
    } catch {
      setError("Failed to delete contact");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Contacts Management</h2>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h3 className="font-semibold mb-2">Add New Contact</h3>
        <input
          className="border p-2 mr-2"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) =>
            setNewContact({ ...newContact, name: e.target.value })
          }
        />
        <input
          className="border p-2 mr-2"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) =>
            setNewContact({ ...newContact, email: e.target.value })
          }
        />
        <input
          className="border p-2 mr-2"
          placeholder="Message"
          value={newContact.message}
          onChange={(e) =>
            setNewContact({ ...newContact, message: e.target.value })
          }
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Add
        </button>
      </div>
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
                <th className="text-left">Email</th>
                <th className="text-left">Message</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.message}</td>
                  <td>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(contact.id)}
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

export default AdminContacts;
