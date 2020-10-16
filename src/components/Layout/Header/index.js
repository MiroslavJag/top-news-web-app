import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import NavigationItems from 'components/Navigation/NavigationItems'
import {useTranslation} from 'react-i18next'
import {connect} from 'react-redux'
import * as actions from 'store/actions'
import {LANG_CODES, TOP_NEWS_LANG} from 'consts.json'
import {useLocation, useHistory} from 'react-router-dom'
import {Separator} from 'components/pageComponents/Home'

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
  margin-right: 20px;
`

const LangItem = styled.button`
  font-size: 14px;
  padding: 0;
  border: none;
  background-color: white;
  outline-color: white;
  cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};
  color: ${(props) =>
    props.disabled ? 'lightgrey' : props.langCode === props.value ? 'darkcyan' : 'darkslategrey'};

  &:hover {
    color: ${(props) =>
      props.disabled ? 'lightgrey' : props.langCode === props.value ? 'darkcyan' : 'grey'};
  }
`
const LangSeparator = styled.div`
  margin: 0 15px 0;
  height: 20px;
  width: 1px;
  background-color: lightgrey;
`

type Props = {
  setLanguage: Function,
  langCode: String,
  langDisabled: Boolean,
}

const Header = ({setLanguage, langCode, langDisabled, route}): Props => {
  const {t, i18n} = useTranslation()
  const location = useLocation()
  const history = useHistory()
  const currentRoute = location.pathname.substring(4)

  const changeLanguage = (langCode) => {
    localStorage.setItem(TOP_NEWS_LANG, langCode)
    setLanguage(langCode)
    i18n.changeLanguage(langCode)
    if (currentRoute.length > 2) {
      history.push(`/${langCode}/${currentRoute}`)
    } else {
      history.push(`/${langCode}`)
    }
  }

  return (
    <HeaderWrapper>
      <NavigationItems />
      <LanguageSection>
        <LangItem
          onClick={() => changeLanguage(LANG_CODES.GB)}
          langCode={langCode}
          value={LANG_CODES.GB}
          disabled={langDisabled}
        >
          {t('GB')}
        </LangItem>
        <LangSeparator />
        <LangItem
          onClick={() => changeLanguage(LANG_CODES.US)}
          langCode={langCode}
          value={LANG_CODES.US}
          disabled={langDisabled}
          id={'langUS'}
        >
          {t('US')}
        </LangItem>
      </LanguageSection>
    </HeaderWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    langCode: state.langCode,
    langDisabled: state.langDisabled,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (langCode) => dispatch(actions.setLanguage(langCode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
