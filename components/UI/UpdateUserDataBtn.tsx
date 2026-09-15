// components/common/UpdateUserDataBtn.tsx

import { useTranslate } from "@/hooks/useTranslation";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import CustomText from "@/components/common/CustomText";

interface UpdateUserDataBtnProps {
  hasChanges: boolean;
  onPress?: () => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function UpdateUserDataBtn({
  hasChanges,
  onPress,
  onCancel,
  isLoading = false,
}: UpdateUserDataBtnProps) {
  const { t } = useTranslate();
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {onCancel ? (
        <TouchableOpacity
          style={{
            backgroundColor: hasChanges ? "#e7651a" : "#ccc",
            minWidth: 170,
            paddingVertical: 12,
            borderRadius: 8,
            opacity: hasChanges && !isLoading ? 1 : 0.6,
          }}
          onPress={onCancel}
          disabled={!hasChanges || isLoading}
        >
          <CustomText
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {t("common.common.userCancelBtn")}
          </CustomText>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        style={{
          backgroundColor: hasChanges ? "#007AFF" : "#ccc",
          minWidth: 230,
          paddingVertical: 12,
          paddingHorizontal: 18,
          borderRadius: 8,
          opacity: hasChanges && !isLoading ? 1 : 0.6,
        }}
        onPress={onPress}
        disabled={!hasChanges || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <CustomText
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {t("common.common.userUpdateBtn")}
          </CustomText>
        )}
      </TouchableOpacity>
    </View>
  );
}
