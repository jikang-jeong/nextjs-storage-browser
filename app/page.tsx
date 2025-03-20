'use client';
import React from "react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import { createStorageBrowser, createAmplifyAuthAdapter } from "@aws-amplify/ui-react-storage/browser";
import { customElements } from "./customElements"; // customElements.tsx (JSX 포함)
import "@aws-amplify/ui-react-storage/styles.css";
import config from "../amplify_outputs.json";

// Next.js 클라이언트 전용 페이지일 경우, prerendering 방지를 위해 dynamic 설정을 추가할 수 있습니다.
// export const dynamic = "force-dynamic";

Amplify.configure(config);

function Example() {
  // defaultPrefixes 옵션을 통해 S3의 기본 prefix들을 설정합니다.
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

  // createStorageBrowser에는 config와 커스터마이징한 UI 요소를 전달합니다.
  const { StorageBrowser } = createStorageBrowser({
    config: config,
    elements: customElements as any, // 타입 오류 우회를 위해 as any 사용
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
