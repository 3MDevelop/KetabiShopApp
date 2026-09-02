import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useTranslate } from "@/hooks/useTranslation";
import { useResponsive } from "@/hooks/useResponsive";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";
import PageHeader from "@/components/UI/PageHeader";
import Toast from "react-native-toast-message";
import { API } from "@/constants/api";
import { getBasketProducts } from "@/utils/basket";

export interface AddressItem {
  id: string;
  addressTitle: string;
  address: string;
  state: string;
  city: string;
  postalCode: string;
  mobileNumber: string;
}

const emptyAddress = {
  addressTitle: "",
  address: "",
  state: "",
  city: "",
  postalCode: "",
  mobileNumber: "",
};

const fetchStaticJson = async (name: string) => {
  const response = await fetch(API.getstatic, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `name=${encodeURIComponent(name)}`,
  });
  return response.json();
};

export default function Shipping() {
  const { t } = useTranslate();
  const { isRTL } = useLanguage();
  const { isLoggedIn } = useAuth();
  const { isMobile } = useResponsive();
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [basketTotal, setBasketTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyAddress);

  const formatPrice = (value: number) =>
    `${value.toLocaleString()} ${t("common.cart.currency")}`;

  const loadData = useCallback(async () => {
    try {
      const [addressResult, shippingResult, basketItems] = await Promise.all([
        fetchStaticJson("getAddress"),
        fetchStaticJson("getShippingPrice"),
        getBasketProducts(),
      ]);

      if (addressResult.status === true && Array.isArray(addressResult.data)) {
        const nextAddresses: AddressItem[] = addressResult.data.map(
          (item: AddressItem, index: number) => ({
            ...item,
            id: String(item.id ?? index + 1),
          }),
        );
        setAddresses(nextAddresses);
        if (nextAddresses[0]) {
          setSelectedId(nextAddresses[0].id);
        }
      }

      if (shippingResult.status === true && shippingResult.data) {
        setShippingPrice(Number(shippingResult.data.shippingPrice) || 0);
      }

      setBasketTotal(
        basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      );
    } catch (error) {
      console.error("Error loading shipping data:", error);
      Toast.show({
        type: "error",
        text1: t("common.common.error"),
        text2: t("common.common.connectionError"),
        position: "top",
        topOffset: 20,
      });
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }
    loadData();
  }, [isLoggedIn, loadData]);

  const updateField = (key: keyof typeof emptyAddress, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const saveAddress = () => {
    const values = Object.values(form);
    if (values.some((value) => !value.trim())) {
      Toast.show({
        type: "error",
        text1: t("common.shipping.fillRequired"),
        position: "top",
        topOffset: 20,
      });
      return;
    }

    const newAddress: AddressItem = {
      ...form,
      id: String(Date.now()),
    };
    setAddresses((prev) => [newAddress, ...prev]);
    setSelectedId(newAddress.id);
    setForm(emptyAddress);
    setShowForm(false);
  };

  const handleContinue = () => {
    if (!selectedId) {
      Toast.show({
        type: "error",
        text1: t("common.shipping.selectAddressHint"),
        position: "top",
        topOffset: 20,
      });
    }
  };

  const contentDirection = isRTL ? "rtl" : "ltr";

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const summaryCard = (
    <View style={[styles.sidebar, isMobile && styles.sidebarMobile]}>
      <View style={[styles.summaryCard, { direction: contentDirection }]}>
        <CustomText
          style={[
            styles.summaryTitle,
            { textAlign: isRTL ? "right" : "left" },
          ]}
        >
          {t("common.cart.paymentDetails")}
        </CustomText>
        <View style={styles.totalRow}>
          <CustomText style={styles.totalLabel}>
            {t("common.cart.itemsTotal")}
          </CustomText>
          <CustomText style={styles.totalPrice}>
            {formatPrice(basketTotal)}
          </CustomText>
        </View>
        <View style={styles.totalRow}>
          <CustomText style={styles.totalLabel}>
            {t("common.shipping.shippingCost")}
          </CustomText>
          <CustomText style={styles.totalPrice}>
            {formatPrice(shippingPrice)}
          </CustomText>
        </View>
        <View style={styles.totalRow}>
          <CustomText style={styles.finalLabel}>
            {t("common.cart.finalAmount")}
          </CustomText>
          <CustomText style={styles.finalPrice}>
            {formatPrice(basketTotal + shippingPrice)}
          </CustomText>
        </View>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedId && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedId}
        >
          <CustomText style={styles.continueButtonText}>
            {t("common.shipping.continue")}
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const addressList = (
    <View style={[styles.listCard, { direction: contentDirection }]}>
      <View style={styles.listHeader}>
        <CustomText style={styles.listTitle}>
          {t("common.shipping.selectAddress")}
        </CustomText>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowForm(true)}
        >
          <Ionicons name="add" size={18} color="#fff" />
          <CustomText style={styles.addButtonText}>
            {t("common.shipping.addAddress")}
          </CustomText>
        </TouchableOpacity>
      </View>

      {addresses.length === 0 ? (
        <CustomText style={styles.emptyText}>
          {t("common.shipping.noAddress")}
        </CustomText>
      ) : (
        addresses.map((item) => {
          const selected = item.id === selectedId;
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.addressCard,
                selected && styles.addressCardSelected,
              ]}
              onPress={() => setSelectedId(item.id)}
            >
              <View style={styles.addressHeader}>
                <CustomText style={styles.addressTitle}>
                  {item.addressTitle}
                </CustomText>
                <Ionicons
                  name={selected ? "radio-button-on" : "radio-button-off"}
                  size={22}
                  color={selected ? "#007AFF" : "#ccc"}
                />
              </View>
              <CustomText style={styles.addressText}>{item.address}</CustomText>
              <CustomText style={styles.addressMeta}>
                {item.state}، {item.city}
              </CustomText>
              <CustomText style={styles.addressMeta}>
                {t("common.shipping.postalCode")}: {item.postalCode}
              </CustomText>
              <CustomText style={styles.addressMeta}>
                {t("common.shipping.mobileNumber")}: {item.mobileNumber}
              </CustomText>
            </TouchableOpacity>
          );
        })
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <PageHeader title={t("common.shipping.title")} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          <View style={[styles.layout, isMobile && styles.layoutMobile]}>
            {addressList}
            {summaryCard}
          </View>
        </View>
      </ScrollView>

      <Modal visible={showForm} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <CustomText style={styles.modalTitle}>
              {t("common.shipping.newAddress")}
            </CustomText>
            <ScrollView>
              <TextInput
                style={[styles.input, { textAlign: isRTL ? "right" : "left" }]}
                placeholder={t("common.shipping.addressTitle")}
                value={form.addressTitle}
                onChangeText={(value) => updateField("addressTitle", value)}
              />
              <TextInput
                style={[styles.input, { textAlign: isRTL ? "right" : "left" }]}
                placeholder={t("common.shipping.state")}
                value={form.state}
                onChangeText={(value) => updateField("state", value)}
              />
              <TextInput
                style={[styles.input, { textAlign: isRTL ? "right" : "left" }]}
                placeholder={t("common.shipping.city")}
                value={form.city}
                onChangeText={(value) => updateField("city", value)}
              />
              <TextInput
                style={[
                  styles.input,
                  { textAlign: isRTL ? "right" : "left", minHeight: 80 },
                ]}
                placeholder={t("common.shipping.address")}
                value={form.address}
                onChangeText={(value) => updateField("address", value)}
                multiline
              />
              <TextInput
                style={[styles.input, { textAlign: isRTL ? "right" : "left" }]}
                placeholder={t("common.shipping.postalCode")}
                value={form.postalCode}
                onChangeText={(value) => updateField("postalCode", value)}
                keyboardType="number-pad"
              />
              <TextInput
                style={[styles.input, { textAlign: isRTL ? "right" : "left" }]}
                placeholder={t("common.shipping.mobileNumber")}
                value={form.mobileNumber}
                onChangeText={(value) => updateField("mobileNumber", value)}
                keyboardType="phone-pad"
              />
            </ScrollView>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowForm(false);
                  setForm(emptyAddress);
                }}
              >
                <CustomText style={styles.cancelButtonText}>
                  {t("common.common.cancel")}
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveAddress}
              >
                <CustomText style={styles.saveButtonText}>
                  {t("common.shipping.saveAddress")}
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
