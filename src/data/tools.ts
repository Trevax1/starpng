export interface Tool {
  id: string
  name: string
  shortDesc: string
  longDesc: string
  route: string
  color: string
  emoji: string
}

export const TOOLS: Tool[] = [
  {
    id: 'resize',
    name: 'Resize & Crop',
    shortDesc: 'Resize to any dimension or pick a social media preset',
    longDesc: 'Resize images to custom width and height with pixel-level precision',
    route: '/resize',
    color: 'hsl(var(--tool-resize))',
    emoji: '📐',
  },
  {
    id: 'convert',
    name: 'Convert',
    shortDesc: 'Convert between image formats instantly',
    longDesc: 'Convert between PNG, JPG, WebP, and BMP formats',
    route: '/convert',
    color: 'hsl(var(--tool-convert))',
    emoji: '🔄',
  },
  {
    id: 'compress',
    name: 'Compress',
    shortDesc: 'Reduce file size by up to 80% without losing quality',
    longDesc: 'Compress images and reduce file size with quality control',
    route: '/compress',
    color: 'hsl(var(--tool-compress))',
    emoji: '⚡',
  },
  {
    id: 'filters',
    name: 'Filters & Effects',
    shortDesc: 'Adjust brightness, contrast, saturation & more',
    longDesc: 'Apply professional filters and effects to your images',
    route: '/filters',
    color: 'hsl(var(--tool-filter))',
    emoji: '✨',
  },
  {
    id: 'background-remover',
    name: 'Background Remover',
    shortDesc: 'Fast, private cutouts with AI-powered edge cleanup',
    longDesc: 'Remove image backgrounds with AI precision',
    route: '/background-remover',
    color: 'hsl(var(--tool-bgremove))',
    emoji: '🎭',
  },
  {
    id: 'watermark',
    name: 'Watermark Maker',
    shortDesc: 'Add custom text watermarks to your images',
    longDesc: 'Protect your images with custom text watermarks',
    route: '/watermark',
    color: 'hsl(var(--tool-watermark))',
    emoji: '💧',
  },
  {
    id: 'rotate',
    name: 'Rotate & Flip',
    shortDesc: 'Rotate, flip, and straighten your images',
    longDesc: 'Rotate images to any angle from -180° to 180°',
    route: '/rotate',
    color: 'hsl(var(--tool-rotate))',
    emoji: '🔃',
  },
  {
    id: 'blur',
    name: 'Blur & Censor',
    shortDesc: 'Blur or pixelate sensitive areas of images',
    longDesc: 'Blur or pixelate areas with brush-based painting',
    route: '/blur',
    color: 'hsl(var(--tool-blur))',
    emoji: '🌫️',
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    shortDesc: 'Extract colors from any image instantly',
    longDesc: 'Pick pixel colors and extract a full color palette',
    route: '/color-picker',
    color: 'hsl(var(--tool-colorpicker))',
    emoji: '🎨',
  },
  {
    id: 'meme-generator',
    name: 'Meme Generator',
    shortDesc: 'Add top and bottom text to create memes',
    longDesc: 'Classic meme generator with Impact font and full customization',
    route: '/meme-generator',
    color: 'hsl(var(--tool-meme))',
    emoji: '😂',
  },
]

export const TOOL_META: Record<string, { title: string; description: string }> = {
  resize: {
    title: 'Resize Images Online Free — StarPNG',
    description: 'Resize and crop images to any dimension for free. Social media presets for Instagram, Facebook, Twitter & more. No uploads, 100% private.',
  },
  convert: {
    title: 'Convert Images Online Free — PNG, JPG, WebP | StarPNG',
    description: 'Convert images between PNG, JPG, WebP, and BMP formats instantly. Free online converter with no quality loss and no uploads.',
  },
  compress: {
    title: 'Compress Images Online Free — StarPNG',
    description: 'Compress images and reduce file size by up to 80% without losing quality. Free, private, no uploads required.',
  },
  filters: {
    title: 'Image Filters & Effects Online Free — StarPNG',
    description: 'Apply brightness, contrast, saturation, grayscale, sepia, and more. Free online image filter tool with instant preview.',
  },
  'background-remover': {
    title: 'Remove Image Background Free — StarPNG',
    description: 'Remove backgrounds from photos with AI precision. Fast, free, and 100% private. Works with photos, products, and portraits.',
  },
  watermark: {
    title: 'Add Watermark to Image Free — StarPNG',
    description: 'Add custom text watermarks to protect your images. Free, no uploads, instant download.',
  },
  rotate: {
    title: 'Rotate & Flip Images Online Free — StarPNG',
    description: 'Rotate images to any angle and flip horizontally or vertically. Free, instant, no uploads.',
  },
  blur: {
    title: 'Blur & Censor Images Online Free — StarPNG',
    description: 'Blur or pixelate sensitive areas in your images. Paint-to-blur with adjustable brush. Free, private, no uploads.',
  },
  'color-picker': {
    title: 'Image Color Picker & Palette Extractor — StarPNG',
    description: 'Pick colors from any image and extract a full color palette. Get HEX, RGB, and HSL values instantly.',
  },
  'meme-generator': {
    title: 'Meme Generator Online Free — StarPNG',
    description: 'Create memes with custom top and bottom text. Classic Impact font, no watermarks, instant download.',
  },
}

export const SOCIAL_PRESETS = [
  { name: 'Instagram Post', width: 1080, height: 1080 },
  { name: 'Instagram Story', width: 1080, height: 1920 },
  { name: 'Facebook Post', width: 1200, height: 630 },
  { name: 'Twitter/X Post', width: 1600, height: 900 },
  { name: 'YouTube Thumbnail', width: 1280, height: 720 },
  { name: 'LinkedIn Post', width: 1200, height: 627 },
]
