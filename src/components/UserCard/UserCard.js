import React from 'react';
import './UserCard.css';
import { Link,useNavigate  } from 'react-router-dom';

// Font Awesome Icons (make sure to install or include in HTML)
import { FaEnvelope, FaPhone, FaBuilding, FaTrash, FaInfoCircle } from 'react-icons/fa';

const UserCard = ({ user, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/user/${user._id}`);
  };
  return (
    <div className="user-card" onClick={handleCardClick}>
      <h3 className="user-name">{user.name}</h3>
      <p className="user-info">
        <FaEnvelope className="icon" /> {user.email}
      </p>
      <p className="user-info">
        <FaPhone className="icon" /> {user.phone}
      </p>
      <p className="user-info company-highlight">
        <FaBuilding className="icon" /> {user.company}
      </p>
      <div className="user-card-actions">
        <Link to={`/user/${user._id}`} className="details-btn">
          <FaInfoCircle className="icon-btn" /> View Details
        </Link>
        <button onClick={() => onDelete(user._id)} className="delete-btn">
          <FaTrash className="icon-btn" /> Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
