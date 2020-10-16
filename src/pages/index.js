import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import 'static/css/index.css'
import App from 'pages/App'
import * as serviceWorker from '../serviceWorker'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {BrowserRouter} from 'react-router-dom'
import ErrorBoundary from 'components/Errors/ErrorBoundary'
import reducer from 'store/reducers/reducer'
import '../i18n'

const store = createStore(reducer)

const app = (
  <BrowserRouter>
    <ErrorBoundary>
      <Provider store={store}>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </Provider>
    </ErrorBoundary>
  </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
