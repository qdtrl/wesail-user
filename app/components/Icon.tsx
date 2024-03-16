import React from 'react';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

MIcon.loadFont();

// type IconSizeProps = {
//   iconSizes: keyof typeof IconSizes;
// };

interface IconProps {
  size: number;
  name: string;
  color: string;
}
// const IconSizes = {
//   small: 13,
//   medium: 18,
//   large: 23,
//   extraLarge: 27,
// };

const Icon = ({size, name, color}: IconProps) => (
  <MIcon name={name} size={size} color={color} />
);

export default Icon;
