import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useTranslate } from "@/hooks/useTranslation";
import { useResponsive } from "@/hooks/useResponsive";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";
import AddAddressForm from "@/components/UI/AddAddressForm";
import PageHeader from "@/components/UI/PageHeader";
import Toast from "react-native-toast-message";
import { API } from "@/constants/api";
import { getBasketProducts } from "@/utils/basket";
import { withDir } from "@/utils/dir";
import {
  fetchAddresses,
  getAddressTitle,
  getRecipientMobile,
} from "@/utils/address";

export interface AddressItem {
  id: string;
  addressTitle: string;
  address: string;
  state: string;
  city: string;
  postalCode: string;
  mobileNumber: string;
}

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
  const { user, isLoggedIn } = useAuth();
  const { isMobile } = useResponsive();
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [basketTotal, setBasketTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const formatPrice = (value: number) =>
    `${value.toLocaleString()} ${t("common.cart.currency")}`;

  const loadData = useCallback(async (selectId?: string) => {
    try {
      const [addressRows, shippingResult, basketItems] = await Promise.all([
        user?.ID ? fetchAddresses(user.ID) : Promise.resolve([]),
        fetchStaticJson("getShippingPrice"),
        getBasketProducts(),
      ]);

      const nextAddresses: AddressItem[] = addressRows.map((item) => ({
        id: item.id,
        addressTitle: getAddressTitle(item),
        address: item.address || "",
        state: item.province || "",
        city: item.city || "",
        postalCode: item.postalcode || item.postalCode || "",
        mobileNumber: getRecipientMobile(item),
      }));
      setAddresses(nextAddresses);
      setSelectedId((prev) => {
        if (selectId && nextAddresses.some((item) => item.id === selectId)) {
          return selectId;
        }
        if (prev && nextAddresses.some((item) => item.id === prev)) {
          return prev;
        }
        return nextAddresses[0]?.id ?? null;
      });

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
  }, [t, user?.ID]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }
    loadData();
  }, [isLoggedIn, loadData]);

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
      <View {...withDir(contentDirection, styles.summaryCard)}>
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
    <View {...withDir(contentDirection, styles.listCard)}>
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
          <View {...withDir("ltr", [styles.layout, isMobile && styles.layoutMobile])}>
            {addressList}
            {summaryCard}
          </View>
        </View>
      </ScrollView>

      <AddAddressForm
        visible={showForm}
        onClose={() => setShowForm(false)}
        onSaved={(result) => loadData(result?.addressID)}
      />
    </View>
  );
}
