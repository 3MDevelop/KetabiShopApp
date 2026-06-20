// components/Blocks/DynamicRenderer.tsx
import React from 'react';
import { View } from 'react-native';
import { componentRegistry, defaultComponent } from './registry';

interface BlockData {
  type: string;
  data: any;
}

interface DynamicRendererProps {
  blocks: BlockData[];
}

export default function DynamicRenderer({ blocks }: DynamicRendererProps) {
  return (
    <View style={{ flex: 1 }}>
      {blocks.map((block, index) => {
        // دریافت کامپوننت از رجیستری
        const Component = componentRegistry[block.type] || defaultComponent;
        
        return (
          <View key={`block-${index}`}>
            <Component {...block.data} />
          </View>
        );
      })}
    </View>
  );
}