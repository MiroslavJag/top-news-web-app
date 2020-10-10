import React from 'react'
import styled from 'styled-components'
import NavigationItems from 'components/Navigation/NavigationItems'

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgrey;
  position: relative;
  width: 100%;
  height: 60px;
  background-color: white;
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
