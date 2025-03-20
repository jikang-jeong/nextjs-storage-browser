'use client';
import React from "react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import { createStorageBrowser, createAmplifyAuthAdapter } from "@aws-amplify/ui-react-storage/browser";
import { customElements } from "./customElements"; // customElements.tsx (JSX 포함된 파일)
import "@aws-amplify/ui-react-storage/styles.css";
import config from "../amplify_outputs.json";

Amplify.configure(config);

function Example() {
  // defaultPrefixes를 createAmplifyAuthAdapter 옵션으로 지정합니다.
  const authAdapter = createAmplifyAuthAdapter({
    options: {
      defaultPrefixes: [
        "media-readwritedelete/",
        "media-readonly/",
        "shared-folder-readwrite/",
        (identityId: string) => `protected-useronlyreadwritedelete/${identityId}/`,
        (identityId: string) => `private-useronlyreadwritedelete/${identityId}/`,
      ]
    }
  });

  // createStorageBrowser는 추가 옵션 없이 호출합니다.
  const { StorageBrowser } = createStorageBrowser({});

  return (
    <>
      <Button marginBlockEnd="xl" size="small" onClick={() => signOut()}>
        Sign Out
      </Button>
      {/* authAdapter와 customElements를 StorageBrowser의 prop으로 전달 */}
      <StorageBrowser authAdapter={authAdapter} elements={customElements as any} />
    </>
  );
}

export default withAuthenticator(Example);
