import axios from 'axios'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { Alert, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import ReactQuill from 'react-quill'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { app } from 'E:/BoardMe-Javascript/frontend/src/firebase.js'

const MyAds = () => {
    const [myAds, setAds] = useState([])
    const { currentUser } = useSelector((state) => state.user)
    const [selectedAd, setSelectedAd] = useState({});
    const [isOpen, setOpen] = useState(false)

    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();


    const getAds = async () => {
        try {
            const resp = await axios.get(`http://localhost:3000/api/Advertisement/getAdvertisements?userId=${currentUser?._id}`)
            console.log(resp.data);
            setAds(resp?.data?.advertisements)
        } catch (error) {
            console.log(error);
        }
    }

    const getAllAds = async () => {
        try {
            const resp = await axios.get(`http://localhost:3000/api/Advertisement/getAdvertisements/search`)
            console.log(resp.data);
            setAds(resp?.data?.advertisements)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAdd = async (id) => {
        try {
            const resp = await axios.delete(`http://localhost:3000/api/Advertisement/deleteAdvertisement/${id}`)
            console.log(resp.data);
            alert('deleted')
            getAds()
        } catch (error) {
            console.log(error);
        }
    }
    const updateAdd = async (id) => {
        try {
            const resp = await axios.put(`http://localhost:3000/api/Advertisement/updateAdvertisement/${selectedAd?._id}`, selectedAd)
            console.log(resp.data);
            alert('updated')
            getAds()
            setOpen(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAds()
    }, [])

    const handleSelect = (ad) => {
        setSelectedAd(ad);
        setOpen(true)
    }
    const handleUpChange = (e) => {
        setSelectedAd((prev) => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

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
                        console.log(downloadURL);
                        setSelectedAd((prev) => (
                            {
                                ...prev,
                                image: downloadURL
                            }
                        ))
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.log(error);
        }
    };
    return (
        <div className='px-5'>
            <h1 className='text-black bg-purple-400 px-4 py-2 w-max rounded-xl ml-5 text-2xl font-extrabold my-5'>My Ads</h1>
            <div>
                {
                    myAds.map((ad) => (
                        <>
                            <div className={`flex items-stretch gap-3 p-10 bg-gray-200 rounded-xl  w-1/2 mx-auto`}>
                                <div className='w-1/3 aspect-square'>
                                    <img src={ad.image} className='w-full h-full object-cover' />
                                </div>
                                <div className='bg-white p-3 h-52 w-full'>
                                    <h2 className='text-2xl font-semibold capitalize mb-4'>{ad.title}</h2>
                                    <div dangerouslySetInnerHTML={{ __html: ad.content }} />
                                </div>

                            </div>
                            <div className=' w-1/2 mx-auto flex flex-col space-y-3 my-4 text-right justify-end items-end'>
                                <button className='px-4 py-2 text-white bg-green-500 w-32' onClick={() => handleSelect(ad)}>Update</button>
                                <button className='px-4 py-2 text-white bg-red-500  w-32' onClick={() => deleteAdd(ad._id)}>Delete</button>
                            </div>
                        </>
                    ))
                }
            </div>
            {


                isOpen && <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-10 shadow-xl border z-50 h-[80vh] overflow-scroll'>
                    <div className='flex items-center justify-end'>
                        <button className='text-2xl font-semibold' onClick={() => setOpen(false)}>X</button>
                    </div>

                    <div className='flex items-center justify-start gap-3'>
                        <span>Title</span>
                        <input type="text" value={selectedAd?.title} name='title' onChange={handleUpChange} />
                    </div>
                    <br />
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
                    {selectedAd.image && (
                        <img
                            src={selectedAd.image}
                            alt='upload'
                            className='w-full h-72 object-cover'
                        />
                    )}
                    <ReactQuill
                        theme="snow"
                        placeholder='Write something.....'
                        className='h-72 mb-12'
                        required

                        value={selectedAd?.content}
                        onChange={(value) => setSelectedAd((prev) => (
                            {
                                ...prev,
                                content: value
                            }
                        ))}
                    />

                    <div className='flex items-center w-full'>
                        <button onClick={updateAdd} className='px-4 py-2 bg-green-300'>Update</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default MyAds