import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword, Auth } from 'firebase/auth';

const auth: Auth = getAuth();

const width = Dimensions.get('window').width;

interface SignInState {
  email: string;
  password: string;
  error: string;
}

const SignIn: React.FC = () => {
  const [value, setValue] = useState<SignInState>({
    email: '',
    password: '',
    error: '',
  });

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View style={styles.container}>
      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}

      <View style={styles.controls}>
        <Input
          placeholder="Email"
          containerStyle={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          style={{ color: 'white' }}
        />

        <Input
          placeholder="Password"
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          style={{ color: 'white' }}
        />

        <Button
          title="Sign in"
          buttonStyle={styles.buttonControl}
          onPress={signIn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#36393e',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10,
    width: width * 0.8,
  },

  buttonControl: {
    marginTop: 10,
    width: width * 0.8,
    backgroundColor: '#7289da',
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  },
});

export default SignIn;
