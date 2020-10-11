import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

const LinkWrapper = styled.li`
  padding: 0 20px;
`

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  font-size: large;
  color: darkslategrey;

  :hover {
    color: grey;
  }

  &.active {
    color: darkcyan;
  }
`

const NavigationItem = (props) => (
  <LinkWrapper>
    <NavigationLink to={props.link} exact>
      {props.children}
    </NavigationLink>
  </LinkWrapper>
)

export default NavigationItem
