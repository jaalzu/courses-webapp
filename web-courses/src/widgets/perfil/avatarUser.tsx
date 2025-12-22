// 'use client'

// import { Avatar, AvatarFallback } from "@/shared/ui/index"
// import { Button } from "@/shared/ui/index"
// import { PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
// import { useState } from "react"

// interface AvatarUserProps {
//   name: string
//   email: string
// }

// export  function AvatarUser({ name, email }: AvatarUserProps) {
//   const [isEditing, setIsEditing] = useState(false)
//   const [userName, setUserName] = useState(name)

//   const initials =
//     typeof userName === "string"
//       ? userName
//           .trim()
//           .split(" ")
//           .map(n => n[0])
//           .join("")
//           .toUpperCase()
//           .slice(0, 2) // Solo primeras 2 letras
//       : ""

//   const handleSave = () => {
//     setIsEditing(false)
//     // Aquí podrías hacer un API call para guardar
//   }

//   const handleCancel = () => {
//     setUserName(name) // Restaurar nombre original
//     setIsEditing(false)
//   }

//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        
//         {/* Avatar */}
//         <div className="relative">
//           <Avatar className="h-28 w-28 md:h-32 md:w-32">
//             <AvatarFallback className="text-3xl font-semibold bg-blue-600 text-white">
//               {initials}
//             </AvatarFallback>
//           </Avatar>
//         </div>

//         {/* Información del usuario */}
//         <div className="flex-1 text-center md:text-left space-y-3 w-full">
//           {isEditing ? (
//             // Modo edición
//             <div className="space-y-3">
//               <input
//                 type="text"
//                 value={userName}
//                 onChange={(e) => setUserName(e.target.value)}
//                 className="w-full md:w-auto px-4 py-2.5 border-2 border-blue-500 dark:border-blue-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-lg"
//                 placeholder="Tu nombre"
//                 autoFocus
//               />
              
//               <div className="flex items-center justify-center md:justify-start gap-2">
//                 <Button 
//                   onClick={handleSave} 
//                   size="sm"
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   <CheckIcon className="w-4 h-4 mr-1" />
//                   Guardar
//                 </Button>
//                 <Button 
//                   onClick={handleCancel} 
//                   variant="outline" 
//                   size="sm"
//                 >
//                   <XMarkIcon className="w-4 h-4 mr-1" />
//                   Cancelar
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             // Modo visualización
//             <div className="space-y-2">
//               <div className="flex items-center justify-center md:justify-start gap-3">
//                 <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
//                   {userName}
//                 </h1>
//                 <Button 
//                   onClick={() => setIsEditing(true)} 
//                   variant="ghost" 
//                   size="sm" 
//                   className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
//                 >
//                   <PencilIcon className="w-4 h-4" />
//                 </Button>
//               </div>

//               <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center md:justify-start gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 {email}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }