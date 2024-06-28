'use client'
import { createContext } from "react";

export const weatherContext = createContext({
    data: [],
    loading: null,
    city: ''
})