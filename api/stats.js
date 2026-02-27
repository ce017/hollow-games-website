export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ROBLOX_API_KEY;
  const mansionId = process.env.MANSION_UNIVERSE_ID;
  const hickamId = process.env.HICKAM_UNIVERSE_ID;

  const universeIds = [mansionId, hickamId].filter(Boolean);

  if (!apiKey || universeIds.length === 0) {
    return res.status(500).json({ error: 'Missing ROBLOX_API_KEY or universe IDs' });
  }

  async function fetchMetrics(universeId) {
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

    return {
      visits: Number(data.visits) || 0,
      favorites: Number(data.favorites) || 0,
    };
  }

  try {
    let totalVisits = 0;
    let totalFavorites = 0;

    for (const id of universeIds) {
      const { visits, favorites } = await fetchMetrics(id);
      totalVisits += visits;
      totalFavorites += favorites;
    }

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate'); // 15 minutes
    res.status(200).json({
      visits: totalVisits,
      favorites: totalFavorites,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching Roblox stats', error);

    // Fallback to the static values you currently show on the site
    res.status(200).json({
      visits: 68900,
      favorites: 403,
      lastUpdated: null,
    });
  }
}

