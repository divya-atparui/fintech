/* eslint-disable max-lines-per-function */

import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack, useRouter } from 'expo-router';
import * as React from 'react';
import { Controller,useForm } from 'react-hook-form';
import { Platform,TouchableOpacity } from 'react-native';
import { z } from 'zod';

import { useMakeTransaction } from '@/api/transaction/use-make-transaction';
import { useAuth } from '@/core';
import { useMandateStore } from '@/core/mandates';
import { Button, Checkbox, ControlledSelect, Radio,Text, View } from '@/ui';

const schema = z.object({
  fromAccount: z.string().min(1, "From account is required"),
  toAccount: z.string().min(1, "To account is required"),
  paymentType: z.enum(["one-time", "recurring"]),
  fromDate: z.date(),
  toDate: z.date().optional(),
  confirmationCheckbox: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms",
  }),
}).refine((data) => {
  if (data.paymentType === "recurring") {
    return data.toDate !== undefined;
  }
  return true;
}, {
  message: "To Date is required for recurring payments",
  path: ["toDate"],
});



type FormType = z.infer<typeof schema>;

export default function PaymentMandateForm() {



 const {mutate:makeMandate} = useMakeTransaction()
  const router = useRouter()
  const { token } = useAuth();
  console.log(token)
  


 const {addMandate} =  useMandateStore()
  const { control, handleSubmit, watch } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentType: "one-time",
      fromDate: new Date(),
      confirmationCheckbox: false,
    },
  });

  const [showFromDatePicker, setShowFromDatePicker] = React.useState(false);
  const [showToDatePicker, setShowToDatePicker] = React.useState(false);

  const paymentType = watch("paymentType");
  const fromAccount = watch("fromAccount");
  const toAccount = watch("toAccount");
  const fromDate = watch("fromDate");
  const toDate = watch("toDate");
  const confirmationCheckbox = watch("confirmationCheckbox");


  // This date will for the users account will be necessary 
  // which will contain account 
  const fromAccountOptions = [
    { value: 'account1', label: 'Checking Account' },
    { value: 'account2', label: 'Savings Account' },
  ];

  const toAccountOptions = [
    { value: 'netflix', label: 'Netflix' },
    { value: 'amazon', label: 'Amazon' },
  ];

  const generateMandateText = () => {
    if (!fromAccount || !toAccount || !fromDate) return "";

    let text = `Mandate for ${toAccountOptions.find(opt => opt.value === toAccount)?.label} (ID: ${toAccount})\n`;
    text += `This mandate is created to authorize a ${paymentType} payment of R.100 from your ${fromAccountOptions.find(opt => opt.value === fromAccount)?.label} to ${toAccountOptions.find(opt => opt.value === toAccount)?.label}.\n`;
    text += `For Date: ${fromDate.toDateString()}\n`;
    if (paymentType === "recurring" && toDate) {
      text += `To Date: ${toDate.toDateString()}\n`;
    }
    return text;
  };

  const onSubmit = (values: FormType) => {
    console.log(values);
   

     makeMandate(
      {
        authToken : "bWlmb3M6cGFzc3dvcmQ=",
        toOfficeId: 1,
        toClientId: 115,
        toAccountId: 29,
        toAccountType : 2,
        fromOfficeId: 1,
        fromClientId: 115,
        fromAccountId: "29",
        fromAccountType : "2",
        transferAmount: 100,
     
        transferDescription: generateMandateText(),
      },
      {
        onSuccess : async (data) => {
          console.log(data)
          addMandate({
            fromAccount: values.fromAccount,
            toAccount: values.toAccount,
            paymentType: values.paymentType,
            fromDate: values.fromDate,
            toDate: values.toDate,
            amountDebited: 100,
            resourceId: data.resourceId,
            savingsId: data.savingsId,
            transferDescription: generateMandateText(),
          });

          router.push("/")
        },
        onError : (error) => {
          console.log('error', error);
        }
      },
      
    )

 



    // Handle form submission here
  };


  return (
    <>
      <Stack.Screen
        options={{
          title: 'Payment Mandate',
          headerBackTitle: 'Mandates',
        }}
      />
      <View className="flex flex-1 gap-3 p-4">
        
        <ControlledSelect
          label="Account to initiate payment from"
          name="fromAccount"
          options={fromAccountOptions}
          control={control}
        />

        <ControlledSelect
          label="Account to initiate payment to"
          name="toAccount"
          
          options={toAccountOptions}
          control={control}
        />

        <Controller
          control={control}
          name="paymentType"
          render={({ field: { onChange, value } }) => (
            <View >
              <Text className='text-xl font-bold'>Payment Type</Text>
              <View className='flex w-full flex-row items-center  gap-10 p-2'>

              <Radio
                label="One-time"
                checked={value === 'one-time'}
                onChange={() => onChange('one-time')}
                accessibilityLabel="One-time payment"
              />
              <Radio
                label="Recurring"
                checked={value === 'recurring'}
                onChange={() => onChange('recurring')}
                accessibilityLabel="Recurring payment"
              />
              </View>
            </View>
          )}
        />
        <View className='flex flex-row gap-5'>
        <Controller
          control={control}
          name="fromDate"
          render={({ field: { onChange, value } }) => (
            <View className='flex-1'>
              <Text className='text-xl font-bold'>From Date</Text>
              <TouchableOpacity className=' items-center rounded-lg bg-orange-400 p-2' onPress={() => setShowFromDatePicker(true)}>
                <Text className='text-white'>{value.toDateString()}</Text>
              </TouchableOpacity>
              {showFromDatePicker && (
                <DateTimePicker
                  value={value}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowFromDatePicker(Platform.OS === 'ios');
                    if (selectedDate) {
                      onChange(selectedDate);
                    }
                  }}
                />
              )}
            </View>
          )}
        />

        {paymentType === "recurring" && (
          <Controller
            control={control}
            name="toDate"
            render={({ field: { onChange, value } }) => (
              <View className='flex-1'>
                <Text className='text-xl font-bold'>To Date</Text>
                <TouchableOpacity className=' items-center rounded-lg bg-orange-400 p-2' onPress={() => setShowToDatePicker(true)}>
                  <Text className='text-white'>{value ? value.toDateString() : 'Select Date'}</Text>
                </TouchableOpacity>
                {showToDatePicker && (
                  <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowToDatePicker(Platform.OS === 'ios');
                      if (selectedDate) {
                        onChange(selectedDate);
                      }
                    }}
                  />
                )}
              </View>
            )}
          />
        )}
        </View>

       

        <View className="mt-5 rounded border border-gray-300 p-2">
          <Text>{generateMandateText()}</Text>
        </View>

        <Controller
          control={control}
          name="confirmationCheckbox"
          render={({ field: { onChange, value } }) => (
            <Checkbox
              label="Please agree with the above. If you are satisfied, confirm the transaction."
              checked={value}
              onChange={onChange}
              accessibilityLabel="Agree to terms"
            />
          )}
        />

        <Button
          label="Submit Mandate"
          onPress={handleSubmit(onSubmit)}
          testID="submit-mandate-button"
          disabled={!confirmationCheckbox}
        />
      </View>
    </>
  );
}