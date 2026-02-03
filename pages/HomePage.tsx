import React from 'react';
import {
  RedirectToSignIn,
  SignedIn,
  UserButton,
} from '@neondatabase/neon-js/auth/react/ui';
import MainApp from '../MainApp';

export function HomePage() {
  return (
    <>
      <SignedIn>
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1rem', right: '4rem', zIndex: 1000 }}>
                <UserButton />
            </div>
            <MainApp />
        </div>
      </SignedIn>
      <RedirectToSignIn />
    </>
  );
}
