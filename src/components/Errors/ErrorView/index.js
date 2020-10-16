import React from 'react'
import styled from 'styled-components'
import {ErrorButton} from 'components/Errors/ErrorFourZeroFour'
import {useTranslation} from 'react-i18next'

type Props = {
  refreshCallback: Function,
}
const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`

const ErrorView = ({refreshCallback}): Props => {
  const {t} = useTranslation()
  return (
    <ErrorWrapper>
      <h1>{'Something Went wrong!'}</h1>
      <ErrorButton onClick={() => refreshCallback()}>{t('RETRY')}</ErrorButton>
    </ErrorWrapper>
  )
}

export default ErrorView
