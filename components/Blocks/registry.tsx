// components/Blocks/registry.tsx
import React, { ComponentType } from 'react';
import FullWidthBanner from './FullWidthBanner';
import BookPreList from './BookPreList';
import AutherPreList from './AutherPreList';
import PublisherPreList from './PublisherPreList';
import TagPreList from './TagPreList';
import { View, Text } from 'react-native';

export const componentRegistry: Record<string, ComponentType<any>> = {
  'fullWidthBanner': FullWidthBanner, 
  'BookPreList': BookPreList,
  'AutherPreList': AutherPreList,
  'PublisherPreList': PublisherPreList,
  'TagPreList':TagPreList,
};

export const defaultComponent = () => (
  <View style={{ padding: 20 }}>
    <Text>کامپوننت یافت نشد</Text>
  </View>
);