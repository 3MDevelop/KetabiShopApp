import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function ProfileItem_setLang() {
  const [selectedLang, setSelectedLang] = useState("fa");
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <View style={styles.innerContainer}>
        <Ionicons
          name="language-sharp"
          size={24}
          color="#3996e8"
          style={styles.icon}
        />
        <Text style={styles.title}>تغییر زبان</Text>
        <TouchableOpacity
          style={styles.radioItem}
          onPress={() => setSelectedLang("ar")}
        >
          <Text style={styles.radioLabel}>العربية</Text>
          <View
            style={[
              styles.radioCircle,
              selectedLang === "ar" && styles.radioSelected,
            ]}
          >
            {selectedLang === "ar" && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioItem}
          onPress={() => setSelectedLang("en")}
        >
          <Text style={styles.radioLabel}>English</Text>
          <View
            style={[
              styles.radioCircle,
              selectedLang === "en" && styles.radioSelected,
            ]}
          >
            {selectedLang === "en" && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioItem}
          onPress={() => setSelectedLang("fa")}
        >
          <Text style={styles.radioLabel}>فارسی</Text>
          <View
            style={[
              styles.radioCircle,
              selectedLang === "fa" && styles.radioSelected,
            ]}
          >
            {selectedLang === "fa" && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 8,
  },

  innerContainer: {
    padding: 14,
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    marginLeft: 12,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  arrowIcon: {
    marginLeft: 12,
  },

  radioContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    paddingVertical: 8,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#3996e8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  radioSelected: {
    borderColor: "#3996e8",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3996e8",
  },
  radioLabel: {
    fontSize: 12,
    color: "#333",
  },
});
