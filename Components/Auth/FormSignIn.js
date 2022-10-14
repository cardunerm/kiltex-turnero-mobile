import React from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { styles } from "../css/CssSignIn";
import { registerApi } from "../../Service/ServSignIn";

const FormSignIn = ({ visbRegister, setVisbRegister }) => {
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
    },
  });

  const onSubmit = (data) => {
    registerApi(data);

    setVisbRegister(!visbRegister);
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
            secureTextEntry={true}
            placeholder="Contraseña"
          />
        )}
        name="password"
      />
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
            secureTextEntry={true}
            placeholder="Confirmar contraseña"
          />
        )}
        name="confirmPassword"
      />
      <Text style={styles.errorText}>{errors.confirmPassword?.message}</Text>

      <View>
        <Pressable style={styles.button} color onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btnText}>Registrar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FormSignIn;
