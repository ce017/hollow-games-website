export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ROBLOX_API_KEY;
  const { universeId } = req.query || {};

  if (!apiKey || !universeId) {
    return res.status(400).json({ error: 'Missing ROBLOX_API_KEY or universeId query param' });
  }

  try {
    const response = await fetch(
      `https://apis.roblox.com/universes/v1/${universeId}/metrics?metrics=Visits,Favorites`,
      {
        headers: { 'x-api-key': apiKey },
      }
    );

    if (!response.ok) {
      throw new Error(`Roblox API error: ${response.status}`);
    }

    const data = await response.json();

    const visits = Number(data.visits) || 0;
    const favorites = Number(data.favorites) || 0;

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate'); // 15 minutes
    res.status(200).json({
      visits,
      favorites,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching Roblox game stats', error);
    res.status(200).json({
      visits: null,
      favorites: null,
      lastUpdated: null,
    });
  }
}

