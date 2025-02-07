import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Badge from '@mui/material/Badge'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CommentIcon from '@mui/icons-material/Comment'
import { CardActionArea } from '@mui/material'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { axiosGet } from '../hooks/useAxios';

const theme = createTheme({
    components: {
      MuiRating: {
        styleOverrides: {
          root: {
            fontSize: '0.95rem',
            paddingTop: '12px'
          }
        }
      },
      MuiSvgIcon: {
        styleOverrides: {
            root: {
                fontSize: '1.25rem'
            }
        }
      }
    }
});

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 12,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

const CarouselItem = ({
    key,
    item,
    image
}) => {
    const [avgRating, setAvgRating] = useState(0);
    const [numRatings, setNumRatings] = useState(0);
    const [numComments, setNumComments] = useState(0);
    const [cardPadding, setCardPadding] = useState('12px');
    const [isMobile, setIsMobile] = useState(false);

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
        console.log(item);
        if (item) {
            axiosGet(`/thread/rating/${item.id}`).then((response) => {
                setAvgRating(response.data?.avgRating);
                setNumRatings(response.data?.numRatings);
                setNumComments(response.data?.numComments);
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
                        display: isMobile ? 'contents' : '', 
                        justifyContent: 'space-between', 
                        paddingLeft: isMobile ? '4px' : '12px',
                        paddingTop: isMobile ? '2px' : '',
                    }}
                >
                    <>
                        {isMobile ?
                        <ThemeProvider theme={theme}>
                            <Rating
                                name="reel-rating"
                                size="small"
                                value={avgRating}
                                precision={0.5}
                                readOnly
                                emptyIcon={
                                    <StarIcon style={{ opacity: 0.55, color: 'whitesmoke' }} fontSize="inherit" />
                                }
                            />
                            <div style={{color: 'whitesmoke', display: 'flex', fontSize: 'small'}}>{numRatings}</div>
                        </ThemeProvider>
                        :
                        <div>
                            <div
                                style={{display: 'flex', justifyContent: 'space-between'}}
                            >
                                <div style={{display: 'grid', marginTop: '2px'}}>
                                    <Rating
                                        name="reel-rating"
                                        size="small"
                                        value={avgRating}
                                        precision={0.5}
                                        readOnly
                                        emptyIcon={
                                            <StarIcon style={{ opacity: 0.55, color: 'whitesmoke' }} fontSize="inherit" />
                                        }
                                        sx={{marginTop: '4px'}}
                                    />
                                    <div style={{color: 'gray', marginLeft: '4px', textAlign: 'left'}}>{numRatings} ratings</div>
                                </div>
                                <ThemeProvider theme={theme}>
                                    <StyledBadge badgeContent={numComments} color="primary">
                                        <CommentIcon style={{color: 'white', marginTop: '7px'}} />
                                    </StyledBadge>
                                </ThemeProvider>
                            </div>
                        </div>}
                    </>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CarouselItem;