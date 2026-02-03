import React from 'react';
import {
  RedirectToSignIn,
  SignedIn,
} from '@neondatabase/neon-js/auth/react/ui';
import MainApp from '../MainApp';

export function HomePage() {
  return (
    <>
      <SignedIn>
        <div style={{ position: 'relative' }}>
            <MainApp />
        </div>
      </SignedIn>
      <RedirectToSignIn />
    </>
  );
}
