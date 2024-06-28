'use client';

import { weatherContext } from '@/context/weatherContext';
import { createTheme } from '@mui/material/styles';
import { useContext } from 'react';
// const { data } = useContext(weatherContext)
// const image = () => {
//     if (data?.weather?.[0].description)
// }
// `extendTheme` is a new API
const theme = createTheme({
    colorSecondary: {
        color: '#FFFFFF',
        '&$checked': {
            color: 'hotpink',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundImage: `url(https://vztcqdwwinxdbflfwwjv.supabase.co/storae/v1/object/public/avatars/weatherApp/clear.jpg)`,
                    backgroundSize: 'cover'
                }
            }
        }
    },
    root: {
        height: "100vh",
    },
    typography: {
        fontFamily: 'B Yekan,',
    },
    button: {
        fontFamily: ['B Yekan', 'Inter'].join(','),
    },
    palette: {
        text: {
            secondary: 'rgba(255,255,255,0.87)'
        },

        background: {
            default: 'rgb(255,255,255)',
            paper: '#242424',
        },

    },
})


export default theme;
