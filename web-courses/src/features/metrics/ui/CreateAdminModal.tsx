// // features/metrics/ui/CreateAdminModal.tsx
// 'use client'

// import { useState } from 'react'
// import { useUserActions } from '@/entities/user/model/useUserActions'

// interface CreateAdminModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onSuccess: () => void
// }

// export function CreateAdminModal({ isOpen, onClose, onSuccess }: CreateAdminModalProps) {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [name, setName] = useState('')
//   const { createAdmin, isLoading, error } = useUserActions()

//   if (!isOpen) return null

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     const result = await createAdmin(email, password, name)
    
//     if (result.success) {
//       // Limpiar form y cerrar
//       setEmail('')
//       setPassword('')
//       setName('')
//       onSuccess()
//       onClose()
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4 border dark:border-gray-800">
//         <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
//           Crear Nuevo Administrador
//         </h3>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Nombre
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Contraseña
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
//               required
//               minLength={6}
//             />
//           </div>

//           {error && (
//             <div className="text-red-600 dark:text-red-400 text-sm">
//               {error}
//             </div>
//           )}

//           <div className="flex gap-3 justify-end pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
//               disabled={isLoading}
//             >
//               Cancelar
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors disabled:opacity-50"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Creando...' : 'Crear Admin'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }