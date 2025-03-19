'use client';
import React from "react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";

import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import { createStorageBrowser, createAmplifyAuthAdapter } from "@aws-amplify/ui-react-storage/browser";
import { elementsDefault } from "./elementsDefault"; // elementsDefault.tsx 파일 (JSX 포함 시 .tsx 권장)
import "@aws-amplify/ui-react-storage/styles.css";
import config from "../amplify_outputs.json";

Amplify.configure(config);

function Example() {
  const authAdapter = createAmplifyAuthAdapter();
  // authAdapter를 createStorageBrowser의 인자로 넘기지 않고, 대신 나머지 옵션만 전달합니다.
  const { StorageBrowser } = createStorageBrowser({
    elements: elementsDefault,
    listPrefixes: [
      "media-readwritedelete/",
      "media-readonly/",
      "shared-folder-readwrite/",
      (identityId: string) => `protected-useronlyreadwritedelete/${identityId}/`,
      (identityId: string) => `private-useronlyreadwritedelete/${identityId}/`,
    ],
  });

  return (
    <>
      <Button marginBlockEnd="xl" size="small" onClick={() => signOut()}>
        Sign Out
      </Button>
      {/* authAdapter를 StorageBrowser 컴포넌트의 prop으로 전달합니다 */}
      <StorageBrowser authAdapter={authAdapter} />
    </>
  );
}

export default withAuthenticator(Example);
