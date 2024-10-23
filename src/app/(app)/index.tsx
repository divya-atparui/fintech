import { Link } from 'expo-router';
import React, { useEffect } from 'react';

import { useMandateStore } from '@/core/mandates';
import { Pressable, ScrollView, Text, View } from '@/ui';

export default function MandatesInfoScreen() {
  const { mandates, loadMandates } = useMandateStore();

  useEffect(() => {
    loadMandates();
  }, []);
  // const { data, isPending, isError } = usePosts();
  // const renderItem = React.useCallback(
  //   ({ item }: { item: Post }) => <Card {...item} />,
  //   []
  // );

  // if (isError) {
  //   return (
  //     <View>
  //       <Text> Error Loading data </Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView className="flex-1 px-10">
      {mandates.length === 0 ? (
        <View className='h-[600px] items-center justify-center'>
          <Text>No mandates available.</Text>
          <Link href="/feed/add-mandate" asChild>
            <Pressable className='rounded-xl bg-orange-400 px-10 py-2 '>
              <Text className="px-3 text-white">Create</Text>
            </Pressable>
          </Link>
        </View> // Display this message if mandates are empty
      ) : (
        mandates.map((mandate, index) => (
          <View key={index} className="my-2 rounded-lg bg-charcoal-300 p-4 shadow-2xl">
           
            <Text className="text-lg font-bold text-orange-50">Mandate for {mandate.toAccount}</Text>
            <Text className=''>From Account: {mandate.fromAccount}</Text>
            <Text>Payment Type: {mandate.paymentType}</Text>
            <Text>From Date: {new Date(mandate.fromDate).toDateString()}</Text>
            {mandate.toDate && <Text>To Date: {new Date(mandate.toDate).toDateString()}</Text>}
            <Text>Amount Debited: {mandate.amountDebited}</Text>
            <Text>Reference ID for Savings Account: {mandate.savingsId}</Text>
            <Text>Reference ID for Resource: {mandate.resourceId}</Text>
            <Text>Transfer Description: {mandate.transferDescription}</Text>

          </View>
        ))
      )}
      {/* <FocusAwareStatusBar />
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        estimatedItemSize={300}
      /> */}
    </ScrollView>
  );
}
