export function getViewportDimensions() {
  let viewportWidth = undefined
  let viewportHeight = undefined

  if (process.browser && window.document) {
    viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || undefined)
    viewportHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || undefined
    )
  }

  return {viewportWidth, viewportHeight}
}
