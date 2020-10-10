import React from 'react'
import Header from 'components/Layout/Header'
import styled from 'styled-components'
import {getViewportDimensions} from 'helpers/DOM'

const LayoutWrapper = styled.div`
  width: 100%;
  height: 100vh;
  justify-content: center;
  display: flex;
  background-color: antiquewhite;
  overflow: hidden;
`
const LayoutContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 769px) {
    margin: 60px;
    height: 90%;
  }
`

const Content = styled.div`
  padding-top: 30px;
  background-color: darkgrey;
  height: 100%;
  overflow: overlay;
`

const Layout = (props) => {
  const {viewportWidth} = getViewportDimensions()

  return (
    <LayoutWrapper viewportWidth={viewportWidth}>
      <LayoutContent>
        <Header />
        <Content>{props.children}</Content>
      </LayoutContent>
    </LayoutWrapper>
  )
}

export default Layout
