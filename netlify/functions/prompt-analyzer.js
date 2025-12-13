export async function handler(event) {
  const body = JSON.parse(event.body || "{}");
  const prompt = body.prompt;

  if (!prompt) {
    return { statusCode: 400, body: "Prompt required" };
  }

  // Common Indian stock mapping
  const indianMap = {
    RELIANCE: "RELIANCE.NS",
    TCS: "TCS.NS",
    INFY: "INFY.NS",
    HDFC: "HDFCBANK.NS",
    ICICI: "ICICIBANK.NS",
    SBI: "SBIN.NS",
    ITC: "ITC.NS"
  };

  const words = prompt.toUpperCase().split(" ");
  let symbol = null;

  for (const w of words) {
    if (indianMap[w]) {
      symbol = indianMap[w];
      break;
    }
    if (w.endsWith(".NS")) {
      symbol = w;
      break;
    }
  }

  if (!symbol) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Could not detect Indian stock name"
      })
    };
  }

  const res = await fetch(
    "https://livstox.netlify.app/.netlify/functions/stock-analyzer?symbol=" +
      symbol
  );

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      userPrompt: prompt,
      detectedStock: symbol,
      ...data
    })
  };
}
