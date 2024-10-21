import { useRouter } from 'expo-router';
import React from 'react';

import { Cover } from '@/components/cover';
import { useIsFirstTime } from '@/core/hooks';
import { Button, FocusAwareStatusBar, Text, View } from '@/ui';
export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();
  return (
    <View className="flex h-full items-center  justify-center">
      <FocusAwareStatusBar />
      <View className="w-full flex-1">
        <Cover />
      </View>
      <View className="mb-20 justify-end px-8">
        <Text className="my-3 text-center text-5xl font-bold">
          Welcome to Finverse{' '}
        </Text>
        <Text className="mb-2 text-center text-lg text-gray-600">
          Your all-in-one solution for managing mandates and recurring payments{' '}
        </Text>

        <Text className="my-1 pt-6 text-left text-lg">
          💼 Comprehensive mandate management
        </Text>
        <Text className="my-1 text-left text-lg">
          🔄 Streamlined recurring payments
        </Text>
        <Text className="my-1 text-left text-lg">
          📊 Financial insights at your fingertips
        </Text>
        <Text className="my-1 text-left text-lg">
          🛡️ Secure and reliable transactions
        </Text>
        <Button
          label="Let's Get Started "
          onPress={() => {
            setIsFirstTime(false);
            router.replace('/login');
          }}
        />
      </View>
    </View>
  );
}
