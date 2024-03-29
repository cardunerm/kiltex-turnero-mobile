import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { styles } from "../css/CssSignIn";
import { registerApi } from "../../Service/ServSignIn";
import { FontAwesome } from '@expo/vector-icons';

const FormSignIn = ({
  visbRegister,
  setVisbRegister,
  cargando,
  setCargando,
}) => {
  const [viewPassword, setViewPassword] = useState(true);
  const [viewPasswordConfirm, setViewPasswordConfirm] = useState(true);
  //MANEJO DEL FORMULARIO
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
      phoneNumber:''
    },
  });

  const carga = cargando ? (
    <ActivityIndicator size="large" color="#fff" />
  ) : (
    <Text>Registrar</Text>
  );

  const onSubmit = (data) => {
    registerApi(data, setVisbRegister, visbRegister, setCargando, cargando);
    setCargando(true);

    reset();
  };
  return (
    <View style={styles.form} autoComplete="off">
      <Text style={styles.label}>Nombre</Text>
      <Controller
        control={control}
        rules={{
          required: "Este campo es requerido",
          minLength: {
            value: 4,
            message: "La cantidad minima son 4 caracteres",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            keepSubmitCount={false}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Nombre"
            keyboardType="default"
          />
        )}
        name="firstName"
      />
      <Text style={styles.errorText}>{errors.firstName?.message}</Text>

      <Text style={styles.label}>Apellido</Text>
      <Controller
        control={control}
        rules={{
          required: "Este campo es requerido",
          minLength: {
            value: 4,
            message: "La cantidad minima son 4 caracteres",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            keepSubmitCount={false}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Apellido"
            keyboardType="default"
          />
        )}
        name="lastName"
      />
      <Text style={styles.errorText}>{errors.lastName?.message}</Text>

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
            keepSubmitCount={false}
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
      <Text style={styles.label}>Contraseña</Text>
      <Controller
        control={control}
        rules={{
          required: "Este campo es requerido",
          minLength: {
            value: 8,
            message: "La contraseña debe ser alfanumerica y tener 8 caracteres",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={viewPassword}
            placeholder="Contraseña"
          
          />
        )}
        name="password"
      />
      <View>
        <Pressable style={viewPassword ?{ position:'relative',marginTop:-35,right:-300,width:30,height:40}:{display:"none"}} color onPress={(e)=>{setViewPassword(false)}}>
          <FontAwesome name="eye" size={24} color="black"/>
        </Pressable>
        <Pressable style={!viewPassword ?{ position:'relative',marginTop:-35,right:-300,width:30,height:40}:{display:"none"}} color onPress={(e)=>{setViewPassword(true)}}>
        <FontAwesome name="eye-slash" size={24} color="black" />
        </Pressable>
      </View>
      <Text style={styles.errorText}>{errors.password?.message}</Text>

      <Text style={styles.label}>Confirmar Contraseña</Text>
      <Controller
        control={control}
        rules={{
          required: "Este campo es requerido",
          minLength: {
            value: 8,
            message: "La contraseña debe ser alfanumerica y tener 8 caracteres",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={viewPasswordConfirm}
            placeholder="Confirmar contraseña"
          />
        )}
        name="confirmPassword"
      />
      <View>
        <Pressable style={viewPasswordConfirm ?{ position:'relative',marginTop:-35,right:-300,width:30,height:40}:{display:"none"}} color onPress={(e)=>{setViewPasswordConfirm(false)}}>
          <FontAwesome name="eye" size={24} color="black"/>
        </Pressable>
        <Pressable style={!viewPasswordConfirm ?{ position:'relative',marginTop:-35,right:-300,width:30,height:40}:{display:"none"}} color onPress={(e)=>{setViewPasswordConfirm(true)}}>
        <FontAwesome name="eye-slash" size={24} color="black" />
        </Pressable>
      </View>
      <Text style={styles.errorText}>{errors.confirmPassword?.message}</Text>
          


      <Text style={styles.label}>Telefono</Text>
      <Controller
        control={control}
        rules={{
          required: "Este campo es requerido",
          minLength: {
            value: 8,
            message: "Ingrese su numero de telefono",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Telefono..."
            keyboardType="numeric"
          />
        )}
        name="phoneNumber"
      />
      <Text style={styles.errorText}>{errors.phoneNumber?.message}</Text>

      <View>
        <Pressable style={styles.button} color onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btnText}>{carga}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FormSignIn;
