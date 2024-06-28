'use client'
import { useContext } from "react";

import {
    WiDaySunny, WiCloudy,
    WiDayThunderstorm,
    WiDaySnow, WiDayRain,
    WiCloudyWindy
} from "weather-icons-react";
import Typography from '@mui/material/Typography';
import { weatherContext } from "@/context/weatherContext";

export default function WeatherIcons() {
    const { data } = useContext(weatherContext);


    return (
        <>
            <Typography style={{ marginInline: '3rem' }}>
                {
                    data.weather[0].main === 'Thunderstorm' ? <WiDayThunderstorm size={60} color='#fff' /> :
                        data.weather[0].main === 'Rain' ? <WiDayRain size={60} color='#fff' /> :
                            data.weather[0].main === 'Snow' ? <WiDaySnow size={60} color='#fff' /> :
                                data.weather[0].main === 'Clear' ? <WiDaySunny size={60} color='#fff' /> :
                                    data.weather[0].main === 'Clouds' ? <WiCloudy size={60} color='#fff' /> :
                                        data.weather[0].main === 'Atmosphere' ? <WiCloudyWindy size={60} color='#fff' /> : null
                }
            </Typography>
        </>
    )

}