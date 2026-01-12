// src/features/auth/components/icons.tsx
import { UserIcon as HeroUserIcon, LockClosedIcon as HeroLockIcon, EyeIcon as HeroEyeIcon, EnvelopeIcon as HeroEnvelopeIcon } from "@heroicons/react/24/outline"

// Wrappers de iconos
export const UserIcon = (props: React.ComponentProps<'svg'>) => <HeroUserIcon {...props} />
export const LockIcon = (props: React.ComponentProps<'svg'>) => <HeroLockIcon {...props} />
export const EyeIcon = (props: React.ComponentProps<'svg'>) => <HeroEyeIcon {...props} />
export const EnvelopeIcon = (props: React.ComponentProps<'svg'>) => <HeroEnvelopeIcon {...props} />
