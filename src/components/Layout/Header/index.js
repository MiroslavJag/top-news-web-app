import React from 'react'
import styled from 'styled-components'
import NavigationItems from 'components/Navigation/NavigationItems'

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: lightgrey;
  position: relative;
  width: 100%;
  height: 60px;
`
const LanguageSection = styled.div`

`

const LangItem = styled.p`

`

const Header = () => {
  return (
    <HeaderWrapper>
      <NavigationItems />
    </HeaderWrapper>
  )
}

export default Header
