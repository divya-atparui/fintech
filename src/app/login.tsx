/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useGetAuthToken } from '@/api/auth';
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
  const { mutate: getToken, isError } = useGetAuthToken(); 
  // const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormType) => {

    getToken(
      {
        username: data.username,
        password: data.password,
      },
      {
        onSuccess: async (data) => {
          signIn({
            access: data.base64EncodedAuthenticationKey,
            refresh: data.base64EncodedAuthenticationKey,
          });
          console.log(data);
          router.push('/');
        },
        onError: (error) => {
          console.log('error', error);
        },
      },
    );

   
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
        {
          isError && <Text className="text-red-500">Invalid credentials</Text>
        }
      </View>
    </SafeAreaView>
  );
}
