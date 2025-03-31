import React from 'react'

import { hindijoke } from '../../../../data/hindijoke'
import { TrimHindiJoke } from './TrimHindiJoke'

export const ShowHindiCards = () => {

  const { data } = hindijoke


  return (
    <div className='grid grid-cols-4'>
      {
        data.map((content, index) => {
          return (
            <div
              key={index}
              className='mb-10 mx-4'>
              <TrimHindiJoke hindiText={content.hindiJokeContent} />
            </div>
          )
        })
      }
    </div>
  )
}
