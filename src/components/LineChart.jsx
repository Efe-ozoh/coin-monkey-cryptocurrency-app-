import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

// Register components with Chart.js
ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, ChartTitle, Tooltip, Legend);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  // Extract price and timestamp if coinHistory is available
  const coinData = coinHistory?.data?.history ?? [];
  const coinPrice = coinData.map(({ price }) => parseFloat(price)).reverse();
  const coinTimestamp = coinData
    .map(({ timestamp }) => new Date(timestamp * 1000).toLocaleDateString())
    .reverse();

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: `Price in USD (${coinName})`,
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change ?? 'N/A'}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: ${currentPrice ?? 'N/A'}
          </Title>
        </Col>
      </Row>
      {coinPrice.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <p>No data available for this period.</p>
      )}
    </div>
  );
};

export default LineChart;
