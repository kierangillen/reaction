import React from "react"
import styled from "styled-components"
import * as fonts from "../Assets/Fonts"

type TextAlign = "start" | "center" | "end"
type TextSize = "small" | "medium" | "large" | "xlarge"
type TextStyle = "primary" | "secondary"

interface TextProps extends React.HTMLProps<HTMLParagraphElement> {
  textSize?: TextSize
  textStyle?: TextStyle
  align?: TextAlign
  color?: string
}

const textSizesForPrimaryStyle = {
  xlarge: "24px",
  large: "17px",
  medium: "15px",
  small: "13px",
  xsmall: "11px",
}

const textSizesForSecondaryStyle = {
  xlarge: "26px",
  large: "20px",
  medium: "17px",
  small: "15px",
  xsmall: "11px",
}

const TextStyleToTextSize = {
  primary: textSizesForPrimaryStyle,
  secondary: textSizesForSecondaryStyle,
}

const textStyleNameToCss = {
  primary: fonts.avantgarde("s11"),
  secondary: fonts.garamond("s11"),
}

const RawText: React.SFC<TextProps> = (props: TextProps) => {
  const { textSize, textStyle, align, color, ...remainderProps } = props

  return <p {...remainderProps}>{props.children}</p>
}

const Text = styled(RawText)`
  font-size: ${props => TextStyleToTextSize[props.textStyle][props.textSize]};
  text-align: ${props => props.align};
  color: ${props => props.color};
  ${props => textStyleNameToCss[props.textStyle]};
`

Text.defaultProps = {
  textSize: "small",
  textStyle: "secondary",
  align: "start",
  color: "currentcolor",
}

export default Text
