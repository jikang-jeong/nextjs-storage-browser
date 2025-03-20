'use client';
import React from "react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import { createStorageBrowser, createAmplifyAuthAdapter } from "@aws-amplify/ui-react-storage/browser";
import { customElements } from "./customElements"; // customElements.tsx 파일 (JSX 포함)
import "@aws-amplify/ui-react-storage/styles.css";
import config from "../amplify_outputs.json";

// Extend the imported config with the properties required by StorageBrowser
const storageBrowserConfig = {
  ...config,
  // 기본적으로 빈 배열이나 빈 객체를 반환하는 더미 함수들을 제공합니다.
  listLocations: () => Promise.resolve([]),
  getLocationCredentials: () => Promise.resolve({}),
  // region은 보통 auth 설정의 aws_region 값을 사용합니다.
  region: config.auth?.aws_region || "us-east-1",
  // registerAuthListener의 경우, 간단히 아무 동작도 하지 않는 함수를 제공합니다.
  registerAuthListener: () => { return () => {}; },
};

Amplify.configure(config);

function Example() {
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

  const { StorageBrowser } = createStorageBrowser({
    config: storageBrowserConfig,
    elements: customElements as any, // 타입 오류 우회를 위해 강제 캐스팅
  });

  return (
    <>
      <Button marginBlockEnd="xl" size="small" onClick={() => signOut()}>
        Sign Out
      </Button>
      <StorageBrowser authAdapter={authAdapter} />
    </>
  );
}

export default withAuthenticator(Example);
