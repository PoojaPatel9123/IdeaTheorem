import React, { Fragment, useState } from 'react';
import { useFormik, FormikProvider } from 'formik';
import {
    Paper,
    Box,
    Grid,
    TextField,
    Typography,
    Button,
    MenuItem,
    Alert
} from "@mui/material/";
import * as Yup from 'yup';
import axios from 'axios';

const RegistrationForm = () => {
    const [alert, setAlert] = useState({});

    const initialValues = {
        full_name: '',
        contact_number: '',
        email: '',
        day: '',
        month: '',
        year: '',
        password: '',
        confirm_password: '',
    };
    
    // validation rules for form fields
    const validationSchema = Yup.object({
        full_name: Yup.string()
            .required('Full Name is required')
            .matches(/^[a-zA-Z ]*$/, 'Full name must contain only alphabets and spaces'),
        contact_number: Yup.string()
            .required('Contact number is required')
            .matches(
                /^(\+?1)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
                'Invalid Canadian phone number format'
            ),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        day: Yup.date().required('Birthdate is required'),
        month: Yup.date().required('Birth month is required'),
        year: Yup.date().required('Birth year is required'),
        password: Yup.string()
            .required('Password is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
            ),
        confirm_password: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    //function to handle form submit event
    const onSubmit = async (e) => {
        const formData = {
          ...e,
            date_of_birth: e.day + '-' + e.month + '-' + e.year
        }
        try {
            const response = await axios.post('https://fullstack-test-navy.vercel.app/api/users/create', formData);
            setAlert({ type: 'success', message: response.data.description });
            onReset();
            setTimeout(()=>{
                setAlert({})
            },1000)
            
        } catch (error) {
            console.log(error)
            setAlert({ type: 'error', message: error.response.data.description });
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    //function to reset form
    const onReset = () => {
        formik.resetForm();
    }
    
    //utility function to create range array
    const range = (start, end, step = 1) => {
        let output = [];
        if (typeof end === 'undefined') {
            end = start;
            start = 0;
        }
        for (let i = start; i <= end; i += step) {
            output.push(i);
        }
        return output;
    };

    const days = range(1, 31);
    const months = range(1, 12);
    const years = range(1924, 2023);

    //function to handle date change
    const onDayChange = (event) => {
        formik.setFieldValue('day', event.target.value)
    };

    //function to handle month change
    const onMonthChange = (event) => {
        formik.setFieldValue('month', event.target.value)
    };

    //function to handle year change
    const onYearChange = (event) => {
        formik.setFieldValue('year', event.target.value)
    };

    return (
        <Fragment>
            <Typography variant="h6" align="left" margin="dense">
                Create User Account
            </Typography>
            <Paper elevation={3}>
                <Box
                    px={3}
                    py={2}
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                    }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <FormikProvider value={formik}>

                        {alert.message && (
                            <Alert severity={alert.type}>{alert.message}</Alert>
                        )}
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container
                                spacing={1}
                                justifyContent="center">
                                <Grid item xs={12} sm={12}>
                                    <Typography m={1}>Full Name</Typography>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        id="full_name"
                                        label="Full Name"
                                        variant="outlined"
                                        value={formik.values.full_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                                        helperText={formik.touched.full_name && formik.errors.full_name} />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography m={1}>Contact Number</Typography>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        id="contact_number"
                                        label="Contact Number"
                                        variant="outlined"
                                        value={formik.values.contact_number}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.contact_number && Boolean(formik.errors.contact_number)}
                                        helperText={formik.touched.contact_number && formik.errors.contact_number} />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography m={1}>Email</Typography>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        id="email"
                                        label="Email"
                                        variant="outlined"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email} />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography m={1}>Birth Date</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        id="outlined-select-currency"
                                        select
                                        label="Day"
                                        onChange={onDayChange}
                                        error={formik.touched.day && Boolean(formik.errors.day)}
                                        helperText={formik.touched.day && formik.errors.day}
                                        defaultValue=""
                                        value={formik.values.day}
                                    >
                                        {days.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        id="outlined-select-currency"
                                        select
                                        label="Month"
                                        onChange={onMonthChange}
                                        error={formik.touched.month && Boolean(formik.errors.month)}
                                        helperText={formik.touched.month && formik.errors.month}
                                        defaultValue=""
                                        value={formik.values.month}
                                    >
                                        {months.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        id="outlined-select-currency"
                                        select
                                        label="Year"
                                        onChange={onYearChange}
                                        error={formik.touched.year && Boolean(formik.errors.year)}
                                        helperText={formik.touched.year && formik.errors.year}
                                        defaultValue=""
                                        value={formik.values.year}
                                    >
                                        {years.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography m={1}>Password</Typography>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        id="password"
                                        label="Password"
                                        variant="outlined"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password} />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography m={1}>Confirm Password</Typography>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        id="confirm_password"
                                        label="Confirm Password"
                                        variant="outlined"
                                        value={formik.values.confirm_password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                                        helperText={formik.touched.confirm_password && formik.errors.confirm_password} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Button fullWidth type="Button" variant="outlined" onClick={onReset}>Cancel</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button fullWidth type="submit" variant="contained">Submit</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </FormikProvider>
                </Box>
            </Paper>
        </Fragment>

    );
};

export default RegistrationForm;
