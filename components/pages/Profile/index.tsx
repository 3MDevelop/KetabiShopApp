import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";

export default function Offers() {
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.content, { padding: 0 }]}>
        {/* بخش بالایی - قرمز */}
        <View
          style={{
            backgroundColor: "red",
            height: 300,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Top Section</Text>
        </View>
        
        {/* بخش پایینی - زرد */}
        <View
          style={{
            backgroundColor: "yellow",
            minHeight: 800,
            marginTop: -20, // برای همپوشانی اگر می‌خواهید
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 18 }}>Content Section</Text>
        </View>
      </View>
    </ScrollView>
  );
}