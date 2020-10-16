import React, {useEffect, useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from 'store/actions'
import 'static/css/App.css'
import Home from 'components/pageComponents/Home'
import Categories from 'components/pageComponents/Categories'
import Category from 'components/pageComponents/Category'
import Search from 'components/pageComponents/Search'
import Layout from 'components/Layout'
import ErrorFourZeroFour from 'components/Errors/ErrorFourZeroFour'
import {LANG_CODES, TOP_NEWS_LANG} from 'consts.json'

type Props = {
  langCode: String,
  setLanguage: Function,
}

const App = ({langCode, setLanguage}): Props => {
  useEffect(() => {
    if (localStorage.getItem(TOP_NEWS_LANG) === null) {
      localStorage.setItem(TOP_NEWS_LANG, LANG_CODES.GB)
    } else {
      setLanguage(localStorage.getItem(TOP_NEWS_LANG))
    }
  }, [])

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path={`/${langCode}/categories/:category`} component={Category} />
          <Route path={`/${langCode}/categories`} component={Categories} />
          <Route path={`/${langCode}/search`} component={Search} />
          <Route path={`/${langCode}`} exact component={Home} />
          <Route path={'/'} exact component={Home} />
          <Route component={ErrorFourZeroFour} />
        </Switch>
      </Layout>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    langCode: state.langCode,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (langCode) => dispatch(actions.setLanguage(langCode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
