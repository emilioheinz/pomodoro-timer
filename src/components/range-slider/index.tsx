import { Container } from './styles'
import { RangeSliderProps } from './types'

export default function RangeSlider({
  id,
  range,
  onChange,
  renderLabel,
  currentValue,
  stepsGap = 1,
  isDisabled = true
}: RangeSliderProps) {
  return (
    <Container>
      <label htmlFor={id}>{renderLabel?.()}</label>
      <input
        type="range"
        className="slider"
        min={range[0]}
        max={range[1]}
        step={stepsGap}
        value={currentValue}
        onChange={onChange}
        disabled={isDisabled}
        id={id}
      />
    </Container>
  )
}
