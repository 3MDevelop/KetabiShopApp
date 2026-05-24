import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View,TextInput } from "react-native";
import CustomText from "@/components/common/CustomText";

interface UserPageFormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

export default function UserPageFormField({
  label,
  value,
  onChangeText,
  iconName = "person-outline",
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
}: UserPageFormFieldProps) {
  return (
    <View style={styles.formFieldContainer}>
      <View style={styles.fieldIcon}>
        <Ionicons name={iconName} size={20} color="#007AFF" />
      </View>
      <View style={styles.fieldContent}>
        <CustomText style={styles.fieldLabel}>{label}</CustomText>
        <TextInput
          style={styles.fieldInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || label}
          placeholderTextColor="#ccc"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          textAlign="right"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  fieldIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0f7ff",
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 11,
    color: "#999",
    marginBottom: 4,
  },
  fieldInput: {
    fontSize: 15,
    color: "#333",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    textAlign: "right",
  },
});
