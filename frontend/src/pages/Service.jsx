import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
//import CallToAction from '../components/CallToAction';
// import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import AdvertisementCard from '../components/AdvertisementCard';
import axios from 'axios';

export default function Services() {
  const { AdvertisementSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentAdvertisements, setRecentAdverticements] = useState([]);
  const [ad, setAd] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/Advertisement/getAdvertisements?slug=${AdvertisementSlug || ''}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.Advertisements[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [AdvertisementSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await axios.get('http://localhost:3000/api/Advertisement/search');
        console.log(res.data);
        setRecentAdverticements(res.data?.advertisements);

      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {ad && ad?.title}
      </h1>
      <Link
        to={`/search?category=${ad && ad?.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {ad && ad?.category}
        </Button>
      </Link>
      <img
        src={ad && ad?.image}
        alt={ad && ad?.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{ad && new Date(ad?.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {ad && (ad?.content?.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: ad && ad?.content }}
      ></div>
      <div className='max-w-4xl mx-auto w-full'>
        {/* <CallToAction /> */}
      </div>
      {/* <CommentSection AdvertisementId={Advertisement._id} /> */}

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent ads</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentAdvertisements &&
            recentAdvertisements.map((advertisement) => <AdvertisementCard key={ad?._id} Advertisement={advertisement} />)}
        </div>
      </div>
    </main>
  );
}
