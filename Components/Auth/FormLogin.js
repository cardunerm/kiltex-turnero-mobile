import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { logApi } from "../../Service/ServLogin";
import { styles } from "../css/CssLogin";
import { FontAwesome } from '@expo/vector-icons';

const FormLogin = ({ setToken, cargando, setCargando }) => {
  const navigation = useNavigation();
  const [viewPassword, setViewPassword] = useState(true);
  //MANEJO DEL FORMULARIO
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setCargando(true);
    logApi(data, setCargando, setToken);
    reset();
  };

  const carga = cargando ? (
    <ActivityIndicator size="large" color="#fff" />
  ) : (
    <Text>Iniciar Sesion</Text>
  );
  return (
    <>
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        rules={{
          required: "Este campo es requerido",
          minLength: {
            value: 11,
            message: "La cantidad minima son 11 caracteres",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="E-mail"
            keyboardType="email-address"
          />
        )}
        name="emailAddress"
      />
      <Text style={styles.errorText}>{errors.emailAddress?.message}</Text>
      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        rules={{
          required: "Este campo es requerido",
          minLength: {
            value: 1,
            message: "La contraseña debe ser alfanumerica y tener 8 caracteres",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            placeholder="contraseña"
            onChangeText={onChange}
            value={value}
            secureTextEntry={viewPassword}
            keyboardType="default"
          />
        )}
        name="password"
      />
      <View>
        <Pressable style={viewPassword ?{ position:'relative',marginTop:-35,right:-280,width:30,height:40}:{display:"none"}} color onPress={(e)=>{setViewPassword(false)}}>
          <FontAwesome name="eye" size={24} color="black"/>
        </Pressable>
        <Pressable style={!viewPassword ?{ position:'relative',marginTop:-35,right:-280,width:30,height:40}:{display:"none"}} color onPress={(e)=>{setViewPassword(true)}}>
        <FontAwesome name="eye-slash" size={24} color="black" />
        </Pressable>
      </View>
      <Text style={styles.errorText}>{errors.password?.message}</Text>

      <View>
        <Pressable style={styles.button} color onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btnText}>{carga}</Text>
        </Pressable>
      </View>
    </>
  );
};

export default FormLogin;
