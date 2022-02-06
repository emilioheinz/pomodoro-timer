import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import { useTheme } from 'styled-components'
import { IconButton } from '../icon-button'
import RangeSlider from '../range-slider'
import { Container } from './styles'
import { VolumeControllerProps } from './types'

export const MUTED_SOUND_VOLUME = 0

export default function VolumeController({
  onVolumeChange,
  volume
}: VolumeControllerProps) {
  const theme = useTheme()

  const iconWithVolume = volume <= 40 ? FaVolumeDown : FaVolumeUp
  const icon = volume === MUTED_SOUND_VOLUME ? FaVolumeMute : iconWithVolume

  return (
    <Container>
      <IconButton
        ariaLabel="Mute or unmute alert sound"
        Icon={icon}
        onClick={() => onVolumeChange(MUTED_SOUND_VOLUME)}
        size={40}
        color={theme.colors.secondary}
      />
      <RangeSlider
        range={[0, 100]}
        onChange={e => onVolumeChange(Number(e.target.value))}
        currentValue={volume}
        isDisabled={false}
        id="volume-range-slider"
      />
    </Container>
  )
}
