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
  const lastFilledIndex = useRef(-1);

  useEffect(() => {
    if (autoFocus && !disabled) {
      setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 300);
    }
  }, [autoFocus, disabled]);

  const handleChange = (text: string, index: number) => {
    if (disabled) return;

    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // ✅ بررسی کامل بودن کد
    const code = newOtp.join("");
    if (code.length === length && newOtp.every((d) => d !== "")) {
      // ✅ فقط اگر آخرین باکس پر شده باشد
      if (index === length - 1 && digit) {
        setTimeout(() => {
          onComplete?.(code);
        }, 150);
      }
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (disabled) return;

    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (event.nativeEvent.key === "Enter") {
      const code = otp.join("");
      if (code.length === length && otp.every((d) => d !== "")) {
        onComplete?.(code);
      }
    }
  };

  const handlePasteWeb = (event: any) => {
    const pastedText = event.nativeEvent?.clipboardData?.getData("text");
    if (pastedText) {
      const digits = pastedText.replace(/[^0-9]/g, "").slice(0, length);
      if (digits.length === length) {
        const newOtp = digits.split("");
        setOtp(newOtp);
        inputsRef.current[length - 1]?.focus();
        // ✅ تاخیر بیشتر برای paste
        setTimeout(() => {
          onComplete?.(digits);
        }, 200);
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
    marginVertical: 16,
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