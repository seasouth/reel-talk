import React, {useState, useEffect} from 'react';
import CarouselItem from './CarouselItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import { useNavigate } from 'react-router-dom';
import { axiosTMDBGet } from '../hooks/useAxios';
import "swiper/css";
import "swiper/css/pagination";
import reel from '../icons/reel.svg';
import './HomePage.css';


const HomePage = () => {
    const navigate = useNavigate();

    const [items, setItems] = useState([]);

    useEffect(() => {
        axiosTMDBGet('trending/all/week').then((response) => {
            if (response?.data?.results) {
                setItems(response.data.results);
            }
        });
    }, []);

    useEffect(() => {
        console.log(items);
    }, [items]);

    return (
        <React.Fragment>
            <h4 className='swiper-title'>Trending</h4>
            {<div className='swiper-carousel'>
                {<Swiper
                    slidesPerView={6}
                    spaceBetween={30}
                    breakpoints={{
                        "@0.00": {
                          slidesPerView: 4,
                          spaceBetween: 10,
                        },
                        "@0.75": {
                          slidesPerView: 5,
                          spaceBetween: 20,
                        },
                        "@1.00": {
                          slidesPerView: 5,
                          spaceBetween: 30,
                        },
                        "@1.50": {
                          slidesPerView: 6,
                          spaceBetween: 30,
                        },
                      }}
                    modules={[Pagination]}
                >{
                    items.map((item) => {
                        return (
                            <React.Fragment key={item.id}>
                                <SwiperSlide>
                                    <div 
                                        className="poster-container"
                                        onClick={() => navigate(`/takes/${item.media_type}/${item.id}`)}
                                    >
                                        <CarouselItem
                                            image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                        />
                                    </div>
                                </SwiperSlide>
                            </React.Fragment>
                        )
                    })
                }</Swiper>}
            </div>}
            {<hr />}
            <h4 className='swiper-title'>Trending</h4>
            {<div className='swiper-carousel'>
                {<Swiper
                    slidesPerView={5}
                    spaceBetween={30}
                    breakpoints={{
                        "@0.00": {
                          slidesPerView: 4,
                          spaceBetween: 10,
                        },
                        "@0.75": {
                          slidesPerView: 5,
                          spaceBetween: 20,
                        },
                        "@1.00": {
                          slidesPerView: 6,
                          spaceBetween: 30,
                        },
                        "@1.50": {
                          slidesPerView: 7,
                          spaceBetween: 35,
                        },
                      }}
                    modules={[Pagination]}
                >{
                    items.map((item) => {
                        return (
                            <React.Fragment key={item.id}>
                                <SwiperSlide>
                                    <div 
                                        className="poster-container"
                                        onClick={() => navigate(`/takes/${item.media_type}/${item.id}`)}
                                    >
                                        <CarouselItem
                                            image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                        />
                                    </div>
                                </SwiperSlide>
                            </React.Fragment>
                        )
                    })
                }</Swiper>}
            </div>}
            {<br />}
            {<hr />}
            <h4 className='swiper-title'>Trending</h4>
            {<div className='swiper-carousel'>
                {<Swiper
                    slidesPerView={5}
                    spaceBetween={30}
                    breakpoints={{
                        "@0.00": {
                          slidesPerView: 4,
                          spaceBetween: 10,
                        },
                        "@0.75": {
                          slidesPerView: 5,
                          spaceBetween: 20,
                        },
                        "@1.00": {
                          slidesPerView: 6,
                          spaceBetween: 30,
                        },
                        "@1.50": {
                          slidesPerView: 7,
                          spaceBetween: 35,
                        },
                      }}
                    modules={[Pagination]}
                >{
                    items.map((item) => {
                        return (
                            <React.Fragment key={item.id}>
                                <SwiperSlide>
                                    <div 
                                        className="poster-container"
                                        onClick={() => navigate(`/takes/${item.media_type}/${item.id}`)}
                                    >
                                        <CarouselItem
                                            image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                        />
                                    </div>
                                </SwiperSlide>
                            </React.Fragment>
                        )
                    })
                }</Swiper>}
            </div>}
        </React.Fragment>
    )
}

export default HomePage;