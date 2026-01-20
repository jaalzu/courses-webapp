import { NextResponse } from 'next/server';

export function isDemoUser(email: string | undefined) {
  return email === 'admin@demo.com';
}

export const demoBlockResponse = NextResponse.json(
  { error: "Forbidden: Acción no permitida en modo demo" },
  { status: 403 }
);