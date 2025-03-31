import React, { useState } from 'react';

import { HindiCard } from './HindiCard';
import { EnglishCard } from './EnglishCard';
import { MemeCard } from './MemeCard';

export const CardSection = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleGenerateAll = () => {
        // Increment refreshKey to force re-render
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <div className='flex flex-col mt-10'>
            <div className='flex flex-row justify-evenly'>
                <HindiCard key={refreshKey + '-hindi'} />
                <EnglishCard key={refreshKey + '-english'} />
                <MemeCard key={refreshKey + '-meme'} />
            </div>

            <button
                onClick={handleGenerateAll}
                className='new-gradient mx-auto w-7/12 my-8 h-14 font-sans text-4xl py-2 font-bold tracking-widest rounded-full text-lime-200'>
                Generate All
            </button>
        </div>
    );
}
