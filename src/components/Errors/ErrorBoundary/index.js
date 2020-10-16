import React from 'react'
import ErrorView from 'components/Errors/ErrorView'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error) {
    console.log(error)
    return {hasError: true}
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }

  refreshPage = () => window.location.reload()

  render() {
    if (this.state.hasError) {
      return <ErrorView refreshCallback={this.refreshPage} />
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary
