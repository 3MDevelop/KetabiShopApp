// components/UI/preList.tsx

import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/components/common/CustomText";
import { useState, useEffect } from "react";
import BookThumb from "@/components/UI/BookThumb";

interface PreListProps {
  label?: string;
  listHeight?: number;
  fImage?: any;
  books?: any[];
}

export default function PreList({
  label = "sampleTitle",
  fImage,
  listHeight = 250,
  books = [],
}: PreListProps) {
  const [aspectRatio, setAspectRatio] = useState(1);

  const defaultBooks = [
    { id: "1", name: "کتاب 1", color: "#FF6B6B" },
    { id: "2", name: "کتاب 2", color: "#4ECDC4" },
    { id: "3", name: "کتاب 3", color: "#45B7D1" },
    { id: "4", name: "کتاب 4", color: "#96CEB4" },
    { id: "5", name: "کتاب 5", color: "#FFEAA7" },
    { id: "6", name: "کتاب 6", color: "#DDA0DD" },
    { id: "7", name: "کتاب 7", color: "#98D8C8" },
  ];

  const displayBooks = books.length > 0 ? books : defaultBooks;

  useEffect(() => {
    if (fImage && fImage.width && fImage.height) {
      setAspectRatio(fImage.width / fImage.height);
    }
  }, [fImage]);

  const handleBookPress = (bookName: string) => {
    Alert.alert("کلیک شد", `کتاب ${bookName} انتخاب شد`);
  };



  return (
    <View style={{ width: "100%" }}>
      <View style={styles.categoryCard}>
        <View style={styles.header}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <CustomText style={styles.categoryName}>{label}</CustomText>
            <Ionicons name="arrow-back-outline" size={16} color="gray" />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            height: listHeight,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {fImage ? (
            <Image
              style={{
                height: listHeight,
                width: aspectRatio * listHeight,
                backgroundColor: "#ddd",
                marginStart: 16,
              }}
              source={fImage}
              resizeMode="cover"
            />
          ) : null}

          <View style={styles.container}>
            
              <TouchableOpacity
                style={[styles.navButton, styles.prevButton]}
                
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-back" size={24} color="#333" />
              </TouchableOpacity>
            

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              decelerationRate="fast"
              bounces={true}
              scrollEventThrottle={16}
            >
              {displayBooks.map((book, index) => (
                <BookThumb
                  key={book.id + index}
                  label={book.name}
                  backgroundColor={book.color}
                  onPress={() => handleBookPress(book.name)}
                />
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[styles.navButton, styles.nextButton]}
              
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-forward" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  header: {
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    position: "relative",
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
    alignItems: "center",
  },
  navButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 18,
    position: "absolute",
    top: "50%",
    marginTop: -18,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#eee",
  },
  prevButton: {
    left: 8,
  },
  nextButton: {
    right: 8,
  },
});
