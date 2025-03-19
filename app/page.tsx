'use client';

import React from 'react';
import { Amplify } from 'aws-amplify';
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import { Button, withAuthenticator } from '@aws-amplify/ui-react';
import {
  createStorageBrowser,
  createAmplifyAuthAdapter,
  elementsDefault,
} from '@aws-amplify/ui-react-storage/browser';
import '@aws-amplify/ui-react-storage/styles.css';
import '@aws-amplify/ui-react-storage/storage-browser-styles.css';

import config from '../amplify_outputs.json';

Amplify.configure(config);

function Example() {
  // 디버그 로그: 현재 로그인 유저 정보 출력
  getCurrentUser()
    .then((user) => console.log('Current user:', user))
    .catch((err) => console.log('No user signed in:', err));

  // StorageBrowser 생성 (정식 패키지 기준)
  const { StorageBrowser } = createStorageBrowser({
    elements: elementsDefault,
    config: createAmplifyAuthAdapter({
      options: {
        defaultPrefixes: [
          'media-readwritedelete/',
          'media-readonly/',
          'shared-folder-readwrite/',
          (identityId: string) => `protected-useronlyreadwritedelete/${identityId}/`,
          (identityId: string) => `private-useronlyreadwritedelete/${identityId}/`,
        ],
      },
    }),
    debug: true, // 디버그 로그 출력 활성화
  });

  return (
    <div className="p-4 space-y-4">
      <Button
        size="small"
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </Button>
      <StorageBrowser />
    </div>
  );
}

export default withAuthenticator(Example);
