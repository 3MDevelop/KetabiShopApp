import { StyleSheet } from "react-native";

export default StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginHorizontal:'auto',
    width:'100%',
    maxWidth:1000,
    
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  userInfoCard: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    margin: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  userDetail: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
