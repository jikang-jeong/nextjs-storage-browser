'use client';
import React from "react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import { createStorageBrowser, createAmplifyAuthAdapter } from "@aws-amplify/ui-react-storage/browser";
import { elementsDefault } from "./elementsDefault"; // elementsDefault.ts 파일 경로에 맞게 수정하세요.
import "@aws-amplify/ui-react-storage/styles.css";
import config from "../amplify_outputs.json";

Amplify.configure(config);

function Example() {
  const authAdapter = createAmplifyAuthAdapter();
  const { StorageBrowser } = createStorageBrowser({
    authAdapter,
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
      <Button
        marginBlockEnd="xl"
        size="small"
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
      <StorageBrowser />
    </>
  );
}

export default withAuthenticator(Example);
