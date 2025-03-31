import React from 'react'

import { meme } from '../../../../data/meme'
import { MemeCard } from './MemeCard'

export const ShowMemeCards = () => {

  const { data } = meme


  return (
    <div className='grid grid-cols-4'>
      {
        data.map((content, index) => {
          return (
            <div
              key={index}
              className='mb-10 mx-4'>
              <MemeCard memeimageurl={content.memeimageurl} />
            </div>
          )
        })
      }
    </div>
  )
}
