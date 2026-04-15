// components/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, usePathname } from 'expo-router';

const Header = () => {
  const pathname = usePathname(); // مسیر فعلی رو می‌گیره
  
  const navItems = [
    { href: '/', label: 'خانه' },
    { href: '/about', label: 'درباره ما' },
    { href: '/contact', label: 'تماس' },
  ];

  return (
    <View style={styles.header}>
      <Text style={styles.logo}>🚀 MyApp</Text>
      <View style={styles.navLinks}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href as any} asChild>
            <TouchableOpacity style={styles.navLink}>
              <Text 
                style={[
                  styles.navLinkText,
                  pathname === item.href && styles.activeLink
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  navLinks: {
    flexDirection: 'row',
    gap: 20,
  },
  navLink: {
    padding: 8,
  },
  navLinkText: {
    fontSize: 16,
    color: '#666',
  },
  activeLink: {
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default Header;