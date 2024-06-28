'use client'
import { useContext } from "react";
import { weatherContext } from "@/context/weatherContext";

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import WeatherIcons from "@/components/WeatherIcons";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function Home() {
  const { data, loading } = useContext(weatherContext)

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  // get sunrise & sunset
  const dataTime = {
    sunrise: new Date(data?.sys?.sunrise * 1000).toLocaleTimeString().slice(0, 4),
    sunset: new Date(data?.sys?.sunset * 1000).toLocaleTimeString().slice(0, 4)
  }
  // get current date
  function CurrentDate() {
    let options = { month: 'long', weekday: "long", day: 'numeric' };
    let today = new Date().toLocaleDateString('fa-IR', options);
    return today;
  }


  return (

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
                  <Grid
                    container
                    xs={11}

                    style={{
                      placeContent: "space-between",
                      marginInline: '3rem'
                    }}
                  >
                    <Grid
                      xs={4}
                      md={2}
                      id='HeaderText'
                      style={{
                        display: 'flex',
                        placeContent: 'center',
                      }}
                    >
                      <CalendarTodayIcon
                        style={{ marginInline: '.5rem' }}
                      />
                      <CurrentDate />
                    </Grid>
                    <Grid
                      xs={4}
                      md={2}

                      id='HeaderText'
                      sx={{
                        display: 'flex',
                        placeContent: 'center',
                      }}
                    >

                      <Link href={'/forecast'}>
                        روز های آینده
                      </Link>
                      <KeyboardBackspaceIcon />

                    </Grid>
                  </Grid>
                  {/* slider section */}
                  <Slider {...settings}>
                    <Grid id='CardSection'>
                      <Typography id='CardText' style={{ marginTop: '1rem' }} >
                        {`${data?.weather?.[0].description}`}
                      </Typography>
                      <WeatherIcons />
                    </Grid>

                    <Grid id='CardSection'>
                      <Typography id='CardText' >
                        دما
                      </Typography>
                      {`${data?.main?.temp}`}&ordm;
                    </Grid>

                    <Grid id='CardSection'>
                      <Typography id='CardText' >
                        کمترین
                      </Typography>
                      {`${data?.main?.temp_min}`}&ordm;
                    </Grid>

                    <Grid id='CardSection'>
                      <Typography id='CardText' >
                        بیشترین
                      </Typography>
                      {`${data?.main?.temp_max}`}&ordm;
                    </Grid>


                    <Grid id='CardSection'>
                      <Typography id='CardText' >
                        فشارهوا(جیوه)
                      </Typography>
                      {`${data?.main?.pressure}`}
                    </Grid>

                    <Grid id='CardSection'>
                      <Typography id='CardText' >
                        رطوبت(%)
                      </Typography>
                      {`${data?.main?.humidity}`}
                    </Grid>

                    <Grid id='CardSection'>
                      <Typography id='CardText' >
                        طلوع
                      </Typography>
                      {`${dataTime.sunrise}`}
                    </Grid>

                    <Grid id='CardSection'>
                      <Typography id='CardText' >
                        غروب
                      </Typography>
                      {`${dataTime.sunset}`}
                    </Grid>

                    <Grid id='CardSection'>
                      <Typography id='CardText' >
                        شعاع دید(متر)
                      </Typography>
                      {`${data?.visibility}`}
                    </Grid>

                    <Grid id='CardSection'>
                      <Typography id='CardText' >
                        سرعت(کیلومتربرساعت)
                      </Typography>
                      {`${data?.wind?.speed}`}
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

  )
}
