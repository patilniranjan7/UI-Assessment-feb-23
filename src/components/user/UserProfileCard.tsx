import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { Person } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";

function UserProfileCard() {
  const [loading, setLoading] = useState(false);
  const { values, touched, errors, handleBlur, submitForm, setFieldValue } =
    useFormik({
      initialValues: {
        customerName: "",
        dateOfBirth: "",
        email: "",
        address: "",
        contact: "",
        altContact: "",
      },
      onSubmit: () => {
        // push data to api
      },
    });

  const fetchCustomers = async () => {
    setLoading(true);
    const response = await fetch("/api/customer");
    const { customers } = await response.json();
    const data = customers?.length ? customers[0] : {};
    setFieldValue("customerName", data?.customerName);
    setFieldValue("dateOfBirth", data?.dateOfBirth);
    setFieldValue("email", data?.email);
    setFieldValue("address", data?.address);
    setFieldValue("contact", data?.contact);
    setFieldValue("altContact", data?.altContact);
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <Grid
      xs={12}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid
        container
        xs={11}
        sm={10}
        md={8}
        lg={6}
        className="user-profile-card"
      >
        <Box className="header">
          <div className="section">
            <h3>Customer Details</h3>
            <Person />
          </div>
          <Button onClick={submitForm} className="user-profile-edit-btn">
            Edit
          </Button>
        </Box>
        {loading ? (
          <Grid container className="user-profile-view">
            <CircularProgress size={24} />
          </Grid>
        ) : (
          <Grid container className="inputs">
            <Grid item xs={12} md={4}>
              <TextField
                id="standard-required"
                label="Customer Name"
                variant="outlined"
                value={values.customerName}
                onChange={(e) => setFieldValue("customerName", e.target.value)}
                onBlur={handleBlur}
                error={!!(touched.customerName && errors.customerName)}
              />
              <TextField
                id="standard-required"
                label="Date of Birth"
                variant="outlined"
                value={values.dateOfBirth}
                onChange={(e) => setFieldValue("dateOfBirth", e.target.value)}
                onBlur={handleBlur}
                error={!!(touched.dateOfBirth && errors.dateOfBirth)}
              />
              <TextField
                id="standard-required"
                label="Email Address"
                variant="outlined"
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
                onBlur={handleBlur}
                error={!!(touched.email && errors.email)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <textarea
                className="textarea"
                placeholder="Address"
                rows={6}
                value={values.address}
                onChange={(e) => setFieldValue("address", e.target.value)}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="standard-required"
                label="Telephone Number"
                variant="outlined"
                value={values.contact}
                onChange={(e) => setFieldValue("contact", e.target.value)}
                onBlur={handleBlur}
                error={!!(touched.contact && errors.contact)}
              />
              <TextField
                id="standard-required"
                label="Alt Telephone Number"
                variant="outlined"
                value={values.altContact}
                onChange={(e) => setFieldValue("altContact", e.target.value)}
                onBlur={handleBlur}
                error={!!(touched.altContact && errors.altContact)}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
export default UserProfileCard;
