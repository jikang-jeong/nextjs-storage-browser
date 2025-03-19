'use client';
import React from "react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import { Button, withAuthenticator } from "@aws-amplify/ui-react";
// 구 버전에서는 elementsDefault가 export됩니다.
import { createStorageBrowser, createAmplifyAuthAdapter, elementsDefault } from "@aws-amplify/ui-react-storage/browser";
import "@aws-amplify/ui-react-storage/styles.css";
import config from "../amplify_outputs.json";

Amplify.configure(config);

function Example() {
  const authAdapter = createAmplifyAuthAdapter();
  // elements 옵션에 elementsDefault를 전달하면, 구 버전에서는 파일 리스트 아이템에 삭제 체크박스 UI 등이 표시됩니다.
  const { StorageBrowser } = createStorageBrowser({
    authAdapter,
    elements: elementsDefault,
    listPrefixes: [
      "media-readwritedelete/",
      "media-readonly/",
      "shared-folder-readwrite/",
      (identityId: string) => `protected-useronlyreadwritedelete/${identityId}/`,
      (identityId: string) => `private-useronlyreadwritedelete/${identityId}/`
    ]
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
