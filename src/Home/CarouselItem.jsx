import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import './HomePage.css';

const CarouselItem = ({
    image,
    footer
}) => {
    return (
        <Card className='card-container'>
            <CardActionArea>
                <CardMedia
                    sx={{ height: '100%', width: '100%' }}
                    component="img"
                    image={image}
                />
                <CardContent>
                    <div
                        style={{textAlign: 'left'}}
                    >
                        <Rating
                            name="reel-rating"
                            size="small"
                            value={3.5}
                            precision={0.5}
                            readOnly
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CarouselItem;