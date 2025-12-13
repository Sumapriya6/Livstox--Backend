export async function handler(event) {
  const symbol = event.queryStringParameters?.symbol;
  if (!symbol) {
    return { statusCode: 400, body: "Symbol required" };
  }

  const res = await fetch(
    "https://finnhub.io/api/v1/quote?symbol=" +
      symbol +
      "&token=" +
      process.env.FINNHUB_API_KEY
  );

  const q = await res.json();

  let decision = "HOLD";
  let reason = "Market is neutral";

  if (q.dp > 2) {
    decision = "BUY";
    reason = "Price is moving up strongly";
  } else if (q.dp < -2) {
    decision = "AVOID";
    reason = "Price is falling";
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      symbol,
      price: q.c,
      changePercent: q.dp,
      decision,
      reason
    })
  };
}
