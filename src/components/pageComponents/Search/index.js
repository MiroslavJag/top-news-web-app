import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from 'store/actions'
import {getTopNews} from '../../../services/topNews'
import ErrorView from 'components/Errors/ErrorView'
import {reducePlaceDescLength} from '../../../helpers/strings'
import NoImage from 'static/images/no-image-thumbnail.jpg'
import moment from 'moment'
import {useTranslation} from 'react-i18next'
import SingleNews from 'components/common/SingleNews'
import SkeletonLoader from 'components/common/SkeletonLoader'
import NewsList from 'components/common/NewsList'
import {LANG_CODES} from 'consts.json'
import {API_ROUTES} from 'routes.json'
import {useLocation} from 'react-router-dom'
import {CategoryPageTitle} from 'components/pageComponents/Category'

export const NewsListTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid lightgrey;
  margin: 0 0 20px 0;
`

export const NewsListTitle = styled.h1`
  margin: 0 0 10px 0;
  text-align: left;
`
export const NewsListTitleLang = styled(NewsListTitle)`
  text-transform: uppercase;
`
export const Separator = styled.div`
  margin: 0px 15px 0;
  height: 35px;
  width: 1px;
  background-color: lightgrey;
`
const SearchTextInput = styled.input`
  max-width: 500px;
  width: 100%;
  height: 50px;
  border: 1px solid lightgrey;
  font-size: 20px;
  color: darkslategrey;
  padding-left: 10px;
  margin: 20px 0 40px 0;
`

type Props = {
  langCode: String,
  setLanguageDisabled: Function,
}

const Search = ({langCode, setLanguageDisabled}): Props => {
  const [data, setData] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [singleNewsData, setSingleNewsData] = useState(null)
  const {t} = useTranslation()

  const currentRoute = location.pathname.split('/').pop()

  useEffect(() => {
    fetchTopNews()
  }, [langCode])

  useEffect(() => {
    if (singleNewsData !== null) {
      setLanguageDisabled(true)
    }
  }, [singleNewsData])

  useEffect(() => {
    getSearchResults()
  }, [searchValue])

  const fetchTopNews = async () => {
    const newsData = await getTopNews(API_ROUTES.TOP_HEADLINES, langCode)
    setData(newsData)
  }

  const getSearchResults = () => {
    if (data !== null) {
      const results = data.articles.filter((el) => el.title.toLowerCase().includes(searchValue))
      return results
    }
  }

  const renderTopNewsContent = () =>
    data !== null ? (
      data.error ? (
        <ErrorView refreshCallback={fetchTopNews} />
      ) : (
        <>
          <NewsListTitleWrapper>
            <NewsListTitle>{t('TOP_NEWS_TITLE')}</NewsListTitle>
            <Separator />
            <NewsListTitleLang>{langCode}</NewsListTitleLang>
            <Separator />
            <CategoryPageTitle>{t(currentRoute.toUpperCase())}</CategoryPageTitle>
          </NewsListTitleWrapper>
          <SearchTextInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t('SEARCH_PLACEHOLDER_TEXT')}
          />
          <NewsList data={getSearchResults()} setSingleNewsData={setSingleNewsData} />
        </>
      )
    ) : (
      <SkeletonLoader langCode={langCode} />
    )

  return (
    <>
      {singleNewsData !== null ? (
        <SingleNews singleNewsData={singleNewsData} setSingleNewsData={setSingleNewsData} />
      ) : (
        renderTopNewsContent()
      )}
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    langCode: state.langCode,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setLanguageDisabled: (value) => dispatch(actions.setLanguageDisabled(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
