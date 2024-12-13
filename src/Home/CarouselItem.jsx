import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Badge from '@mui/material/Badge'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CommentIcon from '@mui/icons-material/Comment'
import { CardActionArea } from '@mui/material'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { axiosGet } from '../hooks/useAxios';

const theme = createTheme({
    components: {
      MuiRating: {
        styleOverrides: {
          root: {
            fontSize: '0.95rem',
            paddingTop: '4px'
          }
        }
      },
      MuiSvgIcon: {
        styleOverrides: {
            root: {
                fontSize: '1rem'
            }
        }
      }
    }
});
const CarouselItem = ({
    key,
    item,
    image
}) => {
    const [length, setLength] = useState(0);
    const [avgRating, setAvgRating] = useState(0);
    const [cardPadding, setCardPadding] = useState('12px');
    const [isMobile, setIsMobile] = useState(false);
    const [logo, setLogo] = useState("");

    useEffect(() => {
        if (window.innerWidth > 500) {
            setIsMobile(false);
            setCardPadding('12px');
        } else {
            setIsMobile(true);
            setCardPadding('2px');
        }
    }, []);

    useEffect(() => {
        if (item) {
            axiosGet(`/thread/rating/${item.id}`).then((response) => {
                console.log("Ratings returned: " + response?.data);
                setAvgRating(response.data);
            });
        }
    }, [item]);

    return (
        <Card className='card-container'>
            <CardActionArea>
                <CardMedia
                    sx={{ height: '100%', width: '100%' }}
                    component="img"
                    image={image}
                />
                <CardContent
                    sx={{ 
                        display: isMobile ? 'contents' : 'flex', 
                        justifyContent: 'space-between', 
                        paddingLeft: isMobile ? '4px' : '12px',
                        paddingTop: isMobile ? '2px' : '',
                    }}
                >
                    <>
                    {isMobile ? <ThemeProvider theme={theme}>
                        <Rating
                            name="reel-rating"
                            size="small"
                            value={avgRating}
                            precision={0.5}
                            readOnly
                            emptyIcon={<StarIcon style={{ opacity: 0.55, color: 'whitesmoke' }} fontSize="inherit" />}
                        />
                    </ThemeProvider>
                    :
                    <Rating
                        name="reel-rating"
                        size="small"
                        value={avgRating}
                        precision={0.5}
                        readOnly
                        emptyIcon={<StarIcon style={{ opacity: 0.55, color: 'whitesmoke' }} fontSize="inherit" />}
                    />}
                    </>
                    <>
                    {isMobile ? 
                    <ThemeProvider theme={theme}>
                        <Badge badgeContent={length} color="primary">
                            <CommentIcon style={{color: "white"}} />
                        </Badge>
                    </ThemeProvider>
                    :
                    <Badge badgeContent={length} color="primary">
                        <CommentIcon style={{color: "white"}} />
                    </Badge>}
                    </>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CarouselItem;