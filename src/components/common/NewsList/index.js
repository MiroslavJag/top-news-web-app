import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next'
import NoImage from 'static/images/no-image-thumbnail.jpg'
import moment from 'moment'
import {formatDate} from '../../../helpers/strings'

export const NewsListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const NewsRow = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 20px;
  text-align: left;

  @media only screen and (min-width: 768px) {
    max-width: 300px;
    margin: 0 20px 20px 0;
  }
  @media only screen and (min-width: 1024px) {
    max-width: 350px;
  }
`
const NewsTitleWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  display: -webkit-box;
  height: 68px;
  margin-bottom: 5px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`

const NewsTitle = styled.h3`
  margin: 0;
  height: 100%;
`

const NewsImage = styled.img`
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
  object-position: top;
  object-fit: cover;
  cursor: pointer;
`
export const NewsPublishedTime = styled.p`
  margin: 0 0 10px 0;
  font-size: 13px;
  color: grey;
`
const NewsDesc = styled.p`
  margin: 0 0 10px 0;
`
const NewsMoreLink = styled.p`
  margin: auto 0 0;
  font-weight: bold;
  color: grey;
  align-self: flex-end;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: darkslategrey;
  }
`

type Props = {
  data: Object,
  setSingleNewsData: Function,
}

const NewsList = ({data, setSingleNewsData}): Props => {
  const {t} = useTranslation()

  const renderNewsList = () =>
    data.map((el, index) => {
      return (
        <NewsRow key={index}>
          <NewsTitleWrapper>
            <NewsTitle>{el.title}</NewsTitle>
          </NewsTitleWrapper>
          <NewsPublishedTime>{formatDate(el.publishedAt)}</NewsPublishedTime>
          <NewsImage
            src={el.urlToImage || NoImage}
            onError={(e) => (e.target.src = NoImage)}
            onClick={() => setSingleNewsData(el)}
          />
          <NewsDesc>{el.description}</NewsDesc>
          <NewsMoreLink onClick={() => setSingleNewsData(el)}>{t('READ_MORE')}</NewsMoreLink>
        </NewsRow>
      )
    })

  return <NewsListWrapper>{renderNewsList()}</NewsListWrapper>
}

export default NewsList
