// components/registry.tsx
import React, { ComponentType } from 'react';
import ListType1 from '@/components/Blocks/ListType1';
import ListType2 from '@/components/Blocks/ListType2';
import ListType3 from '@/components/Blocks/ListType3';
import ListType4 from '@/components/Blocks/ListType4';
import { View, Text } from 'react-native';

// ثبت همه کامپوننت‌ها
export const componentRegistry: Record<string, ComponentType<any>> = {
    'listType': ListType1,
    'listType2': ListType2,
    'listType3': ListType3,
    'listType4': ListType4,
};

// کامپوننت‌های پیش‌فرض (در صورت خطا)
export const defaultComponent = () => (
    <View style={{ padding: 20 }}>
        <Text>کامپوننت یافت نشد</Text>
    </View>
);