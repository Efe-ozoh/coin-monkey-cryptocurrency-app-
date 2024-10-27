import React from 'react';
import { Card, Row, Col,Typography } from 'antd';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from '../ui/Loader';

const {Text, Title} = Typography;

const News = ({ simplified}) => {
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery(10);

  console.log(cryptoNews)

  if(!cryptoNews) return   <Loader />

  return (
    <Row gutter={[ 24, 24]}>
      {cryptoNews?.data.slice(0, simplified ? 5 : 10).map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} target='_blank' rel="noreferrer">
              <div className='news-image-container'>
                <h5 className='news-title'  >{news.title}</h5>
              <img src={news?.thumbnail} alt="news" />
              </div>
              <p>
                {news.description > 100 
                ? `${news.description.substring(0, 10)}...` 
                : news.description.substring(0, 100)}...
              </p>
              <div className='provider-container'>
                <h5 className='news-title'>{news.createdAt.slice(0, 25)}</h5>
              </div>
           </a>

          </Card>
        </Col>
      ))}
    </Row>
  )
};

export default News;
