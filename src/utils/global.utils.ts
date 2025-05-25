const setPageTitle = (title: string) => {
  document.title = `${title} - MockIn`
}

const isClickingOutside = (
  elementSrc: HTMLElement,
  targetElement: HTMLElement,
  cb: (isFound: boolean, elementFound: HTMLElement | null) => void,
) => {
  if (elementSrc === targetElement) return cb(true, elementSrc)
  let parent = elementSrc.parentElement
  while (parent && parent !== targetElement) parent = parent.parentElement
  if (!parent || (parent && parent !== targetElement)) return cb(false, parent)
}

const extractInitials = (displayName: string) => {
  let result = ''
  for (const word of displayName.split(' ')) {
    result += word.substring(0, 1)
  }
  return result
}

export default {
  extractInitials,
  setPageTitle,
  isClickingOutside,
}
