import React from 'react'

import Spinner from "../../common/Spinner"
import { useHindi } from '../../../hooks/useHindi'
import { HindiJoke } from './HindiJoke'


const splitJokeTextIntoLines = (jokeText, wordsPerLine) => {
  const words = jokeText.split(" ");
  const lines = [];

  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(' '));
  }

  return lines;
};

export const HindiCard = () => {

  const { loading, hindiContent, fetchData } = useHindi()
  
  // const jokeText = hindiContent.jokeContent
  // Ensure jokeContent is a string
  const jokeText = typeof hindiContent.jokeContent === 'string' ? hindiContent.jokeContent : '';
  console.log(jokeText);
  console.log("jokeText.length", jokeText.length);

  let wordsPerLine;
  jokeText.length > 250 ? wordsPerLine = 7 :
  jokeText.length > 200 ? wordsPerLine = 6 :
  jokeText.length > 150 ? wordsPerLine = 5 :
  wordsPerLine = 3

  const lines = splitJokeTextIntoLines(jokeText, wordsPerLine);

  return (
    <div>
      <div className='title mb-4'>
        <div>
          Hindi Jokes
        </div>
      </div>
      <div>
      {
        loading ? <Spinner /> : <HindiJoke lines={lines} wordsPerLine={wordsPerLine}/>
      }
      </div>
      <div>
        {/* className='new-gradient mx-auto w-7/12 my-8 h-14 font-sans text-4xl py-2 tracking-widest'> */}
        <button className='new-gradient text-center font-bold text-3xl text-lime-300 rounded-full h-12 ml-14 mt-8 p-1 w-60'
          onClick={() => fetchData()}>
          New
        </button>
      </div>
    </div>

  )
}




// hindiContent.length > 0 ?
{/* <CardReaction /> */}
          // console.log("dikat")
          // <p>Idhar dikat hai</p>
          // <p>{hindiContent.jokeContent}</p>
            // (
            //   <div>
            //     {
            //       hindiContent.map((hindiJoke) => (
            //         <HindiJoke key={hindiJoke._id} hindiJoke={hindiJoke} />
            //       ))
            //     }
            //   </div>
            // ) 
            // :
            // <div>
            //   No data Found
            // </div>



