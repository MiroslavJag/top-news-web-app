import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import NavigationItem from 'components/Navigation/NavigationItem'
import {TOP_NEWS, CATEGORIES, SEARCH} from 'routes.json'

const NavigationList = styled.ul`
  list-style-type: none;
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 0;
  margin: 0;
`

type Props = {
  langCode: String
}

const NavigationItems = ({langCode}): Props => (
  <NavigationList>
    <NavigationItem link={`/${langCode}`} exact>
      {TOP_NEWS.text}
    </NavigationItem>
    <NavigationItem link={`/${langCode}${CATEGORIES.link}`}>{CATEGORIES.text}</NavigationItem>
    <NavigationItem link={`/${langCode}${SEARCH.link}`}>{SEARCH.text}</NavigationItem>
  </NavigationList>
)
const mapStateToProps = (state) => {
  return {
    langCode: state.langCode,
  }
}

export default connect(mapStateToProps, null)(NavigationItems)
