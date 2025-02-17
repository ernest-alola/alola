"use client";

import { Message } from "@llamaindex/chat-ui";
import { MapPin, PlusCircle, ShoppingCart } from "lucide-react";
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../accordion";
import { Card, CardContent, CardHeader, CardTitle } from "../../card";
import { cn } from "../../lib/utils";
import { Markdown } from "./markdown";
import { useBasket } from "../hooks/use-basket";
import { Activity } from "../types/activity-types";

interface ActivityCardProps {
    message: Message;
    className?: string;
}

export function ActivityCard({ message, className }: ActivityCardProps) {
  const { addToBasket, removeFromBasket } = useBasket();

  // Extract activities from the assistant's message
  const activities: Activity[] = useMemo(() => message.annotations?.[2]?.data?.toolOutput?.output?.activities || [], [message.annotations?.[2]?.data?.toolOutput?.output?.activities]);

  if (!activities.length) {
    return null;
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="space-y-4">
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Activity Suggestions
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          {activities.map((activity) => (
            <AccordionItem
              key={activity.uuid}
              value={activity.uuid}
              className="border rounded-lg [&[data-state=open]>div]:rounded-b-none"
            >
              <AccordionTrigger className="hover:bg-accent hover:no-underline py-3 px-3 gap-2">
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-shrink-0">
                    <MapPin className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="font-medium text-left flex-1">
                    {activity.title}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="border-t px-3 py-3 space-y-3">
                {activity.photoUrls[0] && (
                  <img
                    src={activity.photoUrls[0]}
                    alt={activity.title}
                    className="w-full rounded-lg"
                  />
                )}
                <Markdown content={activity.description} />

                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg text-blue-600">{activity.currency.symbol}{activity.basePrice}</span>
                  <button
                    className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600"
                    onClick={() => addToBasket(activity.uuid)}
                  >
                    <PlusCircle className="h-5 w-5" />
                    Add to Basket
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
