import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import MainContext from '../../../context/context';
import './add.css';

const AddProduce = () => {
    const { data, setdata } = useContext(MainContext);
    const [singleFile, setSingleFile] = useState(null);
    const [multipleFiles, setMultipleFiles] = useState([]);

    return (
        <div>
            <h1 className='text-center'>Add Produce</h1>

            <h2 className='text-center'>Add Single Image</h2>
            <Formik
                initialValues={{ title: '', price: '', img: null }}
                validate={values => {
                    const errors = {};
                    if (!values.title) {
                        errors.title = 'Required';
                    }
                    if (!values.price) {
                        errors.price = 'Required';
                    }
                    if (!values.img) {
                        errors.img = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = new FormData();
                    formData.append('title', values.title);
                    formData.append('price', values.price);
                    formData.append('img', values.img);
                    
                    axios.post('http://localhost:8080/api/produce/single', formData)
                        .then((res) => {
                            setdata([...data, res.data]);
                            alert("Product Added Successfully");
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="inputs">
                            <div className="inp">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    placeholder='Title'
                                    name="title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                />
                                {errors.title && touched.title && <div>{errors.title}</div>}
                            </div>
                            <div className="inp">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder='Price'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price}
                                />
                                {errors.price && touched.price && <div>{errors.price}</div>}
                            </div>
                        </div> 
                        <label htmlFor="img">Attachment</label>
                        <input
                            placeholder='Choose Image'
                            type="file"
                            name="img"
                            onChange={(event) => {
                                const file = event.currentTarget.files[0];
                                setFieldValue("img", file);
                                setSingleFile({ name: file.name, size: file.size });
                            }}
                            onBlur={handleBlur}
                        />
                        {errors.img && touched.img && <div>{errors.img}</div>}
                        {singleFile && (
                            <div>Selected file: {singleFile.name} ({(singleFile.size / 1024).toFixed(2)} KB)</div>
                        )}
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>

            <h2 className='text-center'>Add Multiple Images</h2>
            <Formik
                initialValues={{ title: '', price: '', imgs: [] }}
                validate={values => {
                    const errors = {};
                    if (!values.title) {
                        errors.title = 'Required';
                    }
                    if (!values.price) {
                        errors.price = 'Required';
                    }
                    if (values.imgs.length === 0) {
                        errors.imgs = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = new FormData();
                    formData.append('title', values.title);
                    formData.append('price', values.price);
                    values.imgs.forEach(img => {
                        formData.append('imgs', img);
                    });
                    
                    axios.post('http://localhost:8080/api/produce/multiple', formData)
                        .then((res) => {
                            setdata([...data, res.data]);
                            alert("Product Added Successfully");
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="inputs">
                            <div className="inp">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    placeholder='Title'
                                    name="title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                />
                                {errors.title && touched.title && <div>{errors.title}</div>}
                            </div>
                            <div className="inp">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder='Price'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price}
                                />
                                {errors.price && touched.price && <div>{errors.price}</div>}
                            </div>
                        </div> 
                        <label htmlFor="imgs">Attachments</label>
                        <input
                            type="file"
                            name="imgs"
                            multiple
                            onChange={(event) => {
                                const files = Array.from(event.currentTarget.files);
                                setFieldValue("imgs", files);
                                setMultipleFiles(files.map(file => ({ name: file.name, size: file.size })));
                            }}
                            onBlur={handleBlur}
                        />
                        {errors.imgs && touched.imgs && <div>{errors.imgs}</div>}
                        <div>
                            {multipleFiles.length > 0 && (
                                <div>
                                    Selected files:
                                    <ul className='selected-files'>
                                        {multipleFiles.map((file, index) => (
                                            <li key={index}>{file.name} ({(file.size / 1024).toFixed(2)} KB)</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default AddProduce;
