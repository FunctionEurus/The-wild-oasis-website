"use client";

import { createContext, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

type ReservationContextProps = {
  range: DateRange;
  setRange: (range: DateRange) => void;
  resetRange: () => void;
};

type ReservationProviderProps = {
  children: any;
};

const ReservationContext = createContext<ReservationContextProps | undefined>(
  undefined
);

const initialState: DateRange = {
  from: undefined,
  to: undefined,
};

function ReservationProvider({ children }: ReservationProviderProps) {
  const [range, setRange] = useState<DateRange>(initialState);
  const resetRange = () => {
    setRange(initialState);
  };

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside the provider");
  return context;
}

export { ReservationProvider, useReservation };
