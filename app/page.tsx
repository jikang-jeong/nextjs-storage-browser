'use client';
import React from "react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import { createStorageBrowser, createAmplifyAuthAdapter } from "@aws-amplify/ui-react-storage/browser";
import { customElements } from "./customElements"; // customElements.tsx 파일 (JSX 포함된 파일)
import "@aws-amplify/ui-react-storage/styles.css";
import config from "../amplify_outputs.json";

Amplify.configure(config);

function Example() {
  // authAdapter 생성 시 defaultPrefixes를 옵션으로 설정합니다.
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

  // createStorageBrowser에는 authAdapter.config를 필수로 전달합니다.
  const { StorageBrowser } = createStorageBrowser({
    config: authAdapter.config,
    elements: customElements as any, // 타입 오류 우회를 위한 강제 캐스팅
  });

  return (
    <>
      <Button marginBlockEnd="xl" size="small" onClick={() => signOut()}>
        Sign Out
      </Button>
      {/* StorageBrowser 컴포넌트에는 authAdapter를 prop으로 전달 */}
      <StorageBrowser authAdapter={authAdapter} />
    </>
  );
}

export default withAuthenticator(Example);
