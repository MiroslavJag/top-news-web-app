import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import * as actions from 'store/actions'
import {connect} from 'react-redux'
import {useTranslation} from 'react-i18next'
import NoImage from 'static/images/no-image-thumbnail.jpg'
import {LANG_CODES} from 'consts.json'
import {Separator, NewsListTitleLang} from 'components/pageComponents/Home'
import Slider from 'components/common/Slider'
import {CATEGORY_NAME} from 'consts.json'
import SingleNews from 'components/common/SingleNews'

const CategoriesPageWrapper = styled.div`
  text-align: left;
`
const CategoryPageTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid lightgrey;
`
const CategoryPageTitle = styled.h1`
  margin: 0 0 15px 0;
  text-align: left;
`
const CategoryContent = styled.div`
  margin: 20px 0 0 20px;
`

type Props = {
  langCode: String,
  setLanguageDisabled: Function,
}

const Categories = ({langCode, setLanguage, setLanguageDisabled}): Props => {
  const [singleNewsData, setSingleNewsData] = useState(null)
  const {t} = useTranslation()

  useEffect(() => {
    if (singleNewsData !== null) {
      setLanguageDisabled(true)
    }
  }, [singleNewsData])


  const renderTopNewsCategories = (
    <CategoriesPageWrapper>
      <CategoryPageTitleWrapper>
        <CategoryPageTitle>{t('TOP_NEWS_TITLE')}</CategoryPageTitle>
        <Separator />
        <NewsListTitleLang>{langCode}</NewsListTitleLang>
        <Separator />
        <CategoryPageTitle>{t('CATEGORIES')}</CategoryPageTitle>
      </CategoryPageTitleWrapper>
      <CategoryContent>
        <Slider category={CATEGORY_NAME.BUSINESS} setSingleNewsData={setSingleNewsData} />
        <Slider category={CATEGORY_NAME.ENTERTAINMENT} setSingleNewsData={setSingleNewsData} />
        <Slider category={CATEGORY_NAME.GENERAL} setSingleNewsData={setSingleNewsData} />
        <Slider category={CATEGORY_NAME.HEALTH} setSingleNewsData={setSingleNewsData} />
        <Slider category={CATEGORY_NAME.SCIENCE} setSingleNewsData={setSingleNewsData} />
        <Slider category={CATEGORY_NAME.SPORTS} setSingleNewsData={setSingleNewsData} />
        <Slider category={CATEGORY_NAME.TECHNOLOGY} setSingleNewsData={setSingleNewsData} />
      </CategoryContent>
    </CategoriesPageWrapper>
  )

  return (
    <>
      {singleNewsData !== null ? (
        <SingleNews singleNewsData={singleNewsData} setSingleNewsData={setSingleNewsData} />
      ) : (
        renderTopNewsCategories
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
