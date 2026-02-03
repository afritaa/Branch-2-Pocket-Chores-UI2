import React from 'react';
import { AccountView } from '@neondatabase/neon-js/auth/react/ui';
import { useParams } from 'react-router-dom';

export function AccountPage() {
  const { pathname } = useParams();
  return <AccountView pathname={pathname} />;
}
