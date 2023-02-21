import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
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
                    <Typography variant="body2" color="white">
                        {footer}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CarouselItem;