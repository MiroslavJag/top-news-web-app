import React from 'react'
import Header from 'components/Layout/Header'
import styled from 'styled-components'
import {getViewportDimensions} from 'helpers/DOM'

const LayoutWrapper = styled.div`
  width: 100%;
  height: 100vh;
  justify-content: center;
  display: flex;
  overflow: hidden;
  background-color: lightgrey;
`
const LayoutContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  color: darkslategrey;

  @media only screen and (min-width: 1024px) {
    margin: 60px;
    height: 90%;
  }
`

const Content = styled.div`
  padding: 15px;
  background-color: white;
  height: 100%;
  overflow: overlay;

  @media only screen and (min-width: 768px) {
    padding: 15px 25px
  }

  @media only screen and (min-width: 1024px) {
    padding: 15px 50px;
  }
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
