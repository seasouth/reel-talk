import React from 'react'
import Carousel from './Carousel'
import useStore from '../hooks/useStore'

import styles from './Home.module.css'
import './HomePage.css'

const HomePage = () => {
    const showSearchResults = useStore((state) => state.showSearchResults);
    const searchValue = useStore((state) => state.searchValue);

    return (
        <>{
            showSearchResults && searchValue.length > 0 ?
                <React.Fragment key={'search'}>
                    <Carousel
                        title={'Search Results'}
                        tmdbQuery={'search/multi'}
                        queryParams={searchValue}
                    /> 
                </React.Fragment>
                :
                <>
                    <Carousel
                        title={'Latest'}
                        type={'active'}
                    />
                    <hr />
                    <Carousel 
                        title={'Trending'}
                        tmdbQuery={'trending/all/week'}
                    />
                    <hr />
                    <Carousel 
                        title={'TV'} 
                        tmdbQuery={'trending/tv/week'}
                    />
                    <hr />
                    <Carousel 
                        title={'Movies'}
                        tmdbQuery={'trending/movie/week'}
                    />
                    <br />
                </>
        }</>
    )
}

export default HomePage;