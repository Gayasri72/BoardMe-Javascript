import React from 'react'

const PostCard = ({post}) => {
  return (
    <div className='flex items-stretch gap-3 p-10 bg-gray-200 rounded-xl w-1/2 mx-auto'>
    <div className='w-1/3 aspect-square'>
        <img src={post.image} className='w-full h-full object-cover' />
    </div>
    <div className='bg-white p-3 h-full w-full'>
        <h2 className='text-2xl font-semibold capitalize mb-4'>{post.title}</h2>
        <div dangerouslySetInnerHTML={{ __html:post.content}} />
    </div>

</div>
  )
}

export default PostCard