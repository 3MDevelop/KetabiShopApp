// components/common/UpdateUserDataBtn.tsx

import { View, TouchableOpacity, Text } from "react-native";

interface UpdateUserDataBtnProps {
  hasChanges: boolean;
 
}

export default function UpdateUserDataBtn({
  hasChanges,
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
          opacity: hasChanges ? 1 : 0.6,
        }}
        disabled={!hasChanges}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          بروزرسانی اطلاعات حساب کاربری
        </Text>
      </TouchableOpacity>
    </View>
  );
}
