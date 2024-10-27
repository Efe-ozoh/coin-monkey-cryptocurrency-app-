import React from 'react'; 
import { Typography, Statistic, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';
import Loader from '../ui/Loader';

import { useGetCryptosQuery } from '../services/cryptoApi';
import {Cryptocurrencies, News} from "../components"


 const HomePage = () => {

  
 const { data, isFetching} = useGetCryptosQuery(10);
 const coinsGlobalStats = data?.data?.stats;
 
  console.log(data)

   if(!data) return <Loader />

  return (
    <div >
      <Typography.Title style={{color: "#ffff"}}>Global Crypto Stats</Typography.Title>
      <Row className="homepage">
        <Col  span={12}><Statistic title="Total Cryptocurrencies" value={coinsGlobalStats.total}/></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(coinsGlobalStats.totalExchanges)}/></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(coinsGlobalStats.totalMarketCap)}/></Col>
        <Col span={12}><Statistic title="Total 24h volume" value={millify(coinsGlobalStats.total24hVolume)}/></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(coinsGlobalStats.totalMarkets)}/></Col>
      </Row>

      <div className='home-heading-container'>
        <Typography.Title level={2} className='home-title' >Top 10 Cryptocurrencies in the world</Typography.Title>
        <Typography.Title level={3} className='show-more' ><Link to='/cryptocurrencies'>Show More</Link></Typography.Title>
      </div>
      <Cryptocurrencies simplified />
      <div className='home-heading-container'>
        <Typography.Title level={2} className='home-title' >Latest Crypto News</Typography.Title>
        <Typography.Title level={3} className='show-more' ><Link to='/news'>Show More</Link></Typography.Title>
      </div>
      <News simplified/>
  </div>
  );
}

export default HomePage;
