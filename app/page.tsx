'use client';
import React from "react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import { createStorageBrowser, createAmplifyAuthAdapter } from "@aws-amplify/ui-react-storage/browser";
import { elementsDefault } from "./elementsDefault"; // elementsDefault.tsx (JSX가 포함되어 있으므로 .tsx 사용 권장)
import "@aws-amplify/ui-react-storage/styles.css";
import config from "../amplify_outputs.json";

Amplify.configure(config);

function Example() {
  // Auth adapter는 별도로 생성합니다.
  const authAdapter = createAmplifyAuthAdapter();

  // createStorageBrowser는 listPrefixes 옵션만 받습니다.
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
      {/* authAdapter와 elements를 StorageBrowser 컴포넌트의 prop으로 전달합니다 */}
      <StorageBrowser authAdapter={authAdapter} elements={elementsDefault} />
    </>
  );
}

export default withAuthenticator(Example);
