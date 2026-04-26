export default function Ticker() {
  const items = [
    '🥭 Keri Achaar', '🍋 Nimbu Achaar', '🫙 No Preservatives', '🌿 100% Natural', '🏠 Homemade',
  ]
  const teaser = [
    '✨ New Flavours Adding Soon', '🌶️ Stay Tuned', '🧄 More Coming', '🥕 Watch This Space', '✨ New Flavours Adding Soon',
  ]
  const doubled = [...items, ...items]
  const teaserDoubled = [...teaser, ...teaser]

  return (
    <>
      <div style={{
        background: '#F4A300', padding: '14px 0', overflow: 'hidden',
        borderTop: '3px solid #c78a00', borderBottom: '1px solid #c78a00',
      }}>
        <div style={{ display: 'inline-flex', whiteSpace: 'nowrap', animation: 'ticker 20s linear infinite' }}>
          {doubled.map((item, i) => (
            <span key={i} style={{ margin: '0 22px' }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#0C2416' }}>{item}</span>
              <span style={{ color: 'rgba(12,36,22,0.35)', margin: '0 4px' }}>✦</span>
            </span>
          ))}
        </div>
      </div>
      <div style={{
        background: '#0C2416', padding: '12px 0', overflow: 'hidden',
        borderBottom: '3px solid #1a4330',
      }}>
        <div style={{ display: 'inline-flex', whiteSpace: 'nowrap', animation: 'ticker-rev 18s linear infinite' }}>
          {teaserDoubled.map((item, i) => (
            <span key={i} style={{ margin: '0 22px' }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#FFD166' }}>{item}</span>
              <span style={{ color: 'rgba(255,209,102,0.3)', margin: '0 4px' }}>◆</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes ticker-rev { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
      `}</style>
    </>
  )
}
