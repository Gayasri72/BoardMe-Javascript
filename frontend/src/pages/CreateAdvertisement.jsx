import { Button, TextInput, Alert } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useSelector } from 'react-redux';

export default function Createadvertisement() {
    const [file, setFile] = useState(null);
    const {currentUser} = useSelector((state) => state.user)
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(currentUser);
        setFormData({ ...formData, userId: currentUser?._id })
    },[])

    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // /api/Advertisement/create
        try {
            // const res = await fetch('', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // });
            // const data = await res.json();
            const res = await axios.post(`http://localhost:3000/api/Advertisement/create`, formData);
            console.log(res);
            // if (!res?.ok) {
            //     setPublishError(data.message);
            //     return;
            // }
            if (res.status === 201) {
                alert('success')
                setPublishError(null);
                navigate(`/services`);
            }
        } catch (error) {
            setPublishError(error?.response?.data?.message);
        }
    };

    return (
        <>
            <div className='p-3 max-auto min-h-screen bg-slate-100'>
                <h1 className="text-center text-3xl my-7 font-semibold">Create an Advertisement</h1>
                <form className="flex flex-col gap-4  w-2/3 mx-auto bg-white p-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 sm:flex-row justify-between">
                        <TextInput
                            type='text'
                            placeholder='Title'
                            required
                            id='title'
                            className='flex-1'
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        <select
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="uncategorized">Select a category</option>
                            <option value="product">Product</option>
                            <option value="service">Service</option>
                            <option value="food">Food</option>
                            <option value="space">Space</option>
                        </select>
                    </div>
                    <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                        <input
                            type='file'
                            accept='image/*'
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <Button
                            type='button'
                            gradientDuoTone='purpleToBlue'
                            size='sm'
                            outline
                            onClick={handleUploadImage}
                            disabled={imageUploadProgress}
                        >
                            {imageUploadProgress ? (
                                <div className="w-16 h-16">
                                    <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                                </div>
                            ) : (
                                'Upload Image'
                            )}
                        </Button>
                    </div>
                    {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                    {formData.image && (
                        <img
                            src={formData.image}
                            alt='upload'
                            className='w-full h-72 object-cover'
                        />
                    )}
                    <ReactQuill
                        theme="snow"
                        placeholder='Write something.....'
                        className='h-72 mb-12'
                        required
                        onChange={(value) => setFormData({ ...formData, content: value })}
                    />
                    <Button type='submit' gradientDuoTone='purpleToPink'>
                        Publish
                    </Button>
                    {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
                </form>
            </div>
        </>
    );
}
