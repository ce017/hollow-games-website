export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const UNIVERSE_ID = process.env.UNIVERSE_ID;
  const API_KEY = process.env.API_KEY;

  if (!UNIVERSE_ID || !API_KEY) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  try {
    const response = await fetch(
      `https://apis.roblox.com/universes/v1/${UNIVERSE_ID}/metrics?metrics=Visits,Favorites`,
      {
        headers: { 'x-api-key': API_KEY },
      }
    );

    if (!response.ok) {
      throw new Error(`Roblox API error: ${response.status}`);
    }

    const data = await response.json();
    const visits = data.visits || 179;
    const favorites = data.favorites || 5;

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json({ visits, favorites, lastUpdated: new Date().toISOString() });
  } catch (error) {
    console.error(error);
    res.status(200).json({ visits: 179, favorites: 5, lastUpdated: null });
  }
}
