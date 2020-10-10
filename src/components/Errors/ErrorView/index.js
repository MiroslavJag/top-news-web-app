import React from 'react'
import styled from 'styled-components'

type Props = {
  refreshCallback: Function,
}

const ErrorView = ({refreshCallback}): Props => (
  <>
    <h1>Somethnig Went wrong!</h1>
    <button onClick={() => refreshCallback()}>Retry</button>
  </>
)

export default ErrorView
