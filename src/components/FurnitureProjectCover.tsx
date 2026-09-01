export function FurnitureProjectCover({ alt }: { alt: string }) {
  return (
    <div className="furniture-cover-showcase" role="img" aria-label={alt}>
      <div className="furniture-cover-copy">
        <div className="furniture-cover-tags"><span>UX CASE STUDY</span><span>UI DESIGN</span></div>
        <p className="furniture-cover-kicker">MY FURNITURE STORE</p>
        <h2>Furniture<br />for real<br /><i>homes.</i></h2>
        <div className="furniture-cover-mark"><b>JZ.</b><span>2025 · RESPONSIVE REDESIGN</span></div>
      </div>
      <div className="furniture-cover-devices" aria-hidden="true">
        <div className="furniture-cover-laptop"><div className="cover-browser"><i /><i /><i /></div><img src="/images/furniture/desktop-home.png" alt="" /></div>
        <div className="furniture-cover-tablet"><img src="/images/furniture/desktop-product.png" alt="" /></div>
        <div className="furniture-cover-phone furniture-cover-phone-main"><div className="cover-dynamic-island" /><img src="/images/furniture/mobile-home.png" alt="" /></div>
        <div className="furniture-cover-phone furniture-cover-phone-side"><div className="cover-dynamic-island" /><img src="/images/furniture/mobile-living.png" alt="" /></div>
        <span className="furniture-cover-label">DESKTOP · MOBILE<br />END-TO-END FLOW</span>
      </div>
    </div>
  )
}
