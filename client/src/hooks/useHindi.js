import React from 'react'
import axios from "axios"

import { useState, useEffect } from 'react'

const API_KEY = process.env.REACT_APP_API_KEY;
const url = `https://hindi-jokes-api.onrender.com/jokes?api_key=${API_KEY}`;

export const useHindi = () => {
    const [hindiContent, setHindiContent] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchData() {
        setLoading(true)
        try {
            const res = await axios.get(url)
            const dataArray = res.data    //array de diya
            setHindiContent(dataArray)
            console.log(dataArray);
        } catch (error) {
            console.error("Error in fetching data");
            console.log(error);
            setHindiContent([])
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData();
    }, [])
    return { loading, hindiContent, fetchData }
}
