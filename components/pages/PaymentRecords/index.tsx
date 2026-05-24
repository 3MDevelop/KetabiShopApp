// components/pages/PaymentRecords/index.tsx

import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

export default function PaymentRecords() {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return (
      <View style={styles.notLoggedInContainer}>
        <Ionicons name="receipt-outline" size={80} color="#ccc" />
        <CustomText style={styles.notLoggedInTitle}>
          ⛔ دسترسی غیرمجاز
        </CustomText>
        <CustomText style={styles.notLoggedInText}>
          برای مشاهده سوابق خرید، ابتدا وارد حساب کاربری خود شوید
        </CustomText>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/login")}
        >
          <Ionicons name="log-in-outline" size={20} color="#fff" />
          <CustomText style={styles.loginButtonText}>
            ورود به حساب کاربری
          </CustomText>
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
          <CustomText style={styles.title}>تاریخچه پرداخت</CustomText>
          <View style={styles.badge}>
            <CustomText style={styles.badgeText}>
              {paymentList.length}
            </CustomText>
          </View>
        </View>

        {/* لیست پرداخت‌ها */}
        {paymentList.length > 0 ? (
          <View style={styles.paymentListContainer}>
            <CustomText style={styles.sectionTitle}>
              📋 لیست تراکنش‌ها
            </CustomText>
            {paymentList.map((paymentId, index) => (
              <View key={paymentId || index} style={styles.paymentCard}>
                <View style={styles.paymentIcon}>
                  <Ionicons name="card-outline" size={24} color="#007AFF" />
                </View>
                <View style={styles.paymentInfo}>
                  <CustomText style={styles.paymentId}>
                    شماره تراکنش: {paymentId}
                  </CustomText>
                  <CustomText style={styles.paymentDate}>
                    تاریخ: {new Date().toLocaleDateString("fa-IR")}
                  </CustomText>
                </View>
                <View style={styles.successBadge}>
                  <CustomText style={styles.successBadgeText}>موفق</CustomText>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyListContainer}>
            <Ionicons name="receipt-outline" size={60} color="#007AFF" />
            <CustomText style={styles.emptyListTitle}>
              📭 تاریخچه پرداخت خالی است
            </CustomText>
            <CustomText style={styles.emptyListText}>
              شما هنوز هیچ خریدی انجام نداده‌اید
            </CustomText>
            <TouchableOpacity
              style={styles.shopButton}
              onPress={() => router.push("/offers")}
            >
              <CustomText style={styles.shopButtonText}>
                پیشنهادات ویژه
              </CustomText>
              <Ionicons name="cart-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
