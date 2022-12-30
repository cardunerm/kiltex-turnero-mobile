import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheet, Button, ListItem } from "@rneui/themed";
import { styles } from "../css/CssDetailsCourts";
import { stylesvar } from "../css/variables_Css";

const BtnTurnFijoLibre = ({ params,court}) => {
  
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const list = [
    {
      title: "Turno Libre",
      containerStyle: { borderColor: "#0853b5", borderWidth: 2, marginVertical: 50, },
      titleStyle: { color: "#000", fontSize: 25 },
      onPress: () => {
        navigation.navigate("TurnoLibre", {id:params,court:court}), setIsVisible(false);
      },
    },
    {
      title: "Cancelar",
      containerStyle: {
        backgroundColor: "#0853b5",
        flexDirection: "column",
        alignItems: "center",
      },
      titleStyle: {
        color: "white",
        fontSize: 25,
        fontWeight: "600",
        textAlign: "center",
      },
      onPress: () => setIsVisible(false),
    },
  ];
  return (
    <>
      <SafeAreaProvider>
        <Button
          title="Solicitar Turno"
          onPress={() => setIsVisible(true)}
          buttonStyle={[styles.btnAddTurno,stylesvar.var_colorSecundario]}
        />
        <BottomSheet modalProps={{}} isVisible={isVisible}>
          <View style={styles.botones}>
            {list.map((l, i) => (
              <ListItem
                key={i}
                containerStyle={l.containerStyle}
                onPress={l.onPress}
              >
                <ListItem.Content>
                  <ListItem.Title style={l.titleStyle}>
                    {l.title}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </BottomSheet>
      </SafeAreaProvider>
    </>
  );
};

export default BtnTurnFijoLibre;
