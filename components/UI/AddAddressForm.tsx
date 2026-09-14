import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import CustomText from "@/components/common/CustomText";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslate } from "@/hooks/useTranslation";
import { useFontFamily } from "@/hooks/useFonts";
import {
  PlaceItem,
  createAddress,
  fetchCities,
  fetchProvinces,
} from "@/utils/address";
import { shadow } from "@/utils/shadow";

const emptyForm = {
  addressName: "",
  recipientName: "",
  recipientMobile: "",
  landline: "",
  address: "",
  postalcode: "",
  provinceId: "",
  cityId: "",
  provinceTitle: "",
  cityTitle: "",
};

const PLACEHOLDER_COLOR = "#999";

const webTab = (index: number) =>
  Platform.OS === "web" ? ({ tabIndex: index } as Record<string, number>) : {};

function SelectField({
  placeholder,
  selectedId,
  options,
  disabled,
  open,
  onToggle,
  onSelect,
  textAlign,
  fontFamily,
  tabIndex,
}: {
  placeholder: string;
  selectedId?: string;
  options: PlaceItem[];
  disabled?: boolean;
  open: boolean;
  onToggle: () => void;
  onSelect: (item: PlaceItem) => void;
  textAlign: "left" | "right";
  fontFamily: string;
  tabIndex?: number;
}) {
  const wrapRef = useRef<View>(null);
  const [menuBox, setMenuBox] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const selected = options.find((item) => item.id === selectedId);

  useEffect(() => {
    if (!open || disabled) {
      setMenuBox(null);
      return;
    }

    const measure = () => {
      wrapRef.current?.measureInWindow((x, y, width, height) => {
        setMenuBox({ top: y + height + 4, left: x, width });
      });
    };

    measure();
    const onReposition = () => measure();
    if (Platform.OS === "web") {
      window.addEventListener("resize", onReposition);
      window.addEventListener("scroll", onReposition, true);
      return () => {
        window.removeEventListener("resize", onReposition);
        window.removeEventListener("scroll", onReposition, true);
      };
    }
  }, [disabled, open]);

  const menu =
    open && !disabled && menuBox ? (
      <View pointerEvents="box-none" style={styles.selectOverlayRoot}>
        <Pressable style={styles.selectMenuBackdrop} onPress={onToggle} />
        <View
          style={[
            styles.selectList,
            {
              top: menuBox.top,
              left: menuBox.left,
              width: menuBox.width,
            },
          ]}
        >
          <ScrollView
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            style={styles.selectScroll}
          >
            {options.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.selectItem}
                onPress={() => onSelect(item)}
              >
                <CustomText numberOfLines={1} style={{ textAlign }}>
                  {item.title}
                </CustomText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    ) : null;

  return (
    <View ref={wrapRef} style={styles.selectWrap} collapsable={false}>
      <TouchableOpacity
        style={[styles.input, styles.selectButton]}
        onPress={disabled ? undefined : onToggle}
        activeOpacity={disabled ? 1 : 0.7}
        accessibilityRole="button"
        {...(tabIndex != null ? webTab(tabIndex) : {})}
      >
        <CustomText
          numberOfLines={1}
          style={[
            styles.selectText,
            { textAlign, fontFamily },
            !selected && { color: PLACEHOLDER_COLOR },
          ]}
        >
          {selected?.title || placeholder}
        </CustomText>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color="#888"
        />
      </TouchableOpacity>
      {Platform.OS === "web" && menu && typeof document !== "undefined"
        ? createPortal(menu, document.body)
        : open && menu ? (
            <Modal visible transparent animationType="none">
              {menu}
            </Modal>
          ) : null}
    </View>
  );
}

export default function AddAddressForm({
  visible,
  onClose,
  onSaved,
}: {
  visible: boolean;
  onClose: () => void;
  onSaved?: (result?: { addressID?: string }) => void | Promise<void>;
}) {
  const { user } = useAuth();
  const { t } = useTranslate();
  const { isRTL } = useLanguage();
  const { getFontFamily } = useFontFamily();
  const fontFamily = getFontFamily("normal");
  const textAlign = isRTL ? "right" : "left";

  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [provinces, setProvinces] = useState<PlaceItem[]>([]);
  const [cities, setCities] = useState<PlaceItem[]>([]);
  const [openSelect, setOpenSelect] = useState<"province" | "city" | null>(null);

  useEffect(() => {
    if (!visible) {
      setForm(emptyForm);
      setCities([]);
      setOpenSelect(null);
      setIsSaving(false);
      return;
    }

    if (provinces.length > 0) {
      return;
    }

    void fetchProvinces()
      .then(setProvinces)
      .catch(() => {
        Toast.show({
          type: "error",
          text1: t("common.common.error"),
          text2: t("common.common.connectionError"),
          position: "top",
          topOffset: 20,
        });
      });
  }, [provinces.length, t, visible]);

  const selectProvince = async (item: PlaceItem) => {
    setForm((prev) => ({
      ...prev,
      provinceId: item.id,
      provinceTitle: item.title,
      cityId: "",
      cityTitle: "",
    }));
    setCities([]);
    setOpenSelect(null);
    try {
      setCities(await fetchCities(item.id));
    } catch {
      Toast.show({
        type: "error",
        text1: t("common.common.error"),
        text2: t("common.common.connectionError"),
        position: "top",
        topOffset: 20,
      });
    }
  };

  const closeForm = () => {
    onClose();
  };

  const saveAddress = async () => {
    if (
      !form.addressName.trim() ||
      !form.recipientName.trim() ||
      !form.recipientMobile.trim() ||
      !form.provinceId ||
      !form.cityId ||
      !form.provinceTitle.trim() ||
      !form.cityTitle.trim() ||
      !form.address.trim() ||
      !form.postalcode.trim()
    ) {
      Toast.show({
        type: "error",
        text1: t("common.shipping.fillRequired"),
        position: "top",
        topOffset: 20,
      });
      return;
    }

    if (!user?.phone) {
      return;
    }

    setIsSaving(true);
    try {
      const result = await createAddress({
        userID: user.ID,
        addressID: "",
        addressName: form.addressName.trim(),
        recipientsName: form.recipientName.trim(),
        recipientsPhone: form.landline.trim(),
        recipientsCell: form.recipientMobile.trim(),
        province: form.provinceId,
        city: form.cityId,
        postalCode: form.postalcode.trim(),
        address: form.address.trim(),
        province_id: form.provinceId,
        city_id: form.cityId,
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
        text1: t("common.shipping.addressAdded"),
        position: "top",
        topOffset: 20,
      });
      const addressID =
        result?.addressID != null ? String(result.addressID) : undefined;
      closeForm();
      await onSaved?.({ addressID });
    } catch {
      Toast.show({
        type: "error",
        text1: t("common.common.error"),
        text2: t("common.common.connectionError"),
        position: "top",
        topOffset: 20,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <CustomText style={styles.modalTitle}>
            {t("common.shipping.newAddress")}
          </CustomText>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.formScroll}
          >
            <TextInput
              style={[styles.input, { textAlign, fontFamily }]}
              placeholder={t("common.shipping.addressName")}
              placeholderTextColor={PLACEHOLDER_COLOR}
              value={form.addressName}
              onChangeText={(addressName) =>
                setForm((prev) => ({ ...prev, addressName }))
              }
              {...webTab(1)}
            />
            <View style={[styles.formRow, isRTL && styles.formRowReverse]}>
              <View style={styles.formRowInput}>
                <SelectField
                  placeholder={t("common.shipping.state")}
                  selectedId={form.provinceId}
                  options={provinces}
                  open={openSelect === "province"}
                  onToggle={() =>
                    setOpenSelect((prev) =>
                      prev === "province" ? null : "province",
                    )
                  }
                  onSelect={selectProvince}
                  textAlign={textAlign}
                  fontFamily={fontFamily}
                  tabIndex={2}
                />
              </View>
              <View style={styles.formRowInput}>
                <SelectField
                  placeholder={t("common.shipping.city")}
                  selectedId={form.cityId}
                  options={cities}
                  disabled={!form.provinceId}
                  open={openSelect === "city"}
                  onToggle={() =>
                    setOpenSelect((prev) => (prev === "city" ? null : "city"))
                  }
                  onSelect={(item) => {
                    setForm((prev) => ({
                      ...prev,
                      cityId: item.id,
                      cityTitle: item.title,
                    }));
                    setOpenSelect(null);
                  }}
                  textAlign={textAlign}
                  fontFamily={fontFamily}
                  tabIndex={3}
                />
              </View>
            </View>
            <TextInput
              style={[
                styles.input,
                styles.addressInput,
                { textAlign, fontFamily },
              ]}
              placeholder={t("common.shipping.address")}
              placeholderTextColor={PLACEHOLDER_COLOR}
              value={form.address}
              onChangeText={(address) =>
                setForm((prev) => ({ ...prev, address }))
              }
              multiline
              textAlignVertical="top"
              {...webTab(4)}
            />
            <TextInput
              style={[styles.input, { textAlign, fontFamily }]}
              placeholder={t("common.shipping.postalCode")}
              placeholderTextColor={PLACEHOLDER_COLOR}
              value={form.postalcode}
              onChangeText={(postalcode) =>
                setForm((prev) => ({ ...prev, postalcode }))
              }
              keyboardType="number-pad"
              {...webTab(5)}
            />
            <TextInput
              style={[styles.input, { textAlign, fontFamily }]}
              placeholder={t("common.shipping.recipientName")}
              placeholderTextColor={PLACEHOLDER_COLOR}
              value={form.recipientName}
              onChangeText={(recipientName) =>
                setForm((prev) => ({ ...prev, recipientName }))
              }
              {...webTab(6)}
            />
            <View style={[styles.formRow, isRTL && styles.formRowReverse]}>
              <TextInput
                style={[
                  styles.input,
                  styles.formRowInput,
                  { textAlign, fontFamily },
                ]}
                placeholder={t("common.shipping.landline")}
                placeholderTextColor={PLACEHOLDER_COLOR}
                value={form.landline}
                onChangeText={(landline) =>
                  setForm((prev) => ({ ...prev, landline }))
                }
                keyboardType="phone-pad"
                {...webTab(8)}
              />
              <TextInput
                style={[
                  styles.input,
                  styles.formRowInput,
                  { textAlign, fontFamily },
                ]}
                placeholder={t("common.shipping.mobileNumber")}
                placeholderTextColor={PLACEHOLDER_COLOR}
                value={form.recipientMobile}
                onChangeText={(recipientMobile) =>
                  setForm((prev) => ({ ...prev, recipientMobile }))
                }
                keyboardType="phone-pad"
                {...webTab(7)}
              />
            </View>
          </ScrollView>
          <View style={[styles.modalActions, isRTL && styles.formRowReverse]}>
            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={saveAddress}
              disabled={isSaving}
              {...webTab(9)}
            >
              {isSaving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <CustomText style={styles.saveButtonText}>
                  {t("common.shipping.saveAddress")}
                </CustomText>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={closeForm}
              disabled={isSaving}
              {...webTab(10)}
            >
              <CustomText style={styles.cancelButtonText}>
                {t("common.common.cancel")}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  formRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    width: "100%",
    maxWidth: "100%",
  },
  formRowReverse: {
    flexDirection: "row-reverse",
  },
  formRowInput: {
    flex: 1,
    minWidth: 0,
  },
  formScroll: {
    flexGrow: 0,
    maxHeight: "100%",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    maxWidth: 520,
    width: "100%",
    alignSelf: "center",
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  addressInput: {
    minHeight: 140,
    paddingTop: 12,
  },
  selectWrap: {
    marginBottom: 10,
    width: "100%",
    maxWidth: "100%",
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 0,
    width: "100%",
  },
  selectText: {
    flex: 1,
    minWidth: 0,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: "#333",
  },
  selectOverlayRoot: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  selectMenuBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  selectList: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
    zIndex: 10000,
    ...shadow("#000000", { width: 0, height: 4 }, 0.12, 12, 8),
  },
  selectScroll: {
    maxHeight: 180,
  },
  selectItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f3",
    width: "100%",
  },
  modalActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "600",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
