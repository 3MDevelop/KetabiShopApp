// components/common/UpdateUserDataBtn.tsx

import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";

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
  return (
    <View
      style={{
        marginBottom: 20,
        flexDirection: "row",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: hasChanges ? "#007AFF" : "#ccc",
          minWidth: 250,
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
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            بروزرسانی اطلاعات حساب کاربری
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}