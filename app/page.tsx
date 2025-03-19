'use client';
import React from "react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import { createStorageBrowser, createAmplifyAuthAdapter } from "@aws-amplify/ui-react-storage/browser";
import { elementsDefault } from "./elementsDefault"; // 파일 이름은 elementsDefault.tsx로 저장하세요.
import "@aws-amplify/ui-react-storage/styles.css";
import config from "../amplify_outputs.json";

Amplify.configure(config);

// 기본 Prefix 설정을 authAdapter 옵션에 넣습니다.
// 타입 에러를 우회하기 위해 as any를 사용합니다.
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
} as any);

// createStorageBrowser는 authAdapter와 기본 UI 요소(elements)를 props로 받습니다.
const { StorageBrowser } = createStorageBrowser({ authAdapter, elements: elementsDefault } as any);

function Example() {
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
