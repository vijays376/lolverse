import React, { useState } from 'react'

import { UserDetails } from '../../../common/UserDetails'
import { ShowHindiCards } from "./ShowHindiCards"
import { ShowEnglishCards } from './ShowEnglishCards';
import { ShowMemeCards } from "./ShowMemeCards"

export const MainDashboard = () => {

  const [selectedComponent, setSelectedComponent] = useState("Hindi");

  const renderComponent = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (
    <div className='pl-4 '>
      <div className='text-3xl font-bold mb-2'>
        Dashboard
      </div>

      <UserDetails />

      <div className='flex flex-row space-x-4 mt-5 -ml-60'>
        <div>
          <button className='new-gradient font-bold text-xl text-lime-300 rounded-full h-9  mt-1 py-1 px-2'
            onClick={() => renderComponent('Hindi')}
          >
            Hindi Joke
          </button>
        </div>
        <div>
          <button className='new-gradient font-bold text-xl text-lime-300 rounded-full h-9  mt-1 py-1 px-2'
            onClick={() => renderComponent('English')}
          >
            English Joke
          </button>
        </div>
        <div>
          <button className='new-gradient font-bold text-xl text-lime-300 rounded-full h-9  mt-1 py-1 px-2'
            onClick={() => renderComponent('Meme')}
          >
            Meme
          </button>
        </div>
      </div>
      <div className='mt-4 -ml-64'>
        {/* Conditionally render based on selectedComponent state */}
        {selectedComponent === 'Hindi' && <ShowHindiCards />}
        {selectedComponent === 'English' && <ShowEnglishCards />}
        {selectedComponent === 'Meme' && <ShowMemeCards />}
      </div>
    </div>
  )
}
