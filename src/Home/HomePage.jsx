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
            {<div style={{height: "30%"}}>
                {<br />}
                {<Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    breakpoints={{
                        "@0.00": {
                          slidesPerView: 1,
                          spaceBetween: 10,
                        },
                        "@0.75": {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        "@1.00": {
                          slidesPerView: 3,
                          spaceBetween: 30,
                        },
                        "@1.50": {
                          slidesPerView: 4,
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
                                        onClick={() => navigate(`/takes/${item.id}`)}
                                    >
                                        <img src={'https://image.tmdb.org/t/p/w500/' + item.poster_path} />
                                    </div>
                                </SwiperSlide>
                            </React.Fragment>
                        )
                    })
                }</Swiper>}
            </div>}
            {<hr />}
            {<div>Trending</div>}
            {<div style={{height: "30%"}}>
                {<br />}
                {<Swiper
                    slidesPerView={5}
                    spaceBetween={30}
                    breakpoints={{
                        "@0.00": {
                          slidesPerView: 2,
                          spaceBetween: 10,
                        },
                        "@0.75": {
                          slidesPerView: 3,
                          spaceBetween: 20,
                        },
                        "@1.00": {
                          slidesPerView: 4,
                          spaceBetween: 30,
                        },
                        "@1.50": {
                          slidesPerView: 5,
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
            {<div style={{height: "30%"}}>{
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                >{
                    items.map((item) => {
                        return (
                            <React.Fragment key={item.id}>
                                <SwiperSlide>
                                    <div 
                                        className="poster-container"
                                        onClick={() => navigate(`/takes/${item.id}`)}
                                    >
                                        <img src={'https://image.tmdb.org/t/p/w500/' + item.poster_path} />
                                    </div>
                                </SwiperSlide>
                            </React.Fragment>
                        )
                    })
                }</Swiper>
            }
            {<br />}
            </div>
        }</React.Fragment>
    )
}

export default HomePage;