import React from 'react'
import axios from "axios"

import { useState, useEffect } from 'react'

const url = `https://official-joke-api.appspot.com/jokes/random`

export const useEnglish = () => {
    const [englishContent, setEnglishContent] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchData() {
        setLoading(true)
        try {
            const res = await axios.get(url)
            const dataArray = res.data      //array de diya
            setEnglishContent(dataArray)
            console.log(dataArray);
        } catch (error) {
            console.log("Error in fetching data");
            console.log(error);
            setEnglishContent([])
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData();
    }, [])
    return { loading, englishContent, fetchData }
}
