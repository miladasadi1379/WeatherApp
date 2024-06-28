import {
    Grid, Box, AppBar, Toolbar, FormControl, Input,
    InputAdornment,

} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function Search({ handleInput, getWeather }) {
    return (
        <>

            <Grid
                xs={12}
            >
                <Box
                    id="blurSection"
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <AppBar position="static">
                        <Toolbar
                            sx={{
                                display: 'flex',
                                placeContent: "center",

                            }}
                        >
                            <Box
                                component="form"
                                onSubmit={getWeather}
                                sx={{ '& > :not(style)': { m: 1 } }}
                            >
                                <FormControl
                                    variant="outlined"
                                    sx={{
                                        minWidth: {
                                            xs: "15rem",
                                            sm: "30rem",
                                        }
                                    }}
                                >
                                    <Input
                                        onChange={handleInput}
                                        variant="outlined"
                                        sx={{ p: '2rem' }}
                                        size="medium"
                                        placeholder="جستجو شهر..."
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>

        </>
    )
}