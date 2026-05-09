// components/pages/PaymentRecords/index.tsx

import React from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";

export default function PaymentRecords() {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return (
      <View style={styles.notLoggedInContainer}>
        <Ionicons name="receipt-outline" size={80} color="#ccc" />
        <Text style={styles.notLoggedInTitle}>⛔ دسترسی غیرمجاز</Text>
        <Text style={styles.notLoggedInText}>
          برای مشاهده سوابق خرید، ابتدا وارد حساب کاربری خود شوید
        </Text>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => router.push("/login")}
        >
          <Ionicons name="log-in-outline" size={20} color="#fff" />
          <Text style={styles.loginButtonText}>ورود به حساب کاربری</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const paymentList = user?.paymentList || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* هدر */}
        <View style={styles.header}>
          <Ionicons name="wallet-outline" size={28} color="#007AFF" />
          <Text style={styles.title}>تاریخچه پرداخت</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{paymentList.length}</Text>
          </View>
        </View>

        {/* لیست پرداخت‌ها */}
        {paymentList.length > 0 ? (
          <View style={styles.paymentListContainer}>
            <Text style={styles.sectionTitle}>📋 لیست تراکنش‌ها</Text>
            {paymentList.map((paymentId, index) => (
              <View key={paymentId || index} style={styles.paymentCard}>
                <View style={styles.paymentIcon}>
                  <Ionicons name="card-outline" size={24} color="#007AFF" />
                </View>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentId}>شماره تراکنش: {paymentId}</Text>
                  <Text style={styles.paymentDate}>
                    تاریخ: {new Date().toLocaleDateString('fa-IR')}
                  </Text>
                </View>
                <View style={styles.successBadge}>
                  <Text style={styles.successBadgeText}>موفق</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyListContainer}>
            <Ionicons name="receipt-outline" size={60} color="#007AFF" />
            <Text style={styles.emptyListTitle}>📭 تاریخچه پرداخت خالی است</Text>
            <Text style={styles.emptyListText}>
              شما هنوز هیچ خریدی انجام نداده‌اید
            </Text>
            <TouchableOpacity 
              style={styles.shopButton}
              onPress={() => router.push("/offers")}
            >
              <Text style={styles.shopButtonText}>پیشنهادات ویژه</Text>
              <Ionicons name="cart-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}