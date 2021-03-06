import React, { memo } from 'react'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '../../../styles/themes'
import TranslatedText from '../../TranslatedText'

const BottomInfo = () => {
  return <Text>PLEASE_SELECT_DATE</Text>
}

export default memo(BottomInfo)

const Text = styled(TranslatedText)`
  align-self: center;
  text-align: center;
  font-family: ${fonts.medium};
  font-size: 15px;
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
`
