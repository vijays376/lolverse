import React from 'react'
import axios from "axios"

import { useState, useEffect } from 'react'

const url = `https://api.memegen.link/templates`

export const useMeme = () => {
    const [memeContent, setMemeContent] = useState([])
    const [loading, setLoading] = useState(false)

    const randomNumber = Math.floor(Math.random() * 204);

    async function fetchData() {
        setLoading(true)
        try {
            const res = await axios.get(url)
            const dataArray = res.data[randomNumber].example
            setMemeContent(dataArray)
            console.log(dataArray);
        } catch (error) {
            console.error("Error in fetching data");
            console.log(error);
            setMemeContent([])
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData();
    }, [])
    return { loading, memeContent, fetchData }
}
