import {Image, View} from 'react-native';
import React from 'react';
import {Icon} from '.';

interface AvatarParams {
  icon: string;
  size: number;
  color: string;
}

const Avatar = ({icon, size, color = 'black'}: AvatarParams) => {
  return (
    <>
      {icon ? (
        <Image
          source={{uri: icon}}
          style={{...styles.avatar, width: size, height: size}}
        />
      ) : (
        <View style={{...styles.avatar, width: size, height: size}}>
          <Icon name="account" size={size} color={color} />
        </View>
      )}
    </>
  );
};

const styles = {
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'lightgrey',
  },
};

export default Avatar;
