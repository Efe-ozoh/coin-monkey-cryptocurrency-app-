import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "./Loader.css"

const Loader = () => {
  return (
    <div>
      <h1><Skeleton  count={2} baseColor="#202020" highlightColor="#444"/></h1>
      <Skeleton count={14} baseColor="#202020" highlightColor="#444"/>
      <div className='loader-segment'>
      <h1><Skeleton  count={1} baseColor="#202020" highlightColor="#444"/></h1>
      <Skeleton count={14} baseColor="#202020" highlightColor="#444"/>
      </div>{/* <Skeleton width='200px' className='loader-titles' height="200px" containerClassName='loader-title'count={9} baseColor="#202020" highlightColor="#444"/> */}
   </div>
  )
}

export default Loader;
