import React from 'react'

import Spinner from "../../common/Spinner"
import { useEnglish } from '../../../hooks/useEnglish'
import { EnglishJoke } from './EnglishJoke'

const splitJokeTextIntoLines = (jokeText, wordsPerLine) => {
  const words = jokeText.split(" ");
  const lines = [];

  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(' '));
  }

  return lines;
};

export const EnglishCard = () => {

  const { loading, englishContent, fetchData } = useEnglish()

  const jokeSetup = typeof englishContent.setup === 'string' ? englishContent.setup : '';
  console.log(jokeSetup);
  console.log("jokeSetup.length", jokeSetup.length);

  let wordsPerLine;
  jokeSetup.length > 30 ? wordsPerLine = 5 : wordsPerLine = 3
  const ques = splitJokeTextIntoLines(jokeSetup, wordsPerLine);


  const jokePunchline = typeof englishContent.punchline === 'string' ? englishContent.punchline : '';
  console.log(jokePunchline);
  console.log("jokePunchine.length", jokePunchline.length);

  jokePunchline.length > 30 ? wordsPerLine = 5 : wordsPerLine = 3

  const ans = splitJokeTextIntoLines(jokePunchline, wordsPerLine);

  // const ques = englishContent.setup
  // const ans = englishContent.punchhline

  return (
    <div>
      <div className='title mb-4'>
        <div>
          English Jokes
        </div>
      </div>
      <div>
        {
          loading ? <Spinner /> : <EnglishJoke ques={ques} ans={ans} />
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




//   englishContent.length > 0 ?
//     (
//       <div>
//         {
//           englishContent.map((englishJoke) => (
//             <EnglishJoke key={englishJoke.id} englishJoke={englishJoke} />
//           ))
//         }
//       </div>
//     ) :
//     <div>
//       No data Found
//     </div>