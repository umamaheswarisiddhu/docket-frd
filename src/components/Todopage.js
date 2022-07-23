import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Todopage() {
    const [list, setList] = useState([]);
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            list: '',
        },
        validate: (values) => {
            const errors = {}
            if (!values.list) {
                errors.list = "Required";
            }
            return errors;
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                    await axios.post('https://newtodo-project.herokuapp.com/createList', values, {
                    headers: {
                        Authorization: window.localStorage.getItem('myapptoken'),
                    },
                });
                fetchAll();
                resetForm({ values: '' });
            } catch (error) {
                alert('Something went wrong');
            }
        },
    });
    async function fetchAll() {
        try {
            let listData = await axios.get('https://newtodo-project.herokuapp.com/getList', {
                headers: {
                    Authorization: window.localStorage.getItem('myapptoken'),
                },
            });
            setList(listData.data);
        } catch (error) {
            alert('Something went wrong');
        }
    }

    useEffect(() => {
        fetchAll();
    }, []);



    let handleDelete = async (id) => {
        try {
            await axios.delete(`https://newtodo-project.herokuapp.com/deleteList/${id}`, {
                headers: {
                    Authorization: window.localStorage.getItem('myapptoken'),
                },
            });
            fetchAll();
        } catch (error) {
            alert('Something went wrong');
        }
    };

    let handleLogout = () => {
        window.localStorage.removeItem('myapptoken');
        navigate('/');
    };

    return (
        <div className="container-fluid todo-bg">
            <div className="container">
                <div className="todo-list">
                    <form className="list-action" onSubmit={formik.handleSubmit}>
                        <div className="d-flex justify-content-between">
                            <h1 className="heading mb-4">Todo List</h1>
                            <div className="logout">
                                <button onClick={handleLogout} className="btn btn-danger btn-sm">
                                    Logout
                                </button>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                            <input type="text" class="form-control col-sm-12 look" name="list" value={formik.values.list} onChange={formik.handleChange} placeholder="What to do?" />
                            <div>
                                <input type="submit" className="btn btn-primary" value="Add" />
                            </div>
                        </div>
                        <div className="list-content">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">List</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list.map((lists) => {
                                            return (
                                                <tr>
                                                    <td ><input type="checkbox" id="cbox" /><label for="cbox">{lists.list}</label></td>
                                                    <td>
                                                        <button 
                                                        onClick={() => handleDelete(lists._id)} 
                                                        className="btn btn-danger btn-sm ms-2" >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Todopage