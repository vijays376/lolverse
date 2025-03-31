import React from 'react'

import ThinkEmoji from './ThinkEmoji'
import LaughEmoji from './LaughEmoji'


export const AnimatedEmoji = () => {
  return (
    <div className='flex flex-row space-x-3'>
      <div className='flex flex-row w-24'>
        <div className='mt-[2px] cursor-pointer'>
          <LaughEmoji />
        </div>
        <div className='w-2/6 text-3xl my-5 ml-2'>
          0
        </div>
      </div>
      <div className='flex flex-row w-[92px]'>
        <div className='mt-[4px] cursor-pointer'>
          <ThinkEmoji />
        </div>
        <div className='w-2/6 text-3xl my-5 ml-2'>
          0
        </div>
      </div>
    </div>
  )
}















// import React from 'react'

// import laughing from "../../../assets/videos/laughing.webm"
// import thinking from "../../../assets/videos/thinking.webm"

// export const AnimatedEmoji = () => {
//   return (
//     <div className='flex flex-row space-x-3'>
//       <div className='flex flex-row w-24'>
//         <video
//           className="w-4/6 ml-1"
//           muted
//           loop
//           autoPlay
//         >
//           <source src={laughing} type="video/webm" />
//         </video>
//         <div className='w-2/6 text-3xl my-5 ml-2'>
//           0
//         </div>
//       </div>
//       <div className='flex flex-row w-24'>
//         <video
//           className="w-4/6 ml-1"
//           muted
//           loop
//           autoPlay
//         >
//           <source src={thinking} type="video/webm" />
//         </video>
//         <div className='w-2/6 text-3xl my-5 ml-2'>
//           0
//         </div>
//       </div>
//     </div>
//   )
// }
