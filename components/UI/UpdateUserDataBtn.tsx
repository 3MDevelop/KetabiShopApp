// components/common/UpdateUserDataBtn.tsx

import { useTranslate } from "@/hooks/useTranslation";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import CustomText from "@/components/common/CustomText";

interface UpdateUserDataBtnProps {
  hasChanges: boolean;
  onPress?: () => void | Promise<void>;
  isLoading?: boolean;
}

export default function UpdateUserDataBtn({
  hasChanges,
  onPress,
  isLoading = false,
}: UpdateUserDataBtnProps) {
  const { t } = useTranslate();
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: hasChanges ? "#007AFF" : "#ccc",
          minWidth: 170,
          paddingVertical: 12,
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
            {t("commob.common.userUpdateBtn")}
          </CustomText>
        )}
      </TouchableOpacity>
    </View>
  );
}
