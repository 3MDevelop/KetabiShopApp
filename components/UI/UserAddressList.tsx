import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import CustomText from "@/components/common/CustomText";
import AddAddressForm from "@/components/UI/AddAddressForm";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslate } from "@/hooks/useTranslation";
import {
  UserAddress,
  deleteAddress,
  fetchAddresses,
  getAddressTitle,
  getAddressPlace,
  getRecipientMobile,
  getRecipientName,
  getRecipientPhone,
} from "@/utils/address";
import { showAlert } from "@/utils/alert";
import { withDir } from "@/utils/dir";

function addressParts(item: UserAddress, postalLabel: string) {
  const address = String(item.address || "")
    .replace(/\s*\n+\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const postalcode = String(item.postalcode || "").trim();
  return {
    address,
    postal: postalcode ? `${postalLabel} ${postalcode}` : "",
  };
}

const CHIP_HEIGHT = 36;

const chipKinds = {
  title: { box: "titleChip", text: "titleChipText" },
  place: { box: "placeChip", text: "placeChipText" },
  recipient: { box: "recipientChip", text: "recipientChipText" },
  contact: { box: "contactChip", text: "contactChipText" },
} as const;

function InfoChip({
  label,
  kind,
  textAlign,
}: {
  label: string;
  kind: keyof typeof chipKinds;
  textAlign: "left" | "right";
}) {
  const chip = chipKinds[kind];
  return (
    <View style={styles[chip.box]}>
      <CustomText
        variant="caption"
        bold
        style={[styles[chip.text], { textAlign }]}
      >
        {label}
      </CustomText>
    </View>
  );
}

export default function UserAddressList() {
  const { user } = useAuth();
  const { t } = useTranslate();
  const { isRTL } = useLanguage();
  const textAlign = isRTL ? "right" : "left";

  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadAddresses = useCallback(async () => {
    if (!user?.ID) {
      setAddresses([]);
      setIsLoading(false);
      return;
    }
    try {
      setAddresses(await fetchAddresses(user.ID));
    } catch {
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
    void loadAddresses();
  }, [loadAddresses]);

  const removeAddress = (item: UserAddress) => {
    const addressID = String(item.addressID || item.id || "");
    if (!user?.ID || !addressID || deletingId) {
      return;
    }

    showAlert(
      t("common.shipping.deleteConfirmTitle"),
      t("common.shipping.deleteConfirmMessage"),
      [
        {
          text: t("common.common.cancel"),
          style: "cancel",
        },
        {
          text: t("common.common.delete"),
          style: "destructive",
          onPress: () => {
            void (async () => {
              setDeletingId(addressID);
              try {
                const result = await deleteAddress({
                  userID: user.ID,
                  addressID,
                });
                if (result?.status !== true) {
                  Toast.show({
                    type: "error",
                    text1: t("common.common.error"),
                    text2: result?.msg || t("common.common.connectionError"),
                    position: "top",
                    topOffset: 20,
                  });
                  return;
                }
                Toast.show({
                  type: "success",
                  text1: t("common.shipping.addressDeleted"),
                  position: "top",
                  topOffset: 20,
                });
                await loadAddresses();
              } catch {
                Toast.show({
                  type: "error",
                  text1: t("common.common.error"),
                  text2: t("common.common.connectionError"),
                  position: "top",
                  topOffset: 20,
                });
              } finally {
                setDeletingId(null);
              }
            })();
          },
        },
      ],
    );
  };

  return (
    <View {...withDir(isRTL ? "rtl" : "ltr")}>
      <View style={styles.header}>
        <CustomText style={[styles.sectionTitle, { textAlign }]}>
          {t("common.shipping.addresses")}
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

      {isLoading ? (
        <ActivityIndicator color="#007AFF" style={{ marginVertical: 20 }} />
      ) : addresses.length === 0 ? (
        <CustomText style={styles.emptyText}>
          {t("common.shipping.noAddress")}
        </CustomText>
      ) : (
        addresses.map((item) => {
          const title = getAddressTitle(item);
          const recipient = getRecipientName(item);
          const recipientMobile = getRecipientMobile(item);
          const recipientPhone = getRecipientPhone(item);
          const contactNumbers = [recipientPhone, recipientMobile]
            .filter(Boolean)
            .sort((left, right) => {
              const isMobile = (value: string) =>
                /^0?9\d{9}$/.test(value.replace(/\D/g, ""));
              return Number(isMobile(left)) - Number(isMobile(right));
            })
            .join("، ");
          const place = getAddressPlace(item);
          const { address, postal } = addressParts(
            item,
            t("common.shipping.postalCode"),
          );
          return (
            <View key={item.id} style={styles.addressCard}>
              <View style={styles.titleRow}>
                <View style={styles.titleChips}>
                  {title ? (
                    <InfoChip kind="title" label={title} textAlign={textAlign} />
                  ) : null}
                  {place ? (
                    <InfoChip kind="place" label={place} textAlign={textAlign} />
                  ) : null}
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeAddress(item)}
                  disabled={deletingId === String(item.addressID || item.id)}
                  accessibilityRole="button"
                  accessibilityLabel={t("common.shipping.deleteAddress")}
                >
                  {deletingId === String(item.addressID || item.id) ? (
                    <ActivityIndicator size="small" color="#FF3B30" />
                  ) : (
                    <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                  )}
                </TouchableOpacity>
              </View>
              {address || postal ? (
                <View style={styles.addressLine}>
                  {address ? (
                    <CustomText
                      variant="caption"
                      style={[styles.addressText, { textAlign }]}
                    >
                      {address}
                    </CustomText>
                  ) : null}
                  {postal ? (
                    <CustomText
                      variant="caption"
                      style={[styles.addressText, styles.postalText, { textAlign }]}
                    >
                      {postal}
                    </CustomText>
                  ) : null}
                </View>
              ) : null}
              <View style={styles.chipRow}>
                {recipient ? (
                  <View style={styles.labeledChip}>
                    <CustomText
                      variant="caption"
                      style={[styles.metaLabel, { textAlign }]}
                    >
                      {t("common.shipping.recipientLabel")}
                    </CustomText>
                    <InfoChip
                      kind="recipient"
                      label={recipient}
                      textAlign={textAlign}
                    />
                  </View>
                ) : null}
                {contactNumbers ? (
                  <View style={styles.labeledChip}>
                    <CustomText
                      variant="caption"
                      style={[styles.metaLabel, { textAlign }]}
                    >
                      {t("common.shipping.contactNumber")}
                    </CustomText>
                    <InfoChip
                      kind="contact"
                      label={contactNumbers}
                      textAlign={textAlign}
                    />
                  </View>
                ) : null}
              </View>
            </View>
          );
        })
      )}

      <AddAddressForm
        visible={showForm}
        onClose={() => setShowForm(false)}
        onSaved={loadAddresses}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  emptyText: {
    paddingVertical: 16,
    textAlign: "center",
    color: "#999",
    fontSize: 14,
  },
  addressCard: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    gap: 8,
  },
  chipRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  titleChips: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
    flexWrap: "wrap",
  },
  deleteButton: {
    width: CHIP_HEIGHT,
    height: CHIP_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  titleChip: {
    backgroundColor: "#eef5ff",
    borderRadius: 10,
    padding: 6,
    paddingTop: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  titleChipText: {
    color: "#007AFF",
    fontSize: 22,
    lineHeight: 26,
    marginBottom: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
    ...(Platform.OS === "web"
      ? {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }
      : null),
  },
  placeChip: {
    backgroundColor: "#eef5ff",
    borderRadius: 8,
    padding: 6,
    paddingTop: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  placeChipText: {
    color: "#007AFF",
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
    ...(Platform.OS === "web"
      ? {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }
      : null),
  },
  recipientChip: {
    backgroundColor: "#eef5ff",
    borderRadius: 10,
    padding: 6,
    paddingTop: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  recipientChipText: {
    color: "#007AFF",
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
    ...(Platform.OS === "web"
      ? {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }
      : null),
  },
  contactChip: {
    backgroundColor: "#eef5ff",
    borderRadius: 8,
    padding: 6,
    paddingTop: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  contactChipText: {
    color: "#007AFF",
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
    ...(Platform.OS === "web"
      ? {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }
      : null),
  },
  labeledChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaLabel: {
    color: "#888",
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
    ...(Platform.OS === "web"
      ? {
          display: "flex",
          alignItems: "center",
        }
      : null),
  },
  addressLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: 24,
    rowGap: 4,
    width: "100%",
  },
  addressText: {
    color: "#555",
    lineHeight: 20,
    flexShrink: 1,
  },
  postalText: {
    flexShrink: 0,
  },
});
