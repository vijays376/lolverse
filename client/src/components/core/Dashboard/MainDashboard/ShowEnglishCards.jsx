import React from 'react'

import { englishjoke } from '../../../../data/englishjoke'
import { TrimEnglishJoke } from './TrimEnglishJoke'

export const ShowEnglishCards = () => {

  const { data } = englishjoke


  return (
    <div className='grid grid-cols-4'>
      {
        data.map((content, index) => {
          return (
            <div
              key={index}
              className='mb-10 mx-4'>
              <TrimEnglishJoke englishText={content.englishJokeContent} />
            </div>
          )
        })
      }
    </div>
  )
}
