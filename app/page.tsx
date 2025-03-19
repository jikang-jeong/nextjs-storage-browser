'use client';
export const dynamic = "force-dynamic";  // 정적 프리렌더링 비활성화

import React from "react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import { createStorageBrowser, createAmplifyAuthAdapter } from "@aws-amplify/ui-react-storage/browser";
import { elementsDefault } from "./elementsDefault"; // 파일 이름: elementsDefault.tsx
import "@aws-amplify/ui-react-storage/styles.css";
import config from "../amplify_outputs.json";

Amplify.configure(config);

function Example() {
  const authAdapter = createAmplifyAuthAdapter();
  const { StorageBrowser } = createStorageBrowser({
    listPrefixes: [
      "media-readwritedelete/",
      "media-readonly/",
      "shared-folder-readwrite/",
      (identityId: string) => `protected-useronlyreadwritedelete/${identityId}/`,
      (identityId: string) => `private-useronlyreadwritedelete/${identityId}/`,
    ]
  });

  return (
    <>
      <Button marginBlockEnd="xl" size="small" onClick={() => signOut()}>
        Sign Out
      </Button>
      <StorageBrowser authAdapter={authAdapter} elements={elementsDefault} />
    </>
  );
}

export default withAuthenticator(Example);
