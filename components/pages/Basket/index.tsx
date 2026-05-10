import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";

type ProductType =
  | "physical_book"
  | "ebook"
  | "audiobook"
  | "podcast"
  | "audio";

interface CartItem {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
  type: ProductType;
  duration?: string;
  maxQuantity?: number;
}

export default function Basket() {
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "کتاب فیزیکی اول",
      author: "نویسنده اول",
      price: 120000,
      quantity: 2,
      type: "physical_book",
      maxQuantity: 10,
    },
    {
      id: 2,
      title: "کتاب الکترونیک دوم",
      author: "نویسنده دوم",
      price: 65000,
      quantity: 1,
      type: "ebook",
      maxQuantity: 1,
    },
    {
      id: 3,
      title: "کتاب صوتی سوم",
      author: "گوینده سوم",
      price: 85000,
      quantity: 1,
      type: "audiobook",
      duration: "3:45:00",
      maxQuantity: 1,
    },
    {
      id: 4,
      title: "پادکست چهارم",
      author: "مجری چهارم",
      price: 45000,
      quantity: 1,
      type: "podcast",
      duration: "45:00",
      maxQuantity: 1,
    },
    {
      id: 5,
      title: "فایل صوتی پنجم",
      author: "هنرمند پنجم",
      price: 35000,
      quantity: 1,
      type: "audio",
      duration: "15:30",
      maxQuantity: 1,
    },
  ]);

  const getProductStyle = (type: ProductType) => {
    switch (type) {
      case "physical_book":
        return {
          name: "book",
          color: "#007AFF",
          bgColor: "#007AFF15",
          label: "کتاب فیزیکی",
        };
      case "ebook":
        return {
          name: "tablet-portrait",
          color: "#9C27B0",
          bgColor: "#9C27B015",
          label: "کتاب الکترونیک",
        };
      case "audiobook":
        return {
          name: "headset",
          color: "#FF6B35",
          bgColor: "#FF6B3515",
          label: "کتاب صوتی",
        };
      case "podcast":
        return {
          name: "mic",
          color: "#FF6B35",
          bgColor: "#FF6B3515",
          label: "پادکست",
        };
      case "audio":
        return {
          name: "musical-notes",
          color: "#FF6B35",
          bgColor: "#FF6B3515",
          label: "فایل صوتی",
        };
      default:
        return {
          name: "document",
          color: "#007AFF",
          bgColor: "#007AFF15",
          label: "محصول",
        };
    }
  };

  const canIncreaseQuantity = (item: CartItem) => {
    if (item.type === "physical_book") {
      return item.quantity < (item.maxQuantity || 99);
    }
    return false;
  };

  const canDecreaseQuantity = (item: CartItem) => {
    if (item.type === "physical_book") {
      return item.quantity > 1;
    }
    return false;
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    

    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }

   

    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i)),
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setCartItems([]);
      router.push("/");
    }
  };
  if (cartItems.length === 0) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.emptyCartContainer}>
            <Ionicons name="cart-outline" size={80} color="#ccc" />
            <Text style={styles.emptyCartTitle}>🛒 سبد خرید خالی است</Text>
            <Text style={styles.emptyCartText}>
              هنوز محصولی به سبد خرید اضافه نکرده‌اید.
              {"\n"}
              برای خرید، به فروشگاه بروید و محصولات مورد نظر خود را انتخاب کنید.
            </Text>

            <TouchableOpacity
              style={styles.shopButton}
              onPress={() => router.push("/booklist")}
            >
              <Ionicons name="book-outline" size={20} color="#fff" />
              <Text style={styles.shopButtonText}>مشاهده محصولات</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* هدر */}
        <View style={styles.header}>
          <Ionicons name="cart" size={28} color="#007AFF" />
          <Text style={styles.title}>سبد خرید</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItems.length}</Text>
          </View>
        </View>

        {/* لیست آیتم‌های سبد خرید */}
        <View style={styles.cartListContainer}>
          {cartItems.map((item) => {
            const productStyle = getProductStyle(item.type);
            const isDigital = item.type !== "physical_book";
            const isEbook = item.type === "ebook";

            return (
              <View key={item.id} style={styles.cartCard}>
                <View style={styles.cartItemInfo}>
                  <View
                    style={[
                      styles.productIcon,
                      { backgroundColor: productStyle.bgColor },
                    ]}
                  >
                    <Ionicons
                      name={productStyle.name as any}
                      size={24}
                      color={productStyle.color}
                    />
                  </View>
                  <View style={styles.cartItemDetails}>
                    <View style={styles.productHeader}>
                      <Text style={styles.cartItemTitle}>{item.title}</Text>
                      <View
                        style={[
                          styles.productTypeBadge,
                          { backgroundColor: `${productStyle.color}20` },
                        ]}
                      >
                        <Text
                          style={[
                            styles.productTypeText,
                            { color: productStyle.color },
                          ]}
                        >
                          {productStyle.label}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.cartItemAuthor}>{item.author}</Text>
                    {item.duration && (
                      <Text style={styles.productDuration}>
                        <Ionicons name="time-outline" size={12} color="#999" />{" "}
                        {item.duration}
                      </Text>
                    )}
                    {isEbook && (
                      <Text style={styles.digitalBadge}>
                        <Ionicons
                          name="cloud-outline"
                          size={12}
                          color="#9C27B0"
                        />{" "}
                        دانلود آنی پس از خرید
                      </Text>
                    )}
                    {isDigital && item.type !== "ebook" && (
                      <Text style={styles.digitalBadge}>
                        <Ionicons
                          name="headset-outline"
                          size={12}
                          color="#FF6B35"
                        />{" "}
                        پخش آنلاین و دانلود
                      </Text>
                    )}
                    <Text
                      style={[
                        styles.cartItemPrice,
                        { color: productStyle.color },
                      ]}
                    >
                      {(item.price * item.quantity).toLocaleString()} تومان
                    </Text>
                  </View>
                </View>

                <View style={styles.cartItemActions}>
                  {/* کنترل تعداد - فقط برای کتاب فیزیکی */}
                  {item.type === "physical_book" ? (
                    <View style={styles.quantityControl}>
                      <TouchableOpacity
                        style={[
                          styles.quantityButton,
                          !canDecreaseQuantity(item) &&
                            styles.quantityButtonDisabled,
                        ]}
                        onPress={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={!canDecreaseQuantity(item)}
                      >
                        <Ionicons name="remove" size={18} color="#fff" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={[
                          styles.quantityButton,
                          !canIncreaseQuantity(item) &&
                            styles.quantityButtonDisabled,
                        ]}
                        onPress={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={!canIncreaseQuantity(item)}
                      >
                        <Ionicons name="add" size={18} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  ) : null}

                  <Text style={styles.unitPrice}>
                    {item.price.toLocaleString()} تومان
                  </Text>

                  {/* دکمه حذف */}
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {/* بخش جمع‌کل و پرداخت */}
        <View style={styles.checkoutCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>جمع کل:</Text>
            <Text style={styles.totalPrice}>
              {calculateTotal().toLocaleString()} تومان
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.finalLabel}>مبلغ قابل پرداخت:</Text>
            <Text style={styles.finalPrice}>
              {calculateTotal().toLocaleString()} تومان
            </Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Ionicons name="card-outline" size={22} color="#fff" />
            <Text style={styles.checkoutButtonText}>پرداخت نهایی</Text>
          </TouchableOpacity>

          {!isLoggedIn && (
            <Text style={styles.loginHint}>
              ⚠️ برای پرداخت، به حساب کاربری خود وارد شوید
            </Text>
          )}
        </View>

        {/* دکمه ادامه خرید */}
        <TouchableOpacity
          style={styles.continueShoppingButton}
          onPress={() => router.push("/booklist")}
        >
          <Ionicons name="arrow-back-outline" size={20} color="#007AFF" />
          <Text style={styles.continueShoppingText}>ادامه خرید</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
