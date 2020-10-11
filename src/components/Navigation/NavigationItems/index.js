import React from 'react'
import styled from 'styled-components'
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

const NavigationItems = () => (
  <NavigationList>
    <NavigationItem link={TOP_NEWS.link} exact>
      {TOP_NEWS.text}
    </NavigationItem>
    <NavigationItem link={CATEGORIES.link}>{CATEGORIES.text}</NavigationItem>
    <NavigationItem link={SEARCH.link}>{SEARCH.text}</NavigationItem>
  </NavigationList>
)

export default NavigationItems
