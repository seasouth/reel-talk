import React, {useState, useEffect} from 'react';
import Carousel, { CarouselItem } from '../Carousel/Carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { axiosExternalGet } from '../hooks/useAxios';
import "swiper/css";
import "swiper/css/pagination";
import reel from '../icons/reel.svg';
import './HomePage.css';


const HomePage = () => {
    const omdb_base = 'http://www.omdbapi.com/?apikey=9effed01&';
    const watchmode_base = 'https://api.watchmode.com/v1/list-titles/?apiKey=NEDiePtFc42m9Ub3vlgIjXGA5KOHCJFQEpTlNHtn&'

    const navigate = useNavigate();

    const [state, setState] = useState({
        titles: [],
        images: []
    })

    useEffect(() => {
        //axiosExternalGet(watchmode_base + 'types=movie');

        let detail_search = 'search_field=name&search_value=Ed%20Wood';

        axiosExternalGet(watchmode_base + 'types=movie').then((response) => {
            if (response && response.data && response.data.titles) {
                let listOfTitles = [];
                response.data.titles.slice(1, 5).map((movie) => {
                    listOfTitles.push(movie.title.replace(' ', '+'));
                })
                setState((prevState) => ({
                    ...prevState,
                    titles: listOfTitles
                }));
            }
          }).catch((error) => {
              console.log(error);
          });
    }, []);

    useEffect(() => {
        console.log(state);
        if (state.titles.length > 0) {
            state.titles.map((title) => {
                axiosExternalGet(omdb_base + `t=${title}`).then((response) => {
                    let poster = response.data.Poster;
                    setState((prevState) => ({
                        ...prevState,
                        images: [...prevState.images, poster]
                    }))
                }).catch((error) => {
                    console.log(error);
                });
            });
        }
    }, [state.titles]);

    return (
        <div style={{height: "30%"}}>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
            >{
                state.images.map((image) => {
                    return (
                        <SwiperSlide>
                            <div 
                                className="poster-container"
                                onClick={() => navigate("/takes")}
                            >
                                <img src={image} />
                            </div>
                        </SwiperSlide>
                    )
                })
            }</Swiper>
        </div>
    )
}

export default HomePage;