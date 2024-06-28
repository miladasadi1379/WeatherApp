'use client'
import "@/style/globals.css";
import { useState, useEffect } from 'react'
import axios from "axios";
import Head from "next/head";
import Image from "next/image";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import theme from "@/ui/theme";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Search from "@/components/Search";
import { weatherContext } from "@/context/weatherContext";
import clear from '@/assets/background/clear.jpg'
import rain from '@/assets/background/rain.jpg'
import clouds from '@/assets/background/clouds.jpg'
import snow from '@/assets/background/snow.jpg'
import thunderstorm from '@/assets/background/thunderstorm.jpg'
import drizzle from '@/assets/background/drizzle.jpg'
import { usePathname } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
  const pathname = usePathname()

  const [city, setCity] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // change title App
  useEffect(() => {
    document.title = "آپ هواشناسی";
  }, []);

  // get Api 
  const ApiKey = "b18b9406e679cc5ba9e6180a44ea0222";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${ApiKey}&lang=fa&units=metric`;

  // get current weather
  function getWeather(e) {
    e.preventDefault();
    setLoading(true);

    axios.get(weatherUrl).then((res) => {
      const id = toast.loading("لطفا صبر کنید...")
      setData(res.data);
      toast.update(id, { render: "دریافت شد", type: "success", isLoading: false, autoClose: 2000, closeButton: true });

    })
      .catch(function (error) {
        const err = (error.toJSON());
        if (err.status === 400) {
          toast.error('شهر مورد نظر یافت')
        } else {
          toast.error('مشکلی رخ داد...')

        }
      });
    setLoading(false);

  }
  // change city name
  const handleInput = (e) => {
    setCity(e.target.value)
  }
  // change backgroundImg
  const backgroundImg = () => {
    if (data?.weather?.[0].main === 'Clouds') return clouds
    else if (data?.weather?.[0].main === 'Rain') return rain
    else if (data?.weather?.[0].main === 'Snow') return snow
    else if (data?.weather?.[0].main === 'Thunderstorm') return thunderstorm
    else if (data?.weather?.[0].main === 'Drizzle') return drizzle
    else if (data?.weather?.[0].main === 'Clear') return clear
    else return clear
  }


  return (
    <html lang="fa" dir="rtl" >
      <body>
        <Head>
          <title>{document.title}</title>
        </Head>
        <AppRouterCacheProvider options={{ key: 'css', enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Image
              src={backgroundImg()}
              fill
              alt="img"
              style={{ objectFit: "cover" }}
            />
            <weatherContext.Provider value={{
              data,
              loading,
              city
            }}>
              {

                loading === true ? toast('در حال بارگذاری...') :
                  (
                    <Grid container>
                      <Grid xs={12}>
                        {
                          pathname === '/forecast' ? null : (
                            <Search getWeather={getWeather} handleInput={handleInput} />
                          )
                        }
                        {children}
                      </Grid>
                    </Grid>
                  )
              }
              <ToastContainer />

            </weatherContext.Provider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
