// Apply cssInterop to RadioButton to resolve className string into style
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { Text } from './text';

export interface RadioButtonProps {
  label: string;
  value: string;
  isSelected: boolean;
  onPress: (value: string) => void;
  disabled?: boolean;
}

/**
 * RadioButton
 * 
 * A customizable radio button component for React Native.
 * 
 * Props:
 * - label (string): The text label for the radio button.
 * - value (string): The value associated with this radio button.
 * - isSelected (boolean): Whether this radio button is currently selected.
 * - onPress (function): Callback function when the radio button is pressed.
 * - disabled (boolean): Optional. If true, the radio button cannot be interacted with.
 * 
 * Usage Example:
 * import { RadioButton } from '@/ui';
 * 
 * function Example() {
 *   const [selected, setSelected] = React.useState('');
 * 
 *   return (
 *     <RadioButton
 *       label="Option 1"
 *       value="option1"
 *       isSelected={selected === 'option1'}
 *       onPress={(value) => setSelected(value)}
 *     />
 *   );
 * }
 */
export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  isSelected,
  onPress,
  disabled = false,
}) => {
  const handlePress = React.useCallback(() => {
    if (!disabled) {
      onPress(value);
    }
  }, [disabled, onPress, value]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={`flex-row items-center py-2 ${disabled ? 'opacity-50' : ''}`}
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected, disabled }}
    >
      <View className="mr-3 h-5 w-5 items-center justify-center rounded-full border-2 border-gray-400 dark:border-gray-600">
        {isSelected && (
          <Svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            fill="none"
          >
            <Path
              d="M6 12A6 6 0 106 0a6 6 0 000 12z"
              fill="#007AFF"
             
            />
          </Svg>
        )}
      </View>
      <Text className="text-base text-gray-900 dark:text-gray-100">
        {label}
      </Text>
    </Pressable>
  );
};
