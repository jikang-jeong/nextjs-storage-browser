'use client';
import React from "react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import { createStorageBrowser, createAmplifyAuthAdapter } from "@aws-amplify/ui-react-storage/browser";
import { customElements } from "./customElements"; // customElements.tsx
import "@aws-amplify/ui-react-storage/styles.css";
import config from "../amplify_outputs.json";

Amplify.configure(config);

// 확장된 config 객체 (타입 우회를 위해 as any)
const storageBrowserConfig = {
  ...config,
  listLocations: () => Promise.resolve([]),
  getLocationCredentials: () => Promise.resolve({}),
  region: config.auth?.aws_region || "us-east-1",
  registerAuthListener: () => { return () => {}; },
} as any;

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

  // createStorageBrowser에 확장된 config 전달
  const { StorageBrowser } = createStorageBrowser({
    config: storageBrowserConfig,
    elements: customElements as any,
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
