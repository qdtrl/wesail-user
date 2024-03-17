import {Image} from 'react-native';
import React from 'react';
import {Icon} from '.';

interface AvatarParams {
  icon: string;
  size: number;
}

const Avatar = ({icon, size}: AvatarParams) => {
  return (
    <>
      {icon ? (
        <Image
          source={{uri: icon}}
          style={{...styles.avatar, width: size, height: size}}
        />
      ) : (
        <Icon name="account" size={size} color="black" />
      )}
    </>
  );
};

const styles = {
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
};

export default Avatar;
