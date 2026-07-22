import { View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import BookInfoAutherCard from "./BookInfoAutherCard";
import BookInfoActionButtons from "./BookInfoActionButtons";
import BookInfoDetail from "./BookInfoDetail";
import BookInfoPriceCard from "./BookInfoPriceCard";

interface ProvidersData {
  book_size: string;
}
interface BookData {
  id: string;
  title: string;
  author: string;
  publisher: string;
  price: string;
  discountFa: string;
  percentFa: string;
  pic: string;
  isbn: string;
  number_pages: string;
  edition_number: string;
  des_fa: string;
  main_category: string;
  sub_category: string;
  publish_year: string;
  publish_year_fa: string;
  exist: string;
  size: string;
  providers: ProvidersData[];
  publisherbooklist: BookData[];
  authorbooklist: BookData[];
  relatedbooklist: BookData[];
}

interface BookInfoCardProps {
  book?: BookData;
  commented?: boolean;
}

export default function BookInfoCard({ book }: BookInfoCardProps) {
  const { isMobile } = useResponsive();

  return (
    <View
      style={{
        width: isMobile ? "100%" : "60%",
        flexDirection: "column",
      }}
    >
      <BookInfoAutherCard publisher={book?.publisher} auther={book?.author} />
      <BookInfoActionButtons book={book} />
      <BookInfoPriceCard book={book} />
      <BookInfoDetail book={book} />
    </View>
  );
}
