import { View } from "react-native";

interface TagPreListProps {
  listHeight?: number;
}

export default function TagPreList({ listHeight }: TagPreListProps) {
  return <View style={{ height: listHeight }}>  {listHeight}1234  </View>;
}
