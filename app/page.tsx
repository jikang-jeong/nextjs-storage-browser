'use client';
import React from "react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";

import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import { createStorageBrowser, createAmplifyAuthAdapter } from "@aws-amplify/ui-react-storage/browser";
import "@aws-amplify/ui-react-storage/styles.css";
import config from "../amplify_outputs.json";

Amplify.configure(config);

function Example() {
  const authAdapter = createAmplifyAuthAdapter({
    options: {
      defaultPrefixes: [
        "media-readwritedelete/",
        "media-readonly/",
        "shared-folder-readwrite/",
        (identityId) => `protected-useronlyreadwritedelete/${identityId}/`,
        (identityId) => `private-useronlyreadwritedelete/${identityId}/`,
      ],
    },
  });

  const { StorageBrowser } = createStorageBrowser();

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
      <StorageBrowser authAdapter={authAdapter} />
    </>
  );
}

export default withAuthenticator(Example);
