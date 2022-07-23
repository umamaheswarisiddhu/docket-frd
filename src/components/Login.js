import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate: (values) => {
            const errors = {}
            if (!values.username) {
                errors.username = "Email Missing";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
                errors.username = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = "Password  missing";
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
              let loginData = await axios.post('https://newtodo-project.herokuapp.com/login', values);
              window.localStorage.setItem('myapptoken', loginData.data.token);
              {loginData.data.message==="login successfully"? navigate('/todo'):alert("Does not match")}
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
                        <h1 className="text-center login-head">Docket App</h1>
                    </div>
                    <div className="mt-5 login-border">
                        <form className="m-5" onSubmit={formik.handleSubmit}>
                            <div class="row login-details">
                                <div class="col">
                                    <span style={{ color: "red" }}>{formik.errors.username}</span>
                                    <input type="email" class="form-control" name="username" placeholder="Email" onChange={formik.handleChange} value={formik.values.username} />
                                </div>
                                <div class="col mt-4">
                                    <span style={{ color: "red" }}>{formik.errors.password}</span>
                                    <input type="password" class="form-control" name="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} />
                                </div>
                                <div class="col mt-4">

                                    <input type="submit" class="form-control btn btn-warning" value={"Login"} />

                                </div>
                                <div class="col mt-4 mb-2">
                                    <p className="text-center text-white">------create account?------</p>
                                    <Link to={'/register'}>
                                        <input type="submit" class="form-control btn btn-secondary" value={"SignUp"} />
                                    </Link>
                                </div>
                                <div className='text-white'>
                                    email : test@gmail.com <br/>
                                    password : 12345678
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

export default Login