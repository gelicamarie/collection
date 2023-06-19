export function getColor({ publicAddress, index }: { publicAddress: string; index: number }) {
  const colorSeed = parseInt(publicAddress, 16) * (index + 1)

  const random = Math.abs(Math.sin(colorSeed) * 10000)

  const h = Math.floor(colorSeed % 454) + 120
  const s = Math.floor(colorSeed % 300) + 70
  const l = Math.floor(colorSeed % 200) + 70

  const rgb = hslToRgb({ h: h / 360, s: s / 100, l: l / 100 })
  const [r, g, b] = rgb.map((val) => Math.round(val * 255))

  return `rgb(${r}, ${g}, ${b})`
}

function hslToRgb({ h, s, l }: { h: number; s: number; l: number }) {
  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = ({ p, q, t }: { p: number; q: number; t: number }) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb({ p, q: q, t: h + 1 / 3 })
    g = hue2rgb({ p, q, t: h })
    b = hue2rgb({ p, q, t: h - 1 / 3 })
  }

  return [r, g, b]
}
