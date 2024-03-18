import {Image, View} from 'react-native';
import React from 'react';
import {Icon} from '.';

interface AvatarParams {
  icon: string;
  size: number;
  color: string;
  border: string;
}

const Avatar = ({
  icon,
  size,
  color = 'black',
  border = 'transparent',
}: AvatarParams) => {
  return (
    <>
      {icon ? (
        <View
          //@ts-ignore
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.avatar,
            width: size + 2,
            height: size + 2,
            backgroundColor: border === 'gray' ? 'transparent' : border,
          }}>
          <Image
            source={{uri: icon}}
            //@ts-ignore
            style={{
              ...styles.avatar,
              width: size,
              height: size,
            }}
          />
        </View>
      ) : (
        //@ts-ignore
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
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'lightgray',
    opacity: 1,
  },
};

export default Avatar;
