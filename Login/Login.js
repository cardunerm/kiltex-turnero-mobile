import React from "react";
import {
  Text,
  Modal,
  Image,
  View,
  TextInput,
  Button,
  Buttom,
  Alert,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

const Login = ({ visbLogin, setVisbLogin, setVisbNaveg }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setVisbLogin(!visbLogin);
  };

  return (
    <Modal visible={visbLogin}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.banner}>
            <Image
              style={styles.imgBanner}
              source={require("../assets/LogoPadelPrueba.jpg")}
            />
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              rules={{
                required: "Este campo es requerido",
                minLength: {
                  value: 7,
                  message: "La cantidad minima son 7 caracteres",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="user"
            />
            <Text style={styles.errorText}>{errors.user?.message}</Text>
            <Text style={styles.label}>Password</Text>
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
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                  keyboardType="numeric"
                />
              )}
              name="password"
            />
            <Text style={styles.errorText}>{errors.password?.message}</Text>

            <View>
              <Pressable
                style={styles.button}
                color
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.btnText}>Iniciar Secion</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#2b2b2d",
  },
  banner: {
    flexDirection: "row",
    justifyContent: "center",
  },
  imgBanner: {
    marginTop: 50,
    width: 450,
    height: 300,
  },
  form: {
    marginHorizontal: 20,
    backgroundColor: "#399edea8",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 20,
  },
  label: {
    color: "white",
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: "#fff",
    height: 40,
    backgroundColor: "#389ddd",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:'center',
  },
  btnText:{
    color:'#fff',
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 2,
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  errorText: {
    color: "#960303",
  },
});
