"use client";

import { ChatInput, useChatUI, useFile } from "@llamaindex/chat-ui";
import { DocumentInfo, ImagePreview } from "@llamaindex/chat-ui/widgets";
import { LlamaCloudSelector } from "./custom/llama-cloud-selector";
import { useClientConfig } from "./hooks/use-config";
import Send from "../../../../public/icons/send.svg"
import Image from "next/image";

export default function CustomChatInput() {
  const { requestData, isLoading, input } = useChatUI();
  const { backend } = useClientConfig();
  const {
    imageUrl,
    setImageUrl,
    uploadFile,
    files,
    removeDoc,
    reset,
    getAnnotations,
  } = useFile({ uploadAPI: `${backend}/api/llm/chat/upload` });

  /**
   * Handles file uploads. Overwrite to hook into the file upload behavior.
   * @param file The file to upload
   */
  const handleUploadFile = async (file: File) => {
    // There's already an image uploaded, only allow one image at a time
    if (imageUrl) {
      alert("You can only upload one image at a time.");
      return;
    }

    try {
      // Upload the file and send with it the current request data
      await uploadFile(file, requestData);
    } catch (error: any) {
      // Show error message if upload fails
      alert(error.message);
    }
  };

  // Get references to the upload files in message annotations format, see https://github.com/run-llama/chat-ui/blob/main/packages/chat-ui/src/hook/use-file.tsx#L56
  const annotations = getAnnotations();

  return (
    <ChatInput
      className="shadow-xl rounded-xl"
      resetUploadedFiles={reset}
      annotations={annotations}
    >
      <div>
        {/* Image preview section */}
        {imageUrl && (
          <ImagePreview url={imageUrl} onRemove={() => setImageUrl(null)} />
        )}
        {/* Document previews section */}
        {files.length > 0 && (
          <div className="flex gap-4 w-full overflow-auto py-2">
            {files.map((file) => (
              <DocumentInfo
                key={file.id}
                document={{ url: file.url, sources: [] }}
                className="mb-2 mt-2"
                onRemove={() => removeDoc(file)}
              />
            ))}
          </div>
        )}
      </div>
      <ChatInput.Form>
        <ChatInput.Field placeholder="Ask me anything" />
        {/* <ChatInput.Upload onUpload={handleUploadFile} />
        <LlamaCloudSelector /> */}
        <ChatInput.Submit
          className="bg-[#ea1786] rounded-full px-2 mx-2"
          disabled={
            isLoading || (!input.trim() && files.length === 0 && !imageUrl)
          }
        >
          <Image 
            src="/icons/send.svg"
            alt="send"
            width={32}
            height={32}
          />
        </ChatInput.Submit>
      </ChatInput.Form>
    </ChatInput>
  );
}
