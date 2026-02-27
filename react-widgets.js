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

  function OpenRolesWidget() {
    const roles = [
      { title: 'Scripter', tag: 'Scripting', focus: 'Combat, systems, progression' },
      { title: 'Environment Modeler', tag: 'Modeling', focus: 'Maps, props, vehicles' },
      { title: 'GFX Artist', tag: 'Art', focus: 'Thumbnails, logos, UI visuals' },
      { title: 'Animator', tag: 'Animation', focus: 'Characters, weapons, emotes' },
    ];

    const [selectedTag, setSelectedTag] = useState('All');

    const tags = ['All', 'Scripting', 'Modeling', 'Art', 'Animation'];
    const filtered =
      selectedTag === 'All'
        ? roles
        : roles.filter((r) => r.tag.toLowerCase() === selectedTag.toLowerCase());

    return React.createElement(
      'div',
      {
        style: {
          borderRadius: '16px',
          border: '1px solid rgba(148,163,184,0.35)',
          background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.8))',
          padding: '20px 22px',
          maxWidth: '640px',
          margin: '0 auto 26px',
        },
      },
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '14px',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '10px',
          },
        },
        React.createElement(
          'div',
          { style: { fontSize: '14px', fontWeight: 600, color: '#e5e7eb' } },
          'Open collaboration roles'
        ),
        React.createElement(
          'div',
          { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } },
          tags.map((tag) =>
            React.createElement(
              'button',
              {
                key: tag,
                type: 'button',
                onClick: () => setSelectedTag(tag),
                style: {
                  borderRadius: '999px',
                  border:
                    tag === selectedTag
                      ? '1px solid rgba(74,222,128,0.9)'
                      : '1px solid rgba(55,65,81,0.9)',
                  background:
                    tag === selectedTag ? 'rgba(22,163,74,0.18)' : 'rgba(15,23,42,0.9)',
                  color: tag === selectedTag ? '#bbf7d0' : '#9ca3af',
                  fontSize: '11px',
                  padding: '4px 10px',
                  cursor: 'pointer',
                  fontWeight: 600,
                },
              },
              tag
            )
          )
        )
      ),
      React.createElement(
        'div',
        null,
        filtered.map((role, i) =>
          React.createElement(
            'div',
            {
              key: role.title,
              style: {
                padding: '10px 0',
                borderTop: i === 0 ? 'none' : '1px solid rgba(31,41,55,0.9)',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
                flexWrap: 'wrap',
              },
            },
            React.createElement(
              'div',
              null,
              React.createElement(
                'div',
                { style: { fontSize: '13px', fontWeight: 600, color: '#e5e7eb' } },
                role.title
              ),
              React.createElement(
                'div',
                { style: { fontSize: '12px', color: '#9ca3af', marginTop: '2px' } },
                role.focus
              )
            ),
            React.createElement(
              'span',
              {
                style: {
                  alignSelf: 'center',
                  borderRadius: '999px',
                  border: '1px solid rgba(55,65,81,0.9)',
                  padding: '3px 9px',
                  fontSize: '11px',
                  color: '#9ca3af',
                },
              },
              role.tag
            )
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

    const rolesRootEl = document.getElementById('react-open-roles-widget');
    if (rolesRootEl) {
      const root = ReactDOM.createRoot(rolesRootEl);
      root.render(React.createElement(OpenRolesWidget));
    }
  });
})();

