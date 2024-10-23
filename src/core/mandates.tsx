import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';

type Mandate = {
  fromAccount: string;
  toAccount: string;
  paymentType: string;
  fromDate: Date;
  toDate?: Date;
  amountDebited: number;
  savingsId : number;
  resourceId : number;  
  transferDescription: string; 
};

interface MandateStore {
  mandates: Mandate[];
  addMandate: (mandate: Mandate) => void;
  loadMandates: () => void;
}

const storageKey = 'mandates';

const storage = new MMKV();

// Create Zustand store
export const useMandateStore = create<MandateStore>((set) => ({
  mandates: [],
  addMandate: (mandate: Mandate) => {
    // Retrieve current mandates
    const currentMandates = storage.getString(storageKey);
    const parsedMandates: Mandate[] = currentMandates ? JSON.parse(currentMandates) : [];
    
    // Add the new mandate
    const updatedMandates = [...parsedMandates, mandate];
    
    // Persist mandates to MMKV
    storage.set(storageKey, JSON.stringify(updatedMandates));
    
    // Update state
    set({ mandates: updatedMandates });
  },
  loadMandates: () => {
    const savedMandates = storage.getString(storageKey);
    if (savedMandates) {
      set({ mandates: JSON.parse(savedMandates) });
    }
  },
}));

