# Footer and Contact reference sphere

The implementation is in `src/styles.css`. Footer and Contact now share one decorative CSS circle instead of the previous soft radial glow. Their content and layout are unchanged; the homepage's two rotating spheres are not modified.

| Parameter | Desktop/tablet (768px and wider) | Mobile (up to 767px) |
| --- | --- | --- |
| Diameter | 58vw | 140vw |
| Right offset | 0px | −48vw |
| Top offset | 0px | 48px |
| Shape | 50% border radius | 50% border radius |
| Motion | Static | Static |

The linear gradient runs downwards at 180°: blue-grey `#7A9ACC` at 30% opacity at 0%, `#0066FF` at 13% opacity at 38%, and `#0066FF` fully transparent at 72%. The blue-grey top is matched to the latest Footer screenshot, whose top-cap colour is approximately RGB 40/54/78 over the navy base. Using white at 30% would make that cap significantly brighter. Homepage sphere colours remain unchanged.

```css
.site-footer,.contact-page {
  position:relative;
  isolation:isolate;
  overflow:clip;
  --contact-sphere-size:58vw;
  --contact-sphere-right:0px;
  --contact-sphere-top:0px;
}
.site-footer::before,.contact-page::before {
  content:'';
  position:absolute;
  z-index:-1;
  pointer-events:none;
  width:var(--contact-sphere-size);
  height:var(--contact-sphere-size);
  right:var(--contact-sphere-right);
  top:var(--contact-sphere-top);
  border-radius:50%;
  background:linear-gradient(180deg,rgba(122,154,204,.3) 0%,rgba(0,102,255,.13) 38%,rgba(0,102,255,0) 72%);
}
@media(max-width:767px) {
  .site-footer,.contact-page {
    --contact-sphere-size:140vw;
    --contact-sphere-right:-48vw;
    --contact-sphere-top:48px;
  }
}
```

Both containers have the solid base `#050b18`. `isolation:isolate` keeps the negative background layer inside the section; `overflow:clip` prevents its oversize mobile circle creating a horizontal scrollbar. `pointer-events:none` leaves email, LinkedIn and Back to Top controls operable. No raster image, new JavaScript animation, dependency or network request is added.

Contact's initial top navigation is transparent so its gradient circle is not cut by a dark horizontal band. The existing solid compact navigation is retained after scrolling.

The shared Footer appears on Home and About only. Case-study footer removals remain intact, and Contact does not gain a duplicate Footer. The existing Contact headline, two email addresses, LinkedIn link and opportunity note remain unchanged.

Mobile headline size is fitted to the available width so the newly clipped decorative container does not conceal any text: Footer uses `min(15vw, 5.6rem)` and Contact uses `min(15vw, 6.2rem)` inside the existing mobile breakpoint. Desktop headline typography and all copy are unchanged.
