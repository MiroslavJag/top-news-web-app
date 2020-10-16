import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'
import {TOP_NEWS} from 'routes.json'

export const ErrorButton = styled.button`
  border-radius: 8px;
  border: none;
  height: 40px;
  width: 100px;
  cursor: pointer;
  background-color: lightgrey;
  margin-top: 30px;

  &:hover {
    background-color: #d0dcdc;
  }
`
export const ErrorContentWrapper = styled.div`
  margin-top: 50px;

  > h1 {
    margin: 0;
  }
  > h3 {
    margin: 10px 0 0;
  }
`
type Props = {
  langCode: String,
}

const ErrorView = ({langCode}): Props => {
  const {t} = useTranslation()
  return (
    <ErrorContentWrapper>
      <h1>{t('ERRORS.PAGE_NOT_EXIST_TITLE')}</h1>
      <h3>{t('ERRORS.PAGE_NOT_EXIST_MESSAGE')}</h3>

      <Link to={`/${langCode}`}>
        <ErrorButton>{t('GO_BACK')}</ErrorButton>
      </Link>
    </ErrorContentWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    langCode: state.langCode,
  }
}

export default connect(mapStateToProps, null)(ErrorView)
