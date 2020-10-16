import React from 'react'
import {mount} from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Categories from 'components/pageComponents/Categories'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {LANG_CODES} from 'consts.json'

const mockStore = configureStore([])

describe('<Categories />', () => {
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
          <Categories t={(k) => k} />
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
    expect(wrapper.find('Categories__CategoryContent')).toHaveLength(1)
    expect(wrapper.find('Slider__SliderWrapper')).toHaveLength(7)
  })
})
