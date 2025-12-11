export async function handler(event, context) {
  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

  if (!FINNHUB_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing FINNHUB_API_KEY in environment variables." })
    };
  }

  const url = new URL(event.rawUrl);
  const path = url.searchParams.get("path");
  const symbol = url.searchParams.get("symbol");

  if (!path) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing ?path=" })
    };
  }

  let apiUrl = `https://finnhub.io/api/v1/${path}?token=${FINNHUB_API_KEY}`;

  if (symbol) apiUrl += `&symbol=${symbol}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
