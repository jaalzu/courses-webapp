'use client'

interface CourseFormFieldProps {
  label: string
  name: string
  value: string | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  type?: 'input' | 'textarea' | 'select'
  options?: { value: string; label: string }[]
  placeholder?: string
}

export function CourseFormField({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'input', 
  options, 
  placeholder 
}: CourseFormFieldProps) {
  // Aseguramos que value siempre sea string 
  const safeValue = value ?? ''

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>

      {type === 'input' && (
        <input
          name={name}
          value={safeValue}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
        />
      )}

      {type === 'textarea' && (
        <textarea
          name={name}
          value={safeValue}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
        />
      )}

      {type === 'select' && options && (
        <select
          name={name}
          value={safeValue}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}