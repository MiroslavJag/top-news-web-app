import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import * as actions from 'store/actions'
import NoImage from 'static/images/no-image-thumbnail.jpg'
import {useTranslation} from 'react-i18next'
import {formatDate} from '../../../helpers/strings'
import {NewsPublishedTime} from 'components/pageComponents/Home'
import icons from '../../../static/icons'

const SingleNewsWrapper = styled.div`
  height: 100%;
  max-width: 800px;
  width: 100%;
  padding: 0 10px;
  margin: 0 auto;
  text-align: left;
`
const SingleNewsTitleWrapper = styled.div`
  width: 100%;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 10px;
`

const SingleNewsTitle = styled.h1`
  margin: 10px 0;
`
const SingleNewsImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: top;
  margin-bottom: 10px;
`
const BackLink = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid lightgrey;
  padding: 10px 0 30px;
  cursor: pointer;
`
const SingleNewsContent = styled.p`
  margin: 10px 0 30px;
`

const SingleNewsBackArrow = styled.img`
  height: 15px;
  align-self: center;
  margin-right: 5px;
`
const SingleNewsBackText = styled.p`
  font-weight: bold;
  color: grey;
  text-decoration: underline;
  margin: 5px 0;

  &:hover {
    color: darkslategrey;
  }
`

type Props = {
  singleNewsData: Object,
  setSingleNewsData: Function,
  setLanguageDisabled: Boolean,
}

const SingleNews = ({singleNewsData, setSingleNewsData, setLanguageDisabled}): Props => {
  const {author, content, description, publishedAt, source, title, urlToImage} = singleNewsData
  const {t} = useTranslation()

  return (
    <SingleNewsWrapper>
      <NewsPublishedTime>{`${source.name} | ${author}`}</NewsPublishedTime>
      <SingleNewsTitleWrapper>
        <SingleNewsTitle>{title}</SingleNewsTitle>
      </SingleNewsTitleWrapper>
      <NewsPublishedTime>{formatDate(publishedAt)}</NewsPublishedTime>
      <SingleNewsImage src={urlToImage} onError={(e) => (e.target.src = NoImage)} />
      <SingleNewsContent>{content}</SingleNewsContent>
      <BackLink
        onClick={() => {
          setSingleNewsData(null), setLanguageDisabled(false)
        }}
      >
        <SingleNewsBackArrow src={icons.arrows.left} />
        <SingleNewsBackText>{t('BACK_TO_LIST')}</SingleNewsBackText>
      </BackLink>
    </SingleNewsWrapper>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguageDisabled: (value) => dispatch(actions.setLanguageDisabled(value)),
  }
}

export default connect(null, mapDispatchToProps)(SingleNews)
