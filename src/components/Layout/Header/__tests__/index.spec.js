import React from 'react'
import {mount} from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Header from 'components/Layout/Header'
import {BrowserRouter} from 'react-router-dom'

describe('<Header />', () => {
  it('match snapshot', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Header t={(k) => k} />
        </BrowserRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('should render correctly with all needed components', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    expect(wrapper.find('NavigationItems__NavigationList')).toHaveLength(1)
    expect(wrapper.find('Header__LanguageSection')).toHaveLength(1)
  })
})
