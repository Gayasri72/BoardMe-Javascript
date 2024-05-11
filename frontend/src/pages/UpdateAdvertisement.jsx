import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

export default function UpdateAdvertisement() {
  const [files, setFiles] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { AdvertisementId } = useParams();

  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/Advertisement/getAdvertisement?AdvertisementId=${AdvertisementId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.Advertisement[0]);
        }
      }
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [AdvertisementId]);

  const handleUploadImage = async () => {
    try {
      if (!files) {
        setImageUploadError('please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + files.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, files);
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
    try {
      const res = await fetch(`/api/Advertisement/updateAdvertisement/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <>
      <div className='p-3 max-auto min-h-screen'>
        <h1 className="text-center text-3xl my-7 font-semibold">Update an advertisement</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type='text' placeholder='Title' required id='title' className='flex-1'
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              value={formData.title}
            />
            <Select onChange={(e) => setFormData({ ...formData, category: e.target.value })} value={formData.category}>
              <option value="uncategorized">Select a category</option>
              <option value="product">Product</option>
              <option value="service">Service</option>
              <option value="food">Food</option>
              <option value="space">Space</option>
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput type='file' accept='image/*' onChange={(e) => setFiles(e.target.files[0])} />
            <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage}
              disabled={imageUploadProgress}>
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0} %`} />
                </div>
              ) : 'Upload Image'}
            </Button>
          </div>
          {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
          {formData.image && <img src={formData.image} alt='upload' className='w-full h-72 object-cover' />}
          <ReactQuill
            theme="snow"
            value={formData.content}
            placeholder='Write something.....'
            className='h-72 mb-12'
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
          <Button type='submit' gradientDuoTone='purpleToPink'>Update Advertisement</Button>
          {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
        </form>
      </div>
    </>
  );
}
