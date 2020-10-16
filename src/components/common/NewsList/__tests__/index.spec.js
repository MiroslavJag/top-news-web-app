import React from 'react'
import {mount} from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import NewsList from 'components/common/NewsList'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {LANG_CODES} from 'consts.json'
import {topNewsStub} from '../../../../test/stubs/news'

const mockStore = configureStore([])

describe('<NewsList />', () => {
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
          <NewsList data={topNewsStub.articles} t={(k) => k} />
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
    expect(wrapper.find('NewsList__NewsRow')).toHaveLength(topNewsStub.articles.length)
  })
})
