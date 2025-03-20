'use client';
import React from "react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import { createStorageBrowser, createAmplifyAuthAdapter } from "@aws-amplify/ui-react-storage/browser";
import { customElements } from "./customElements"; // customElements.tsx 파일 (JSX 포함)
import "@aws-amplify/ui-react-storage/styles.css";
import config from "../amplify_outputs.json";

// Amplify 기본 config에 누락된 속성을 확장하여 추가합니다.
const extendedConfig: any = {
  ...config,
  // S3 또는 기타 스토리지 관련 위치 정보를 빈 배열로 처리 (필요에 따라 수정 가능)
  listLocations: () => Promise.resolve([]),
  // 위치별 자격 증명을 빈 객체로 처리
  getLocationCredentials: () => Promise.resolve({}),
  // region은 auth 설정의 aws_region을 사용 (존재하지 않으면 'us-east-1'로 기본 설정)
  region: config.auth?.aws_region || "us-east-1",
  // registerAuthListener는 아무 동작도 하지 않는 함수로 처리합니다.
  registerAuthListener: () => () => {},
};

Amplify.configure(config);

function Example() {
  // defaultPrefixes를 authAdapter 옵션으로 지정합니다.
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

  // extendedConfig를 config로 전달하고, 커스터마이징한 UI 요소도 함께 전달합니다.
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
