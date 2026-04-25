export default function Ticker() {
  const items = [
    '🥭 Keri No Achaar','🌶️ Hari Mirch','🧄 Lahsun Achaar',
    '🥕 Mix Sabzi','🍋 Nimbu Achaar','🫙 No Preservatives','🌿 100% Natural',
  ]
  const doubled = [...items, ...items]

  return (
    <div style={{
      background: '#F4A300', padding: '16px 0', overflow: 'hidden',
      borderTop: '3px solid #c78a00', borderBottom: '3px solid #c78a00',
    }}>
      <div style={{
        display: 'inline-flex', whiteSpace: 'nowrap',
        animation: 'ticker 24s linear infinite',
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ margin: '0 22px' }}>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#0C2416' }}>
              {item}
            </span>
            <span style={{ color: 'rgba(12,36,22,0.35)', margin: '0 4px' }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </div>
  )
}
