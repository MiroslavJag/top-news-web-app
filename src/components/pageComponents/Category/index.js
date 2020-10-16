import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import * as actions from 'store/actions'
import {connect} from 'react-redux'
import {useTranslation} from 'react-i18next'
import NoImage from 'static/images/no-image-thumbnail.jpg'
import {LANG_CODES} from 'consts.json'
import {Separator, NewsListTitleLang} from 'components/pageComponents/Home'
import SingleNews from 'components/common/SingleNews'
import {getTopNews} from '../../../services/topNews'
import {useLocation} from 'react-router-dom'
import NewsList from 'components/common/NewsList'
import SkeletonLoader from 'components/common/SkeletonLoader'
import {API_ROUTES} from 'routes.json'
import {CATEGORY_NAME} from 'consts.json'
import ErrorFourZeroFour from 'components/Errors/ErrorFourZeroFour'

const CategoriesPageWrapper = styled.div`
  text-align: left;
`
const CategoryPageTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid lightgrey;
`
export const CategoryPageTitle = styled.h1`
  margin: 0 0 10px 0;
  text-align: left;
  text-transform: capitalize;
`
const CategoryContent = styled.div`
  margin: 20px 0 0 20px;
`

type Props = {
  langCode: String,
  setLanguageDisabled: Function,
}

const Categories = ({langCode, setLanguage, setLanguageDisabled}): Props => {
  const [data, setData] = useState(null)
  const [singleNewsData, setSingleNewsData] = useState(null)
  const {t} = useTranslation()

  const currentRoute = location.pathname.split('/').pop()

  useEffect(() => {
    setData(null)
    fetchTopNewsByCategory()
  }, [langCode, currentRoute])

  useEffect(() => {
    if (singleNewsData !== null) {
      setLanguageDisabled(true)
    }
  }, [singleNewsData])

  const fetchTopNewsByCategory = async (route) => {
    const newsData = await getTopNews(API_ROUTES.TOP_HEADLINES, langCode, currentRoute)
    setData(newsData)
  }

  const isValidCategoryRoute = (currentRoute) => {
    let routeExist = false
    Object.values(CATEGORY_NAME).map((el) => {
      if (currentRoute === el) {
        routeExist = true
      }
    })
    if (routeExist) {
      return renderContent()
    } else {
      return <ErrorFourZeroFour />
    }
  }

  const pageTitleSection = (
    <CategoryPageTitleWrapper>
      <CategoryPageTitle>{t('TOP_NEWS_TITLE')}</CategoryPageTitle>
      <Separator />
      <NewsListTitleLang>{langCode}</NewsListTitleLang>
      <Separator />
      <CategoryPageTitle>{t(currentRoute.toUpperCase())}</CategoryPageTitle>
    </CategoryPageTitleWrapper>
  )

  const renderContent = () =>
    data !== null ? (
      <CategoriesPageWrapper>
        {pageTitleSection}
        <CategoryContent>
          <NewsList data={data.articles} setSingleNewsData={setSingleNewsData} />
        </CategoryContent>
      </CategoriesPageWrapper>
    ) : (
      <SkeletonLoader langCode={langCode} category={currentRoute} />
    )

  return (
    <>
      {singleNewsData !== null ? (
        <SingleNews singleNewsData={singleNewsData} setSingleNewsData={setSingleNewsData} />
      ) : (
        isValidCategoryRoute(currentRoute)
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
    setLanguage: (langCode) => dispatch(actions.setLanguage(langCode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
