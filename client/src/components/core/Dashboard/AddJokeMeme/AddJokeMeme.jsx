import React, { useState } from 'react'
import { AddHindiJoke } from './AddHindiJoke'
import { AddMeme } from './AddMeme';
import { AddEnglishJoke } from './AddEnglishJoke';

export const AddJokeMeme = () => {

    const [selectedComponent, setSelectedComponent] = useState("Hindi");

    const renderComponent = (componentName) => {
        setSelectedComponent(componentName);
    };

    return (
        <div className='pl-4 '>
            <div className='text-3xl font-bold mb-2'>
                Add Joke/Meme
            </div>
            <div className='flex flex-row space-x-4'>
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
            <div className='mt-4'>
                {/* Conditionally render based on selectedComponent state */}
                {selectedComponent === 'Hindi' && <AddHindiJoke />}
                {selectedComponent === 'English' && <AddEnglishJoke />}
                {selectedComponent === 'Meme' && <AddMeme />}
            </div>
        </div>
    )
}
