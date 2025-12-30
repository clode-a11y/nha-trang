'use client'

import { useState } from 'react'
import { useTranslation } from './TranslationProvider'

export function DocumentChecklist() {
  const { t } = useTranslation()
  const [checked, setChecked] = useState<number[]>([])

  const documents = [
    { id: 1, name: t('checklist.passport'), description: t('checklist.passportDesc'), required: true },
    { id: 2, name: t('checklist.photo'), description: t('checklist.photoDesc'), required: true },
    { id: 3, name: t('checklist.ticket'), description: t('checklist.ticketDesc'), required: true },
    { id: 4, name: t('checklist.hotel'), description: t('checklist.hotelDesc'), required: false },
    { id: 5, name: t('checklist.insurance'), description: t('checklist.insuranceDesc'), required: false },
    { id: 6, name: t('checklist.finances'), description: t('checklist.financesDesc'), required: false }
  ]

  const toggle = (id: number) => {
    setChecked(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    )
  }

  const requiredDocs = documents.filter(d => d.required)
  const optionalDocs = documents.filter(d => !d.required)
  const requiredChecked = requiredDocs.filter(d => checked.includes(d.id)).length
  const progress = Math.round((requiredChecked / requiredDocs.length) * 100)

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        <span>📋</span> {t('checklist.title')}
      </h3>
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">{t('checklist.subtitle')}</p>

      {/* Progress bar */}
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">{t('checklist.requiredDocs')}</span>
          <span className="font-bold text-green-600 dark:text-green-400">{requiredChecked}/{requiredDocs.length}</span>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Required documents */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        <h4 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <span className="text-red-500">*</span> {t('checklist.required')}
        </h4>
        {requiredDocs.map(doc => (
          <label
            key={doc.id}
            className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
              checked.includes(doc.id)
                ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-700'
                : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600'
            }`}
          >
            <input
              type="checkbox"
              checked={checked.includes(doc.id)}
              onChange={() => toggle(doc.id)}
              className="w-5 h-5 mt-0.5 accent-green-500"
            />
            <div>
              <div className={`font-medium ${checked.includes(doc.id) ? 'text-green-700 dark:text-green-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                {doc.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{doc.description}</div>
            </div>
          </label>
        ))}
      </div>

      {/* Optional documents */}
      <div className="space-y-2 sm:space-y-3">
        <h4 className="font-semibold text-gray-700 dark:text-gray-300">{t('checklist.recommended')}</h4>
        {optionalDocs.map(doc => (
          <label
            key={doc.id}
            className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
              checked.includes(doc.id)
                ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-700'
                : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600'
            }`}
          >
            <input
              type="checkbox"
              checked={checked.includes(doc.id)}
              onChange={() => toggle(doc.id)}
              className="w-5 h-5 mt-0.5 accent-blue-500"
            />
            <div>
              <div className={`font-medium ${checked.includes(doc.id) ? 'text-blue-700 dark:text-blue-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                {doc.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{doc.description}</div>
            </div>
          </label>
        ))}
      </div>

      {progress === 100 && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-100 dark:bg-green-900/50 rounded-xl text-center">
          <span className="text-2xl">🎉</span>
          <p className="font-bold text-green-700 dark:text-green-400 mt-2">{t('checklist.allReady')}</p>
        </div>
      )}
    </div>
  )
}
