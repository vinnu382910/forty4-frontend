// src/pages/UserDetails.js
import React, { useState, useEffect, useContext } from 'react';
import './UserDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { getUserById, updateUser, deleteUser as deleteUserApi } from '../../api/userApi';
import Loading from '../../components/Loading/Loading';
import UserForm from '../../components/UserForm/UserForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../context/UserContext';
import { FaEnvelope, FaPhone, FaBuilding, FaMapMarkedAlt, FaGlobe, FaEdit, FaTrash} from 'react-icons/fa';

// Set the app element for accessibility
Modal.setAppElement('#root');

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { fetchUsers } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await getUserById(id);
      if (error) {
        toast.error(error);
        setUser(null);
      } else {
        setUser(data.data);
      }
      setLoading(false);
    };
    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      setLoading(true);
      const { error } = await deleteUserApi(id);
      if (error) {
        toast.error(error);
      } else {
        toast.success("User deleted successfully");
        await fetchUsers();
        navigate('/'); // Redirect after deletion
      }
    } catch (err) {
      toast.error("Unexpected error occurred while deleting user");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      setLoading(true);
      const { error } = await updateUser(id, formData);
      if (error) {
        toast.error(error);
      } else {
        toast.success("User updated successfully");
        setUser(formData);
        setModalIsOpen(false);
      }
    } catch (err) {
      toast.error("Unexpected error occurred while updating user");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (!user) return <div className="user-details"><p>User not found.</p></div>;

  return (
    <div className="user-details">
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> <FaEnvelope style={{ marginRight: '8px' }} /> <span className="highlight">{user.email}</span></p>
      <p><strong>Phone:</strong> <FaPhone style={{ marginRight: '8px' }} /> <span className="highlight">{user.phone}</span></p>
      <p><strong>Company:</strong> <FaBuilding style={{ marginRight: '8px' }} /> <span className="highlight">{user.company}</span></p>

      <h3>Address <FaMapMarkedAlt style={{ marginLeft: '5px' }} /></h3>
      <p>{user.address.street}, {user.address.city}, {user.address.zipcode}</p>

      <h3>Geo Location <FaGlobe style={{ marginLeft: '5px' }} /></h3>
      <p>Lat: {user.address.geo.lat}</p>
      <p>Lng: {user.address.geo.lng}</p>

      <div className="buttons">
        <button className='edit-btn' onClick={() => setModalIsOpen(true)}> <FaEdit className="icon-btn" /> Edit</button>
        <button className='delete-btn' onClick={handleDelete}> <FaTrash className="icon-btn" /> Delete</button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Edit User"
        className="modal"
        overlayClassName="overlay"
      >
        <button className="close-btn" onClick={() => setModalIsOpen(false)}>X</button>
        <h3> Edit User</h3>
        <UserForm initialData={user} onSubmit={handleUpdate} />
      </Modal>
    </div>
  );
};

export default UserDetails;
