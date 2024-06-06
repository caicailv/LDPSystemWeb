export const queryURLParams = () => {
  if(typeof window === 'undefined') return {}
  const urlParams = new URLSearchParams(window.location.search)
  const params: any = {}
  urlParams.forEach((value, key) => {
    params[key] = value
  })
  return params
}
