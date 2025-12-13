export async function handler(event) {
  const symbol = event.queryStringParameters?.symbol;
  if (!symbol) {
    return { statusCode: 400, body: "Symbol required" };
  }

  const url =
    "https://finnhub.io/api/v1/quote?symbol=" +
    symbol +
    "&token=" +
    process.env.FINNHUB_API_KEY;

  const response = await fetch(url);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}

