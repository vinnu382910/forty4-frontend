// src/pages/Dashboard.js
import React, { useContext, useState } from 'react';
import './Dashboard.css';
import Modal from 'react-modal';
import { UserContext } from '../../context/UserContext';
import UserCard from '../../components/UserCard/UserCard';
import UserForm from '../../components/UserForm/UserForm';
import { deleteUser as deleteUserApi, createUser as createUserApi } from '../../api/userApi';
import Loading from '../../components/Loading/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Set root element for accessibility
Modal.setAppElement('#root');

const Dashboard = () => {
  const { users, loading: usersLoading, fetchUsers } = useContext(UserContext);
  const [actionLoading, setActionLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      setActionLoading(true);
      const { error } = await deleteUserApi(id);
      if (error) {
        toast.error(error);
      } else {
        toast.success('User deleted successfully');
        await fetchUsers();
      }
    } catch (err) {
      toast.error("Unexpected error occurred while deleting user");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Create new user
  const handleCreate = async (userData) => {
    try {
      setActionLoading(true);
      const { error } = await createUserApi(userData);
      if (error) {
        toast.error(error);
      } else {
        toast.success('User created successfully');
        await fetchUsers();
        setModalIsOpen(false);
      }
    } catch (err) {
      toast.error("Unexpected error occurred while creating user");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="heading-container">
        <div>
          <h2 className='dashboard-title'>User Management</h2>
          <p>Manage your users efficiently with our comprehensive dashboard</p>
        </div>
        <button className="add-user-btn" onClick={() => setModalIsOpen(true)}>Add User</button>
      </div>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {usersLoading || actionLoading ? (
        <Loading />
      ) : filteredUsers.length > 0 ? (
        <div className="user-list">
          {filteredUsers.map((user) => (
            <UserCard key={user._id} user={user} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}

      {/* Modal for adding user */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add User"
        className="modal"
        overlayClassName="overlay"
      >
        <button className="close-btn" onClick={() => setModalIsOpen(false)}>X</button>
        <h3>Add New User</h3>
        <UserForm onSubmit={handleCreate} />
      </Modal>
    </div>
  );
};

export default Dashboard;
