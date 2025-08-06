import React, { useState } from 'react';
import { TextField, Button, MenuItem, Snackbar } from '@mui/material';
import axios from 'axios';

const propertyTypes = ['Apartment', 'Plot', 'Commercial', 'Villa', 'Farmhouse'];

export default function OnboardingForm() {
  const [fields, setFields] = useState({
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    propertyType: '',
    budget: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState(false);

  const validate = () => {
    let errs = {};
    if (!/^\d{10}$/.test(fields.mobile)) errs.mobile = 'Enter valid Indian mobile number';
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(fields.email)) errs.email = 'Enter valid email';
    Object.entries(fields).forEach(([k, v]) => { if (!v) errs[k] = 'Required'; });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => setFields({ ...fields, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/submit`, fields);
      setSnackbar(true);
      setFields({
        fullName: '',
        mobile: '',
        email: '',
        city: '',
        propertyType: '',
        budget: '',
        message: ''
      });
    } catch (err) {
      alert('Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {['fullName', 'mobile', 'email', 'city', 'budget', 'message'].map(field => (
        <TextField
          key={field}
          name={field}
          label={field.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
          value={fields[field]}
          onChange={handleChange}
          error={!!errors[field]}
          helperText={errors[field]}
          required
        />
      ))}
      <TextField
        select
        name="propertyType"
        label="Type of Property"
        value={fields.propertyType}
        onChange={handleChange}
        error={!!errors.propertyType}
        helperText={errors.propertyType}
        required
      >
        {propertyTypes.map(pt => (<MenuItem key={pt} value={pt}>{pt}</MenuItem>))}
      </TextField>
      <Button type="submit" variant="contained">Submit</Button>
      <Snackbar
        open={snackbar}
        onClose={() => setSnackbar(false)}
        message="Thanks for registering! We will contact you soon."
        autoHideDuration={4000}
      />
    </form>
  );
}
