import React from 'react'
import {Route, Switch} from 'react-router-dom'
import 'static/css/App.css'
import Home from 'components/pageComponents/Home'
import Categories from 'components/pageComponents/Categories'
import Search from 'components/pageComponents/Search'
import Layout from 'components/Layout'

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/categories" component={Categories} />
          <Route path="/search" component={Search} />
          <Route path="/" component={Home} />
        </Switch>
      </Layout>
    </div>
  )
}

export default App
