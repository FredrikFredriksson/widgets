const API_ENDPOINT = "https://api.coingecko.com/api/v3";

export async function getCoins() {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching coins data", error);
    return [];
  }
}

export async function getHistoricalPrices(coinId) {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/coins/${coinId}/market_chart?vs_currency=usd&days=30&interval=daily`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.prices || [];
  } catch (error) {
    console.error("Error fetching historical prices", error);
    return [];
  }
}

export async function getBitcoinDominance() {
  try {
    const response = await fetch(`${API_ENDPOINT}/global`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching Bitcoin dominance data", error);
    return null;
  }
}
