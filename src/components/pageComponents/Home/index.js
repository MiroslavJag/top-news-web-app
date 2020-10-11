import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {getTopNews} from '../../../services/topNews'
import ErrorView from 'components/Errors/ErrorView'
import {reducePlaceDescLength} from '../../../helpers/string'
import NoImage from 'static/images/no-image-thumbnail.jpg'
import moment from 'moment'
import {useTranslation} from 'react-i18next'

const NewsList = styled.div`
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
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 10px;
  cursor: pointer;
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

const NewsPublishedTime = styled.p`
  margin: 0 0 10px 0;
  font-size: 13px;
  color: grey;
`

const Home = () => {
  const [data, setData] = useState(null)
  const [image, setImage] = useState()
  const {t} = useTranslation()

  useEffect(() => {
    fetchTopNews()
  }, [])

  const fetchTopNews = async (route) => {
    const newsData = await getTopNews('top-headlines', 'us')
    setData(newsData)
  }

  const news = () =>
    data.articles.map((el, index) => {
      return (
        <NewsRow key={index}>
          <NewsTitleWrapper>
            <NewsTitle>{el.title}</NewsTitle>
          </NewsTitleWrapper>
          <NewsPublishedTime>{moment(el.publishedAt).format('MMM DD | HH:mm')}</NewsPublishedTime>
          <NewsImage src={el.urlToImage} onError={(e) => (e.target.src = NoImage)} />
          <NewsDesc>{el.description}</NewsDesc>
          <NewsMoreLink>{t('READ_MORE')}</NewsMoreLink>
        </NewsRow>
      )
    })

  console.log(data)

  const renderContent = () =>
    data !== null ? (
      data.error ? (
        <ErrorView refreshCallback={fetchTopNews} />
      ) : (
        <NewsList>{news()}</NewsList>
      )
    ) : (
      <>
        <h1>Loading</h1>
      </>
    )

  return <>{renderContent()}</>
}

export default Home
