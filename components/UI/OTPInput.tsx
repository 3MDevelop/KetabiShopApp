// components/UI/OTPInput.tsx
import { View, TextInput, StyleSheet } from "react-native";
import React, { useRef, useState, useEffect } from "react";

interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
}

export default function OTPInput({
  length = 5,
  onComplete,
  autoFocus = true,
  disabled = false,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<(TextInput | null)[]>([]);

  // فوکوس خودکار روی باکس اول
  useEffect(() => {
    if (autoFocus && !disabled) {
      setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 100);
    }
  }, [autoFocus, disabled]);

  const handleChange = (text: string, index: number) => {
    if (disabled) return;

    // فقط یک رقم مجاز است
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // اگر رقم وارد شد، برو به باکس بعدی
    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // ✅ اگر همه ارقام پر شد، خودکار تایید کن
    if (digit && index === length - 1) {
      const code = newOtp.join("");
      if (code.length === length) {
        onComplete?.(code);
      }
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (disabled) return;

    // اگر کلید Backspace زده شد و باکس خالی بود، برو به باکس قبلی
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    // ✅ اگر Enter زده شد و همه باکس‌ها پر هستند، تایید کن
    if (event.nativeEvent.key === "Enter") {
      const code = otp.join("");
      if (code.length === length) {
        onComplete?.(code);
      }
    }
  };

  // تابع جداگانه برای paste در وب
  const handlePasteWeb = (event: any) => {
    const pastedText = event.nativeEvent?.clipboardData?.getData("text");
    if (pastedText) {
      const digits = pastedText.replace(/[^0-9]/g, "").slice(0, length);
      if (digits.length === length) {
        const newOtp = digits.split("");
        setOtp(newOtp);
        inputsRef.current[length - 1]?.focus();
        onComplete?.(digits);
      }
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputsRef.current[index] = ref;
          }}
          style={[
            styles.input,
            digit ? styles.inputFilled : styles.inputEmpty,
            disabled && styles.inputDisabled,
          ]}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          // @ts-ignore - onPaste فقط برای وب است
          onPaste={handlePasteWeb}
          keyboardType="number-pad"
          maxLength={1}
          editable={!disabled}
          selectTextOnFocus
          textAlign="center"
          placeholder="•"
          placeholderTextColor="#ccc"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    
  },
  input: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  inputEmpty: {
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  inputFilled: {
    borderColor: "#007AFF",
    backgroundColor: "#f0f7ff",
  },
  inputDisabled: {
    backgroundColor: "#f5f5f5",
    borderColor: "#e0e0e0",
    color: "#999",
  },
});