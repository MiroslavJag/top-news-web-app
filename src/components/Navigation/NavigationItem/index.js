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
type Props ={
  link: String,
  children: String
}

const NavigationItem = ({link, children}): Props => (
  <LinkWrapper>
    <NavigationLink to={link} exact>
      {children}
    </NavigationLink>
  </LinkWrapper>
)

export default NavigationItem
