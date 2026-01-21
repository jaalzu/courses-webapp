'use client'

interface CourseFormFieldProps {
  label: string
  name: string
  value: string | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  type?: 'input' | 'textarea' | 'select'
  options?: { value: string; label: string }[]
  placeholder?: string
  maxLength?: number // 
}

export function CourseFormField({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'input', 
  options, 
  placeholder,
  maxLength
}: CourseFormFieldProps) {
  const safeValue = value ?? ''

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        
        {maxLength && type !== 'select' && (
          <span className={`text-[10px] ${safeValue.length >= maxLength ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
            {safeValue.length} / {maxLength}
          </span>
        )}
      </div>

      {type === 'input' && (
        <input
          name={name}
          value={safeValue}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength} // Bloquea el teclado al llegar al límite
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 outline-none transition-colors ${
            maxLength && safeValue.length >= maxLength 
              ? 'border-orange-500' 
              : 'border-gray-300 dark:border-gray-600'
          }`}
        />
      )}

      {type === 'textarea' && (
        <textarea
          name={name}
          value={safeValue}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          maxLength={maxLength}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 outline-none transition-colors ${
            maxLength && safeValue.length >= maxLength 
              ? 'border-orange-500' 
              : 'border-gray-300 dark:border-gray-600'
          }`}
        />
      )}

      {type === 'select' && options && (
        <select
          name={name}
          value={safeValue}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 outline-none"
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