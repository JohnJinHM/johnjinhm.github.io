// Inline arrow drawn in the same stroke as the header icons; sized to the text.
const paths = {
  left: 'M19 12H5m6-6-6 6 6 6',
  right: 'M5 12h14m-6-6 6 6-6 6',
  external: 'M8 16 16 8m-7 0h7v7',
}

export default function Arrow({ direction }: { direction: keyof typeof paths }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="inline-block h-[1.1em] w-[1.1em] align-[-0.2em]"
    >
      <path d={paths[direction]} />
    </svg>
  )
}
