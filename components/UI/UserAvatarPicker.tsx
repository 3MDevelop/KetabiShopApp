import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "@/components/common/CustomText";
import { useTranslate } from "@/hooks/useTranslation";
import UserAvatarList from "./UserAvatarList";

interface UserAvatarPickerProps {
  visible: boolean;
  selectedAvatar?: number;
  onSelect: (avatar: number) => void;
  onClose: () => void;
}

export default function UserAvatarPicker({
  visible,
  selectedAvatar,
  onSelect,
  onClose,
}: UserAvatarPickerProps) {
  const { t } = useTranslate();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <CustomText style={styles.modalTitle}>
            {t("pages.User.chooseAvatar")}
          </CustomText>
          <ScrollView style={styles.formScroll}>
            <UserAvatarList selectedAvatar={selectedAvatar} onSelect={onSelect} />
          </ScrollView>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onClose}
          >
            <CustomText style={styles.cancelButtonText}>
              {t("common.common.cancel")}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 8,
    textAlign: "center",
  },
  formScroll: {
    flexGrow: 0,
    maxHeight: "100%",
  },
  modalButton: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "600",
  },
});
