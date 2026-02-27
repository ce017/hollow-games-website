(function () {
  if (!window.React || !window.ReactDOM) return;

  const { useState, useEffect } = React;

  function HighlightsWidget() {
    const tabs = [
      {
        id: 'community',
        label: 'Community',
        title: 'Built around players',
        body: 'Hangouts, roleplay, and events designed so players keep coming back with their friends.',
        bullets: [
          'Active Discord community',
          'Roblox group announcements',
          'Playtests for new maps',
        ],
      },
      {
        id: 'roadmap',
        label: 'Roadmap',
        title: 'Worlds in development',
        body: 'We are prototyping new experiences that push visuals, performance and replayability.',
        bullets: [
          'New social hub with progression',
          'Co-op mission prototype',
          'Seasonal content drops',
        ],
      },
      {
        id: 'studio',
        label: 'Studio',
        title: 'Focused small team',
        body: 'Two core developers and collaborators bringing experience from multiple Roblox projects.',
        bullets: [
          'Custom systems, not free models',
          'Hand-crafted environments',
          'Iterating based on live data',
        ],
      },
    ];

    const [activeId, setActiveId] = useState(tabs[0].id);
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const id = setInterval(() => {
        setIndex((prev) => {
          const next = (prev + 1) % tabs.length;
          setActiveId(tabs[next].id);
          return next;
        });
      }, 6000);
      return () => clearInterval(id);
    }, []);

    const active = tabs.find((t) => t.id === activeId) || tabs[0];

    return React.createElement(
      'div',
      {
        style: {
          borderRadius: '18px',
          border: '1px solid rgba(148,163,184,0.35)',
          background:
            'radial-gradient(circle at top left, rgba(56,189,248,0.18), transparent 55%), rgba(15,23,42,0.9)',
          padding: '20px 22px',
          maxWidth: '620px',
          margin: '26px auto 0',
        },
      },
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '18px',
            flexWrap: 'wrap',
          },
        },
        React.createElement(
          'div',
          { style: { display: 'flex', gap: '6px', marginBottom: '8px' } },
          tabs.map((tab) =>
            React.createElement(
              'button',
              {
                key: tab.id,
                type: 'button',
                onClick: () => setActiveId(tab.id),
                style: {
                  borderRadius: '999px',
                  border:
                    tab.id === activeId
                      ? '1px solid rgba(96,165,250,0.9)'
                      : '1px solid rgba(148,163,184,0.5)',
                  background:
                    tab.id === activeId
                      ? 'linear-gradient(90deg, #3b82f6, #22d3ee)'
                      : 'rgba(15,23,42,0.9)',
                  color: tab.id === activeId ? '#f9fafb' : '#cbd5f5',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '5px 12px',
                  cursor: 'pointer',
                  fontWeight: 600,
                },
              },
              tab.label
            )
          )
        ),
        React.createElement(
          'div',
          { style: { flex: '1 1 260px' } },
          React.createElement(
            'div',
            {
              style: {
                fontSize: '14px',
                fontWeight: 700,
                marginBottom: '4px',
                color: '#e5e7eb',
              },
            },
            active.title
          ),
          React.createElement(
            'p',
            {
              style: {
                fontSize: '13px',
                color: '#9ca3af',
                lineHeight: 1.7,
                marginBottom: '8px',
              },
            },
            active.body
          ),
          React.createElement(
            'ul',
            {
              style: {
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px 14px',
                fontSize: '12px',
                color: '#9ca3af',
              },
            },
            active.bullets.map((b, i) =>
              React.createElement(
                'li',
                { key: i, style: { display: 'flex', alignItems: 'center', gap: '6px' } },
                React.createElement('span', {
                  style: {
                    width: '6px',
                    height: '6px',
                    borderRadius: '999px',
                    background: '#22c55e',
                    boxShadow: '0 0 8px rgba(34,197,94,0.7)',
                  },
                }),
                b
              )
            )
          )
        ),
        React.createElement(
          'div',
          {
            style: {
              flex: '0 0 170px',
              fontSize: '11px',
              color: '#9ca3af',
              borderLeft: '1px solid rgba(55,65,81,0.8)',
              paddingLeft: '14px',
            },
          },
          React.createElement(
            'div',
            { style: { marginBottom: '6px', fontWeight: 600, color: '#cbd5f5' } },
            'Highlights'
          ),
          React.createElement(
            'div',
            null,
            'Live Roblox visits and favorites data help us decide where to ship updates next.'
          ),
          React.createElement(
            'div',
            { style: { marginTop: '10px', opacity: 0.85 } },
            'We keep our scope tight so every release feels considered and polished.'
          )
        )
      )
    );
  }



  document.addEventListener('DOMContentLoaded', function () {
    const highlightsRootEl = document.getElementById('react-highlights-widget');
    if (highlightsRootEl) {
      const root = ReactDOM.createRoot(highlightsRootEl);
      root.render(React.createElement(HighlightsWidget));
    }
  });
})();


