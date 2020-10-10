import {ERRORS} from 'consts.json'

const newsApiUrlBase = process.env.REACT_APP_NEWS_API_BASE_URL
const newsApiKey = process.env.REACT_APP_NEWS_API_KEY

export const getTopNews = async (route, country) => {
  const response = await fetch(`${newsApiUrlBase}${route}?country=${country}&apiKey=${newsApiKey}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        return {error: ERRORS.API_ERROR}
      }
    })
    .then((data) => {
      return data
    })
    .catch((e) => {
      throw new Error()
    })
  return response
}
