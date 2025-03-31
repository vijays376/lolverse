import React from 'react'

import Spinner from '../../../common/Spinner';
import { EnglishJokeCard } from './EnglishJokeCard';
const loading = false

const splitJokeTextIntoLines = (jokeText, wordsPerLine) => {
    const words = jokeText.split(" ");
    const lines = [];

    for (let i = 0; i < words.length; i += wordsPerLine) {
        lines.push(words.slice(i, i + wordsPerLine).join(' '));
    }

    return lines;
};


export const TrimEnglishJoke = ({ englishText }) => {

    const jokeText = typeof englishText === 'string' ? englishText : '';
    console.log(jokeText);
    console.log("jokeText.length", jokeText.length);

    let wordsPerLine;
    jokeText.length > 250 ? wordsPerLine = 7 :
        jokeText.length > 200 ? wordsPerLine = 6 :
            jokeText.length > 150 ? wordsPerLine = 5 :
                wordsPerLine = 3

    const lines = splitJokeTextIntoLines(jokeText, wordsPerLine);

    return (
        // <div>{text}</div>
        <div>
            {
                loading ? <Spinner /> : <EnglishJokeCard lines={lines} wordsPerLine={wordsPerLine} />
            }
        </div>
    )
}
