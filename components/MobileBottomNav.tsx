// components/MobileBottomNav.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Link, usePathname } from 'expo-router';

const MobileBottomNav = () => {
  const pathname = usePathname();
  
  const tabs = [
    { href: '/', label: 'خانه', icon: "home" as const },
    { href: '/categories', label: 'درباره', icon: "list" as const },
    { href: '/offers', label: 'تماس', icon: "star" as const },
    { href: '/myLibrary', label: 'تماس', icon: "bookmark" as const },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link key={tab.href} href={tab.href as any} asChild>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.icon}>{tab.icon}</Text>
              <Text style={[styles.label, isActive && styles.activeLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          </Link>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
    marginBottom: 2,
  },
  label: {
    fontSize: 11,
    color: '#666',
  },
  activeLabel: {
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default MobileBottomNav;