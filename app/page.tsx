'use client';
import React from "react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";

import { getCurrentUser } from "aws-amplify/auth";
import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import {
  createStorageBrowser,
  createAmplifyAuthAdapter,
  elementsDefault,
} from "@aws-amplify/ui-react-storage/browser";
import "@aws-amplify/ui-react-storage/styles.css";
import "@aws-amplify/ui-react-storage/storage-browser-styles.css";

import config from "../amplify_outputs.json";

Amplify.configure(config);

function Example() {

// App 시작 시 또는 Example 함수 내부에서 테스트:
getCurrentUser()
  .then(user => console.log("Current user:", user))
  .catch(err => console.log("No user signed in:", err));

  const { StorageBrowser } = createStorageBrowser({
    elements: elementsDefault,
    config: createAmplifyAuthAdapter({
      options: {
        defaultPrefixes: [
          "media-readwritedelete/",
          "media-readonly/",
          "shared-folder-readwrite/",
          (identityId: string) => `protected-useronlyreadwritedelete/${identityId}/`,
          (identityId: string) => `private-useronlyreadwritedelete/${identityId}/`,
        ],
      },
    }),
  });

  return (
    <>
      <Button
        marginBlockEnd="xl"
        size="small"
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </Button>
      <StorageBrowser />
    </>
  );
}

export default withAuthenticator(Example);
