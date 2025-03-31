import React from 'react'

import { BsCurrencyRupee } from "react-icons/bs";

export const PremiumDetails = () => {
  return (
    <div className='pl-4 flex flex-col'>
      <div className='mb-2 text-3xl font-bold'>
        Premium Details
      </div>

      <div className='flex flex-row'>
        <div className='text-7xl text-amber-400'>
          <BsCurrencyRupee />
        </div>
        <div className='text-[20px] font-bold p-1'>
          <p>
            You have a Pro Monthly Premium plan
          </p>
          <p>
            Expiring on 21 June 2025
          </p>
        </div>
      </div>

      <div>
        <div className='text-2xl font-semibold mb-1 mt-6'>
          Payment History
        </div>
        <div className='flex flex-row  border-blue-600 border-2  border-solid'>
          <div className='pl-2 pr-6 '>
            <p className='text-xl font-bold py-1 border-blue-300 border-b-2 '>
              Plan Details
            </p>
            <p className='text-lg font-semibold py-1 border-blue-300 border-b-2'>
              1 month Pro Premium Plan
            </p>
            <p className='text-lg font-semibold py-1 '>
              1 month Standard Premium Plan
            </p>
          </div>

          <div className=' border-blue-600 border-[1px] h-28'></div>

          <div className='pl-2 pr-6 '>
            <p className='text-xl font-bold py-1 border-blue-300 border-b-2'>
              Starting Date
            </p>
            <p className='text-lg font-semibold  py-1 border-blue-300 border-b-2'>
              21-05-2025
              10:45AM
            </p>
            <p className='text-lg font-semibold py-1'>
              11-03-2025
              11:20AM
            </p>
          </div>

          <div className=' border-blue-600 border-[1px] h-28'></div>

          <div className='pl-2 pr-6 '>
            <p className='text-xl font-bold py-1 border-blue-300 border-b-2'>
              Expiring Date
            </p>
            <p className='text-lg font-semibold py-1 border-blue-300 border-b-2'>
              21-06-2025
              10:45AM
            </p>
            <p className='text-lg font-semibold py-1'>
              11-04-2025
              11:20AM
            </p>
          </div>

          <div className=' border-blue-600 border-[1px] h-28'></div>

          <div className='pl-2 pr-6 '>
            <p className='text-xl font-bold  py-1 border-blue-300 border-b-2'>
              Amount
            </p>
            <p className='text-lg font-bold py-1 border-blue-300 border-b-2'>
              &#8377; 99
            </p>
            <p className='text-lg font-bold py-1'>
              &#8377; 79
            </p>
          </div>

          <div className=' border-blue-600 border-[1px] h-28'></div>

          <div className='pl-2 pr-6 '>
            <p className='text-xl font-bold py-1 border-blue-300 border-b-2'>
              Upgrade
            </p>
            <p className='text-xl font-semibold py-1 border-blue-300 border-b-2'>
              <button className='bg-gradient-premium text-fuchsia-700 font-bold rounded-sm px-2'>
                Renew
              </button>
            </p>
            <p className='text-xl font-semibold py-1'>
              <button className='bg-gradient-premium text-fuchsia-700 font-bold rounded-sm px-2'>
                Renew
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
