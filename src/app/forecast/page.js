'use client'
import { useContext, useEffect, useState } from "react"
import Head from "next/head";

import axios from "axios";
import { weatherContext } from "@/context/weatherContext"
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ForeCast() {
    const { city } = useContext(weatherContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    // get Api 
    const ApiKey = "77631a26e466402fae5161606240706";
    const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${city}&days=5&aqi=no&alerts=no`;

    // get weatherForecast Api & data
    useEffect(() => {
        document.title = "آپ هواشناسی";
        setLoading(true)

        axios.get(weatherUrl).then((res) => {
            const id = toast.loading("لطفا صبر کنید...")
            setData(res.data.forecast.forecastday);
            toast.update(id, { render: "دریافت شد", type: "success", isLoading: false, autoClose: 2000, closeButton: true });

        })
            .catch(function (error) {
                const err = (error.toJSON());
                if (err.status === 400) {
                    toast.error('شهر مورد نظر یافت')
                }
            });
        setLoading(false)

    }, [])

    // get forecast date
    let options = { month: 'long', weekday: "long", day: 'numeric' };
    const forecastDateA = data[2]?.date_epoch * 1000
    const forecastDateB = data[3]?.date_epoch * 1000
    const forecastDateC = data[4]?.date_epoch * 1000
    // for dateToLocaleString
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            <Head>
                <title>{document.title}</title>
            </Head>
            <Grid
                container
                xs={10}
                md={12}
                style={{
                    placeContent: "center",
                    placeItems: "center",
                    margin: 'auto',
                    minHeight: '100vh'
                }}
            >
                {/*  Weather */}
                {
                    loading === true ? <CircularProgress /> : (
                        <>
                            {
                                data.length === 0 ? null : (
                                    <>
                                        {/* description */}
                                        <Slider {...settings}>

                                            <Grid id='CardSection'>
                                                <Typography id='CardText' variant="h6" >
                                                    {new Date(forecastDateA).toLocaleDateString('fa-IR', options)}
                                                </Typography>
                                                <Typography id='CardText' >
                                                    دما
                                                </Typography>
                                                {`${data[2]?.day.avgtemp_c}`}&ordm;
                                            </Grid>

                                            <Grid id='CardSection'>
                                                <Typography id='CardText' variant="h6"  >
                                                    {new Date(forecastDateB).toLocaleDateString('fa-IR', options)}
                                                </Typography>
                                                <Typography id='CardText' >
                                                    دما
                                                </Typography>
                                                {`${data[3]?.day.avgtemp_c}`}&ordm;
                                            </Grid>

                                            <Grid id='CardSection'>
                                                <Typography id='CardText' variant="h6"  >
                                                    {new Date(forecastDateC).toLocaleDateString('fa-IR', options)}
                                                </Typography>
                                                <Typography id='CardText' >
                                                    دما
                                                </Typography>
                                                {`${data[4]?.day.avgtemp_c}`}&ordm;
                                            </Grid>
                                        </Slider>
                                        <Divider />
                                    </>
                                )
                            }

                        </>
                    )
                }
            </Grid >
        </>
    )

}