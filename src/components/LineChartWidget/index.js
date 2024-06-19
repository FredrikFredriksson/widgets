import React, { useEffect, useState } from "react";
import Graph from "./components/Graph";
import "./lineChart.css";
import { getCoins } from "../../services/coinService";

const LineChartWidget = ({ coinId }) => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      const coinsData = await getCoins();
      console.log(coinsData)
      const coin = coinsData.find((coin) => coin.id === coinId);
      setSelectedCoin(coin);
    };
    fetchCoin();
  }, [coinId]);

  
  if (!selectedCoin) return <div>Loading...</div>;

  const priceChangeColor =
    selectedCoin.price_change_percentage_24h >= 0 ? "#11CABE" : "#FA2256";

  return (
    <div className="widget">
      <div className="coin-info">
        <img
          src={selectedCoin.image}
          alt={selectedCoin.name}
          className="coin-image"
        />
        <div className="coin-name">
          <h2>{selectedCoin.name}</h2>
        </div>
        <div className="coin-symbol">
          <p>{selectedCoin.symbol.toUpperCase()}</p>
        </div>
        <div className="coin-price">
          <p>${selectedCoin.current_price.toLocaleString()}</p>
        </div>
        <div className="price-change" style={{ color: priceChangeColor }}>
          <p>{selectedCoin.price_change_percentage_24h.toFixed(2)}%</p>
        </div>
        <Graph coinId={selectedCoin.id} />
      </div>
    </div>
  );
};

export default LineChartWidget;
