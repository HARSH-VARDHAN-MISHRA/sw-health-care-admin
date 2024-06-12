import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBanner = () => {
    const { id } = useParams();

    const [formData, setData] = useState({
        title: '',
        bannerImage: null,
        active: false,
        previewImage: null // State to hold the preview image
        
    });

    const [loading, setLoading] = useState(true); // Add loading state
    const [btnLoading, setBtnLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setData({
                ...formData,
                [name]: checked
            });
        } else if (type === 'file') {
            const file = files[0];
            setData({
                ...formData,
                [name]: file,
                previewImage: URL.createObjectURL(file) // Set preview image URL
            });
        } else {
            setData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleFetch = async () => {
        try {
            const res = await axios.get(`https://sw-health-care-backend.onrender.com/api/v1/get-all-main-banner`);
            const category = res.data.data;
            const filterData = category.filter((item) => item._id === id);
            if (filterData.length > 0) {
                setData({
                    title: filterData[0].title,
                    bannerImage: null, // We don't set the image here since we can't preview it from a URL
                    active: filterData[0].active,
                    previewImage: filterData[0].bannerImage // Set the existing image URL for preview
                });
            }
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error('Error fetching Banner:', error);
            setLoading(false); // Set loading to false even if there's an error
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setBtnLoading(true)
        const data = new FormData();
        data.append('title', formData.title);
        if (formData.bannerImage) {
            data.append('bannerImage', formData.bannerImage);
        }
        data.append('active', formData.active);

        try {
            const response = await axios.put(`https://sw-health-care-backend.onrender.com/api/v1/update-main-banner/${id}`, data);
            toast.success("Banner Updated Successfully!");
            setBtnLoading(false);
            window.location.href = '/all-banners';
        } catch (error) {
            setBtnLoading(false)
            console.error('Error updating Banner:', error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    useEffect(() => {
        handleFetch();
    }, [id]);

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Banner</h4>
                </div>
                <div className="links">
                    <Link to="/all-banners" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-4">
                            <label htmlFor="title" className="form-label">Banner Name</label>
                            <input type="text" onChange={handleChange} name='title' value={formData.title} className="form-control" id="title" />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="bannerImage" className="form-label">Banner Image</label>
                            <input type="file" onChange={handleChange} name='bannerImage' className="form-control" id="bannerImage" />
                        </div>
                        {formData.previewImage && (
                            <div className="col-4">
                                <img src={formData.previewImage} alt="Category Preview" style={{ width: '100%', height: 'auto' }} />
                            </div>
                        )}
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" onChange={handleChange} type="checkbox" name="active" id="active" checked={formData.active} />
                                <label className="form-check-label" htmlFor="active">
                                    Active
                                </label>
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            {/* <button type="submit" className="">Update Category</button> */}
                            <button type="submit" className={`${btnLoading ? 'not-allowed':'allowed'}`} >{btnLoading ? "Please Wait.." : "Update Banner"} </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
};

export default EditBanner;
