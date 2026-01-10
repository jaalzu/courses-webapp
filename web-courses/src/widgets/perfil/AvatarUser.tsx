'use client'

import { useEffect, useState } from "react"
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { validateName } from '@/shared/lib/supabase/queries/profiles'
import { Avatar, AvatarFallback, Button } from "@/shared/ui/index"
import { getAvatarColor, getInitials } from "@/shared/lib/utils/avatar"
import { PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"

interface AvatarUserProps {
  name: string
  email: string
}

export function AvatarUser({ name, email }: AvatarUserProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState(name)
  const [nameError, setNameError] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  
  const updateUserProfile = useAuthStore(state => state.updateUserProfile)

  useEffect(() => {
    setUserName(name)
  }, [name])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUserName(value)
    if (nameError || value.length >= 3) {
      const validation = validateName(value)
      setNameError(validation.valid ? "" : validation.error || "")
    }
  }

  const handleSave = async () => {
    const validation = validateName(userName)
    if (!validation.valid) {
      setNameError(validation.error || "Nombre no válido")
      return
    }

    setIsSaving(true)
    setNameError("")

    try {
      await updateUserProfile({ name: userName.trim() })
      setIsEditing(false)
    } catch (error: any) {
      setNameError("Error al conectar con el servidor.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setUserName(name)
    setNameError("")
    setIsEditing(false)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <Avatar className="h-28 w-28 md:h-32 md:w-32">
            <AvatarFallback className={`${getAvatarColor(userName)} text-white text-3xl font-semibold`}>
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 text-center md:text-left space-y-3 w-full">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={userName}
                onChange={handleNameChange}
                disabled={isSaving}
                className={`w-full md:w-auto px-4 py-2.5 border-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold text-lg ${
                  nameError ? 'border-red-500' : 'border-blue-500'
                }`}
                autoFocus
              />
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Button onClick={handleSave} size="sm" disabled={isSaving || !!nameError} className="bg-green-600 text-white">
                  <CheckIcon className="w-4 h-4 mr-1" /> {isSaving ? "Guardando..." : "Guardar"}
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm" disabled={isSaving}>
                  <XMarkIcon className="w-4 h-4 mr-1" /> Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">{name}</h1>
                <Button onClick={() => setIsEditing(true)} variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                  <PencilIcon className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center md:justify-start gap-2">
                {email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}