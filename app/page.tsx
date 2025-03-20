'use client';
import React from "react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import { createStorageBrowser, createAmplifyAuthAdapter } from "@aws-amplify/ui-react-storage/browser";
import { customElements } from "./customElements"; // customElements.tsx (JSX 포함 파일)
import "@aws-amplify/ui-react-storage/styles.css";
import config from "../amplify_outputs.json";

Amplify.configure(config);

function Example() {
  // createAmplifyAuthAdapter()에 defaultPrefixes 옵션을 전달하여 S3 prefix를 설정합니다.
  const authAdapter = createAmplifyAuthAdapter({
    options: {
      defaultPrefixes: [
        "media-readwritedelete/",
        "media-readonly/",
        "shared-folder-readwrite/",
        (identityId: string) => `protected-useronlyreadwritedelete/${identityId}/`,
        (identityId: string) => `private-useronlyreadwritedelete/${identityId}/`,
      ],
    },
  });

  // createStorageBrowser는 config와 elements 옵션을 받습니다.
  // authAdapter는 내부적으로 사용되므로, StorageBrowser 컴포넌트의 prop으로 전달하지 않습니다.
  const { StorageBrowser } = createStorageBrowser({
    config: config,
    elements: customElements as any, // 타입 오류 우회를 위해 강제 캐스팅
  });

  return (
    <>
      <Button marginBlockEnd="xl" size="small" onClick={() => signOut()}>
        Sign Out
      </Button>
      <StorageBrowser />
    </>
  );
}

export default withAuthenticator(Example);
