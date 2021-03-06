import React from 'react'
import {mount} from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Header from 'components/Layout/Header'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {LANG_CODES} from 'consts.json'

const mockStore = configureStore([])

describe('<Header />', () => {
  let store
  let component

  beforeEach(() => {
    store = mockStore({
      langCode: LANG_CODES.GB,
      langDisabled: false,
    })

    component = (
      <Provider store={store}>
        <BrowserRouter>
          <Header t={(k) => k} />
        </BrowserRouter>
      </Provider>
    )
  })

  it('match snapshot', () => {
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('should render correctly with all needed components', () => {
    const wrapper = mount(component)
    expect(wrapper.find('NavigationItems__NavigationList')).toHaveLength(1)
    expect(wrapper.find('Header__LanguageSection')).toHaveLength(1)
  })
})
