import React from 'react'
import {mount} from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Home from 'components/pageComponents/Home'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {LANG_CODES} from 'consts.json'
import {topNewsStub} from '../../../../test/stubs/news'

const mockStore = configureStore([])

describe('<Home />', () => {
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
          <Home data={topNewsStub.articles} t={(k) => k} />
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
    expect(wrapper.find('Home__NewsListTitleWrapper')).toHaveLength(1)
    expect(wrapper.find('NewsList__NewsListWrapper')).toHaveLength(1)
  })
})
