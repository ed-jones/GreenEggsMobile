/**
 * Author: Edward Jones
 */
import { Text, useTheme } from '@ui-kitten/components'
import { View } from 'react-native'
import { ProgressCircle } from '@greeneggs/ui/progress-circle'

interface Props {
  currentStep: string
  nextStep: string | undefined
  index: number
  length: number
}

/**
 * Stateless component that, when controlled, shows the current state of a multi-step form in a mobile friendly manor.
 */
export function Stepper({ currentStep, nextStep, index, length }: Props) {
  const theme = useTheme()
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <ProgressCircle
        percent={(100 * (index + 1)) / length}
        radius={32}
        color={theme['color-primary-500']}
        shadowColor={theme['color-success-500']}
        borderWidth={5}
        bgColor='white'
      >
        <Text category='label' style={{ fontWeight: 'bold' }}>{`${index + 1} OF ${length}`}</Text>
      </ProgressCircle>
      <View>
        <Text style={{ textAlign: 'right', marginBottom: 4 }} category='h6'>
          {currentStep}
        </Text>
        <Text style={{ textAlign: 'right', marginBottom: 4 }}>{nextStep ? `Next: ${nextStep}` : 'Next: Publish'}</Text>
      </View>
    </View>
  )
}
