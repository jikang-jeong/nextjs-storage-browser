'use client';
import React from "react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import { createStorageBrowser, createAmplifyAuthAdapter } from "@aws-amplify/ui-react-storage/browser";
import { customElements } from "./customElements"; // customElements.tsx (JSX 포함된 파일)
import "@aws-amplify/ui-react-storage/styles.css";
import config from "../amplify_outputs.json";

// config 객체에 누락된 속성들을 확장하여 추가합니다.
// 실제 데이터 호출 로직이 없다면, 아래와 같이 더미 값을 사용합니다.
const extendedConfig = {
  ...config,
  listLocations: () => Promise.resolve([]),
  getLocationCredentials: () => Promise.resolve({}),
  region: config.auth?.aws_region || "us-west-2",
  registerAuthListener: () => () => {},
} as any;

Amplify.configure(config);

function Example() {
  // authAdapter 생성 시 defaultPrefixes 옵션을 지정합니다.
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

  // extendedConfig를 사용하여 createStorageBrowser를 호출합니다.
  const { StorageBrowser } = createStorageBrowser({
    config: extendedConfig,
    elements: customElements as any,
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
