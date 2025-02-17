"use client"
  // TODO: Implement auth context to fetch userId and send tokens in request
  
import { createContext, useContext, useEffect, useState } from "react";
import { useClientConfig } from "./use-config";
import { Activity } from "../types/activity-types";

interface Basket {
  activities: Activity[];
}

interface BasketContextType {
  basket: Basket;
  addToBasket: (activityId: string) => void;
  removeFromBasket: (activityId: string) => void;
  clearBasket: () => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function useBasket() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
}

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [basket, setBasket] = useState<Basket>({ activities: [] }); 
  const { backend } = useClientConfig();

  const userId = "1"; 

  const fetchBasket = async () => {
    try {
      const response = await fetch(`${backend}/api/basket/activity?user_id=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch basket");

      const data = await response.json();
      setBasket({ activities: data.activities || [] }); // ✅ Set as an object
    } catch (error) {
      console.error("Error fetching basket:", error);
    }
  };

  const addToBasket = async (activityId: string) => {
    try {
      const response = await fetch(`${backend}/api/basket/activity?user_id=${userId}&activity_id=${activityId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to add activity");

      await fetchBasket();
    } catch (error) {
      console.error("Error adding activity to basket:", error);
    }
  };

  const removeFromBasket = async (activityId: string) => {
    try {
      const response = await fetch(`${backend}/api/basket/activity?user_id=${userId}&activity_id=${activityId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to remove activity");

      await fetchBasket();
    } catch (error) {
      console.error("Error removing activity from basket:", error);
    }
  };

  const clearBasket = async () => {
    try {
      const response = await fetch(`${backend}/api/basket/clear?user_id=${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to clear basket");

      await fetchBasket();
    } catch (error) {
      console.error("Error clearing basket:", error);
    }
  };

  useEffect(() => {
    fetchBasket();
  }, [backend, userId]); 

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, clearBasket }}>
      {children}
    </BasketContext.Provider>
  );
}
