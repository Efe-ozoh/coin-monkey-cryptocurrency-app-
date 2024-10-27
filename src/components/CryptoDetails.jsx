import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { DollarCircleOutlined, ThunderboltOutlined, TrophyOutlined, NumberOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, CheckOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';


import Loader from '../ui/Loader';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data: cryptoDetails, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });

  const crypto = cryptoDetails?.data?.coin;
  console.log(coinHistory)


  if(!cryptoDetails) return <Loader />

  const timeOptions = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${crypto?.price && millify(crypto?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: crypto?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${crypto?.['24hVolume'] && millify(crypto?.['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${crypto?.marketCap && millify(crypto?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high (daily avg.)', value: `$ ${crypto?.allTimeHigh?.price && millify(crypto?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: crypto?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: crypto?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: crypto?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${crypto?.supply?.total && millify(crypto?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${crypto?.supply?.circulating && millify(crypto?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {crypto?.name} ({crypto?.symbol}) Price
        </Title>
        <p>{crypto?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>

      <Select
  defaultValue="7d"
  className="select-timeperiod"
  onChange={(value) => setTimeperiod(value)} 
>
  {timeOptions.map((option) => (
    <Option key={option}>{option}</Option>
  ))}
</Select>

      <LineChart coinHistory={coinHistory} currentPrice={millify(crypto?.price)} coinName={crypto?.name} />

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{crypto?.name} Value Statistics</Title>
            <p>An overview showing the statistics of {crypto?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>

        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {crypto?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
