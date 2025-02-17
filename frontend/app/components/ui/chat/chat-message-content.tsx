// TODO: content position is poorly implemented. find a way to selectively render content based on chosen tool

import {
  ChatMessage,
  ContentPosition,
  getSourceAnnotationData,
  useChatMessage,
  useChatUI,
} from "@llamaindex/chat-ui";
import { Markdown } from "./custom/markdown";
import { ToolAnnotations } from "./tools/chat-tools";
import { ActivityCard } from "./custom/activity-card";

export function ChatMessageContent() {
  const { isLoading, append } = useChatUI();
  const { message } = useChatMessage();
  
  // Extract tool name from message annotations
  // TODO: correct this implementation. currently data is fetched from tool call and not response
  const toolCalled = message.annotations?.[2]?.data?.toolCall?.name?.includes("recommend_activities");

  const customContent = toolCalled?
      [
        {
          position: ContentPosition.MARKDOWN,
          component: <ActivityCard message={message} />,
        },
      ]
    :
      [
        {
          position: ContentPosition.MARKDOWN,
          component: (
            <Markdown
              content={message.content}
              sources={getSourceAnnotationData(message.annotations)?.[0]}
            />
          ),
        },
        {
          position: ContentPosition.AFTER_EVENTS,
          component: <ToolAnnotations message={message} />,
        },
      ];

  return (
    <ChatMessage.Content
      content={customContent}
      isLoading={isLoading}
      append={append}
    />
  );
}
