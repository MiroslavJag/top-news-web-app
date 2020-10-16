import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {NewsListWrapper} from 'components/common/NewsList'
import {
  NewsListTitle,
  NewsListTitleWrapper,
  NewsListTitleLang,
  Separator,
} from 'components/pageComponents/Home'
import {CategoryPageTitle} from 'components/pageComponents/Category'
import {useTranslation} from 'react-i18next'

const SkeltonLoaderWrapper = styled.div`
  max-width: 500px;
  width: 100%;

  @media only screen and (min-width: 768px) {
    max-width: 300px;
    margin: 20px 5px 20px 20px;
  }
  @media only screen and (min-width: 1024px) {
    max-width: 350px;
  }
`

const SkeltonLoaderElement = styled.div`
  background-color: lightgrey;
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
const LoaderTitle = styled(SkeltonLoaderElement)`
  height: 20px;
  margin-bottom: 10px;
`
const LoaderImage = styled(SkeltonLoaderElement)`
  height: 200px;
  margin-bottom: 10px;
`
const LoaderContent = styled(SkeltonLoaderElement)`
  height: 40px;
  margin-bottom: 40px;
`

type Props = {
  langCode: String,
  category?: String,
}

const SkeletonLoader = ({langCode, category}): Props => {
  const {t} = useTranslation()

  const renderContent = () => {
    const loaderRows = []
    for (let i = 0; i < 6; i++) {
      loaderRows.push(
        <SkeltonLoaderWrapper key={i}>
          <LoaderTitle />
          <LoaderTitle />
          <LoaderTitle style={{width: '100px'}} />
          <LoaderImage />
          <LoaderContent />
        </SkeltonLoaderWrapper>
      )
    }
    return loaderRows
  }

  return (
    <>
      <NewsListTitleWrapper>
        <NewsListTitle>{t('TOP_NEWS_TITLE')}</NewsListTitle>
        <Separator />
        <NewsListTitleLang>{langCode}</NewsListTitleLang>
        {category ? (
          <>
            <Separator />
            <CategoryPageTitle>{category}</CategoryPageTitle>
          </>
        ) : null}
      </NewsListTitleWrapper>
      <NewsListWrapper>{renderContent()}</NewsListWrapper>
    </>
  )
}

export default SkeletonLoader
