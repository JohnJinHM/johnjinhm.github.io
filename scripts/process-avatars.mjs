import path from 'path'
import sharp from 'sharp'

// Square home-page portraits cropped from the full source images. `crop` is the square's
// left/top/size as fractions of the source, so a replacement source at another resolution
// keeps the same framing. Output is a fixed-size JPEG (2x the largest rendered size).
const IMAGES_DIR = path.join(process.cwd(), 'public/static/images')
const SIZE = 640
const AVATARS = [
  {
    src: 'avatar-official.jpg',
    out: 'avatar-official-square.jpg',
    crop: { left: 0.31, top: 0.37, size: 0.36 },
  },
  { src: 'avatar.png', out: 'avatar-casual-square.jpg', crop: { left: 0, top: 0, size: 1 } },
]

for (const { src, out, crop } of AVATARS) {
  const image = sharp(path.join(IMAGES_DIR, src)).rotate()
  const { width, height } = await image.metadata()
  const side = Math.round(Math.min(width, height) * crop.size)
  const info = await image
    .extract({
      left: Math.round(width * crop.left),
      top: Math.round(height * crop.top),
      width: side,
      height: side,
    })
    .resize(SIZE, SIZE)
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(path.join(IMAGES_DIR, out))
  console.log(`${out}: ${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB`)
}
