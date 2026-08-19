import { View,TouchableOpacity } from "react-native"; 
import { useRouter } from "expo-router";
import { useRef } from "react";
import UserAvatar from "./userAvatar";


 export default function NavbarUserIcon(){
  const profileRef = useRef<View>(null);

    const router = useRouter()
    return(
        <TouchableOpacity
            style={{ marginBottom: 5, marginHorizontal: 10 }}
            ref={profileRef}
            onPress={() => {
              router.push("/profile");
            }}
            activeOpacity={0.7}
          >
            <UserAvatar iconWidth={50} />
          </TouchableOpacity>
    )
 }