import { getCoins, getRelatedCoins } from "./coinService.js";

export async function fetchAndDisplayData() {
  try {
    const coins = await getCoins();
    document.getElementById("coinData").textContent = JSON.stringify(
      coins,
      null,
      2
    );

    const relatedCoins = await getRelatedCoins("bitcoin"); // Replace 'bitcoin' with the actual slug you need
    document.getElementById("relatedCoins").textContent = JSON.stringify(
      relatedCoins,
      null,
      2
    );

    // Integrate with SciChart
    return coins;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
