'use client'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PencilIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

interface AvatarUserProps {
  name: string
  email: string
}

export default function AvatarUser({ name, email }: AvatarUserProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState(name)

  const handleSave = () => setIsEditing(false)

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
      <Avatar className="h-24 w-24 md:h-28 md:w-28">
        <AvatarFallback className="text-2xl bg-blue-600 text-white">
          {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 text-center md:text-left space-y-3">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <Button onClick={handleSave} size="sm">Guardar</Button>
            <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">Cancelar</Button>
          </div>
        ) : (
          <div className="flex items-center justify-center md:justify-start gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">{userName}</h1>
            <Button onClick={() => setIsEditing(true)} variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800">
              <PencilIcon className="w-4 h-4" />
            </Button>
          </div>
        )}

        <p className="text-gray-600 dark:text-gray-400">{email}</p>
      </div>
    </div>
  )
}
