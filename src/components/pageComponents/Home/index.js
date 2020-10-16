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

const NewsSectionWrapper = styled.div`
  width: 100%;
  justify-content: center;
`

export const NewsPublishedTime = styled.p`
  margin: 0 0 10px 0;
  font-size: 13px;
  color: grey;
`

const LoadingSkeltonWrapper = styled.div`
  background-color: lightgrey;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  height: 100px;
  width: 100%;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(to right, transparent 0%, #e8e8e8 50%, transparent 100%);
    animation: load 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes load {
    from {
      left: -150px;
    }
    to {
      left: 100%;
    }
  }
`

type Props = {
  langCode: String,
  setLanguageDisabled: Function,
}

const Home = ({langCode, setLanguageDisabled}): Props => {
  const [data, setData] = useState(null)
  const [singleNewsData, setSingleNewsData] = useState(null)
  const {t} = useTranslation()

  useEffect(() => {
    fetchTopNews()
  }, [langCode])

  useEffect(() => {
    if (singleNewsData !== null) {
      setLanguageDisabled(true)
    }
  }, [singleNewsData])

  const fetchTopNews = async () => {
    const newsData = await getTopNews(API_ROUTES.TOP_HEADLINES, langCode)
    setData(newsData)
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
          </NewsListTitleWrapper>
          <NewsList data={data.articles} setSingleNewsData={setSingleNewsData} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
