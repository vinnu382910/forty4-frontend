// src/components/UserForm/UserForm.js
import React, { useState, useEffect } from 'react';
import './UserForm.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: { street: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        company: initialData.company || '',
        address: {
          street: initialData.address?.street || '',
          city: initialData.address?.city || '',
          zipcode: initialData.address?.zipcode || '',
          geo: {
            lat: initialData.address?.geo?.lat || '',
            lng: initialData.address?.geo?.lng || '',
          },
        },
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setForm((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
    } else if (name.startsWith('geo.')) {
      const key = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, geo: { ...prev.address.geo, [key]: value } },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

const validate = () => {
  const newErrors = {};

  if (!form.name.trim()) newErrors.name = 'Name is required';
  
  if (!form.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    newErrors.email = 'Email is invalid';
  }

  if (!form.phone.trim()) {
    newErrors.phone = 'Phone is required';
  } else if (!/^\d{10}$/.test(form.phone)) {
    newErrors.phone = 'Phone must be 10 digits';
  }

  if (!form.company.trim()) newErrors.company = 'Company is required';

  if (!form.address.street.trim()) newErrors['address.street'] = 'Street is required';
  if (!form.address.city.trim()) newErrors['address.city'] = 'City is required';
  if (!form.address.zipcode.trim()) {
    newErrors['address.zipcode'] = 'Zipcode is required';
  } else if (!/^\d{5,6}$/.test(form.address.zipcode)) {
    newErrors['address.zipcode'] = 'Zipcode is invalid';
  }

  if (!form.address.geo.lat.trim()) {
    newErrors['geo.lat'] = 'Latitude is required';
  } else if (isNaN(form.address.geo.lat)) {
    newErrors['geo.lat'] = 'Latitude must be a number';
  }

  if (!form.address.geo.lng.trim()) {
    newErrors['geo.lng'] = 'Longitude is required';
  } else if (isNaN(form.address.geo.lng)) {
    newErrors['geo.lng'] = 'Longitude must be a number';
  }

  return newErrors;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((msg) => toast.error(msg));
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await onSubmit(form);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      {errors.name && <p className="error">{errors.name}</p>}

      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      {errors.email && <p className="error">{errors.email}</p>}

      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <input name="company" value={form.company} onChange={handleChange} placeholder="Company" />

      <h4>Address</h4>
      <input name="address.street" value={form.address.street} onChange={handleChange} placeholder="Street" />
      <input name="address.city" value={form.address.city} onChange={handleChange} placeholder="City" />
      <input name="address.zipcode" value={form.address.zipcode} onChange={handleChange} placeholder="Zipcode" />

      <h4>Geo Location</h4>
      <input name="geo.lat" value={form.address.geo.lat} onChange={handleChange} placeholder="Latitude" />
      <input name="geo.lng" value={form.address.geo.lng} onChange={handleChange} placeholder="Longitude" />

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default UserForm;
