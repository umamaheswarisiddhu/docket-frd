import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            mobile: 0,
            password: '',
        },
        validate: (values) => {
            const errors = {}
            if (!values.name) {
                errors.name = "Required";
            }
            if (!values.email) {
                errors.email = "Email Missing";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = "Password  missing";
            }
            if (!values.mobile) {
                errors.mobile = "Required";
            } else if (values.mobile.length < 10) {
                errors.mobile = "Must contain 10 digits"
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                let signupData = await axios.post('https://newtodo-project.herokuapp.com/signup', values);
                if (signupData.data.message === "user added sucessfully") {
                    navigate('/');
                    alert("Successfully Registerd ")
                } else {
                    alert("Already email exist & please use another email id")
                }

            } catch (error) {
                console.log(error);
                alert('Something went wrong');
            }
        },
    })
    return (
        <div className="container-fluid bg">
            <div className="row">
                <div className="col login">
                    <div className="mt-2">
                        <h1 className="text-center login-head">Join us</h1>
                    </div>
                    <div className="mt-5 login-border">
                        <form className="m-5" onSubmit={formik.handleSubmit}>
                            <div class="row login-details">
                                <div class="col mt-4">
                                    <span style={{ color: "red" }}>{formik.errors.name}</span>
                                    <input type="text" class="form-control" name="name" placeholder="Name" onChange={formik.handleChange} value={formik.values.name} />
                                </div>
                                <div class="col mt-4">
                                    <span style={{ color: "red" }}>{formik.errors.mobile}</span>
                                    <input type="tel" class="form-control"  name="mobile" placeholder="91XXXXXXXXX" onChange={formik.handleChange} value={formik.values.mobile} />
                                </div>
                                <div class="col mt-4">
                                    <span style={{ color: "red" }}>{formik.errors.email}</span>
                                    <input type="email" class="form-control" name="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} />
                                </div>
                                <div class="col mt-4">
                                    <span style={{ color: "red" }}>{formik.errors.password}</span>
                                    <input type="password" class="form-control" name="password" placeholder="Create Password" onChange={formik.handleChange} value={formik.values.password} />
                                </div>
                                <div class="col mt-4">
                                    <input type="submit" class="form-control btn btn-warning" value={"Create Account"} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="mt-3 text-white text-center created">
                        Simple Todo Created by <span className="bg-danger by"> Uma </span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register