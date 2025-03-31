import React from 'react'

import Spinner from "../../common/Spinner"
import { useMeme } from '../../../hooks/useMeme'
import { Meme } from './Meme'

export const MemeCard = () => {

    const { loading, memeContent, fetchData } = useMeme()
    const memeUrl = memeContent.url
    console.log(memeUrl);

    return (
        <div>
            <div className='title mb-4'>
                <div>
                    Memes
                </div>
            </div>
            <div>
                {
                    loading ? <Spinner /> : <Meme memeUrl={memeUrl} />
                }
            </div>
            <div>
                <button className='new-gradient text-center font-bold text-3xl text-lime-300 rounded-full h-12 ml-14 mt-8 p-1 w-60'
                    onClick={() => fetchData()}>
                    New
                </button>
            </div>
        </div>
    )
}

// <Meme memeUrl={memeUrl} />




//   memeContent.length > 0 ?
//     (
//       <div>
//         {
//           memeContent.map((meme) => (
//             <Meme key={meme.id} meme={meme} />
//           ))
//         }
//       </div>
//     ) :
//     <div>
//       No data Found
//     </div>