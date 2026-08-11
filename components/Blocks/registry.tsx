// components/Blocks/registry.tsx
import React, { ComponentType } from 'react';
import FullWidthBanner from './FullWidthBanner';
import MultiPartBanner from './MultiPartBanner';
import BookPreList from './BookPreList';
import GlobalPrelist from './GlobalPrelist';
import { View, Text } from 'react-native';

export const componentRegistry: Record<string, ComponentType<any>> = {
  'fullWidthBanner': FullWidthBanner, 
  'BookPreList': BookPreList,
  'MultiPartBanner': MultiPartBanner,
  'globalPrelist':GlobalPrelist,
};

export const defaultComponent = () => (
  <View style={{ padding: 20 }}>
    <Text>component not defined</Text>
  </View>
);