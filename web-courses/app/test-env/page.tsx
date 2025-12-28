// app/test-env/page.tsx
export default function TestEnv() {
  return (
    <div>
      <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || 'NO DEFINIDA'}</p>
      <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'EXISTE' : 'NO EXISTE'}</p>
    </div>
  )
}