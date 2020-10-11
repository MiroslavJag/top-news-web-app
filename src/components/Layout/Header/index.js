import React from 'react'
import styled from 'styled-components'
import NavigationItems from 'components/Navigation/NavigationItems'
import {useTranslation} from 'react-i18next'

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid lightgrey;
  position: relative;
  width: 100%;
  height: 60px;
  background-color: white;
`
const LanguageSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  cursor: pointer;

  p:nth-child(2) {
    cursor: auto;
    &:hover {
      color: darkslategrey;
    }
  }

  p:nth-child(3) {
    margin-right: 20px;
  }
`

const LangItem = styled.p`
  font-size: 14px;
  margin: 0 5px;
  color: darkslategrey;

  &:hover {
    color: grey;
  }
`

const Header = () => {
  const {t, i18n} = useTranslation()

  const changeLanguage = (code) => {
    i18n.changeLanguage(code)
  }

  return (
    <HeaderWrapper>
      <NavigationItems />
      <LanguageSection>
        <LangItem onClick={() => changeLanguage('gb')}>GB</LangItem>
        <LangItem>|</LangItem>
        <LangItem onClick={() => changeLanguage('us')}>US</LangItem>
      </LanguageSection>
    </HeaderWrapper>
  )
}

export default Header
