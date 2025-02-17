"use client";

import { useState } from "react";
import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";
import Basket from "./components/basket";
import { Menu } from "lucide-react";
import { Button } from "./components/ui/button";

export default function Home() {
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  return (
    <main className="h-screen w-screen flex justify-center items-center background-gradient">
      <div className="space-y-2 lg:space-y-10 w-[90%]">
        <Header />
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChatSection />
          <div className="hidden md:block">
            <Basket />
          </div>
        </div>
        {/* End of main content */}
      </div>
      <Button
        onClick={() => setIsBasketOpen(true)}
        className="md:hidden fixed top-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg"
      >
        <Menu className="h-6 w-6" />
      </Button>
      {isBasketOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-4 shadow-lg">
          <Button
            onClick={() => setIsBasketOpen(false)}
            className="self-end p-2 rounded-full w-10 h-10"
          >
            ✕
          </Button>
          <Basket />
        </div>
      )}
    </main>
  );
}
