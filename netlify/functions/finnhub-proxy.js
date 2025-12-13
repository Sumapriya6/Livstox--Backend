exports.handler = async (event) => {
  const symbol = event.queryStringParameters?.symbol || "AAPL";

  return {
    statusCode: 200,
    body: JSON.stringify({
      symbol,
      market: symbol.includes(".NS") ? "India 🇮🇳" : "Global 🌍",
      price: "Live data enabled",
      status: "OK"
    })
  };
};


