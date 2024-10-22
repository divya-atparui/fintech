/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuth } from '@/core';
import { Button, ControlledInput, SafeAreaView, Text, View } from '@/ui';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormType = z.infer<typeof schema>;

export default function Login() {
  const router = useRouter();

  const { signIn } = useAuth();
  // const { mutate: getToken } = useGetAuthToken();
  // const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormType) => {
    // setIsLoading(true);
    // try {
    //   const response = await fetch(
    //     'https://api.finverse3.com/fineract-provider/api/v1/authentication',
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Accept': 'application/json',
    //         'Fineract-Platform-TenantId': 'default',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(data),
    //     },
    //   );

    //   if (!response.ok) {
    //     throw new Error('Login failed');
    //   }

    //   const responseData = await response.json();
    //   console.log('Login successful:', responseData);
    //   Alert.alert('Success', 'Login successful');
    //   // Handle successful login (e.g., store token, navigate to home screen)
    // } catch (error) {
    //   console.error('Login error:', error);
    //   Alert.alert('Error', 'Login failed. Please check your credentials and try again.');
    // } finally {
    //   setIsLoading(false);
    // }

    console.log(data);

    signIn({
      access : "bWlmb3M6cGFzc3dvcmQ=",
      refresh : "bWlmb3M6cGFzc3dvcmQ="
    })

    // getToken(
    //   {
    //     username: data.username,
    //     password: data.password,
    //   },
    //   {
    //     onSuccess: async (data) => {
    //       signIn({
    //         access: data.base64EncodedAuthenticationKey,
    //         refresh: data.base64EncodedAuthenticationKey,
    //       });
    //       console.log(data);
    //     },
    //     onError: (error) => {
    //       console.log('error', error);
    //     },
    //   },
    // );

    router.push('/');
  };

  return (
    <SafeAreaView>
      <View className="p-5">
        <Text className="mt-20 text-3xl font-bold">Login</Text>
        <ControlledInput
          control={control}
          name="username"
          label="Username"
          textContentType="username"
          autoCapitalize="none"
        />
        <ControlledInput
          control={control}
          name="password"
          label="Password"
          secureTextEntry
          textContentType="password"
        />
        <Button
          label="Login"
          onPress={handleSubmit(onSubmit)}
          // disabled={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}
