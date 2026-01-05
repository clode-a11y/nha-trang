'use client'

import { useState } from 'react'

// Demo data
const documents = [
  {
    id: '1',
    name: 'Invoice_VC2024001.pdf',
    type: 'invoice',
    typeName: 'Счёт',
    order: 'VC2024001',
    size: '245 KB',
    uploadedAt: '15 января 2024',
  },
  {
    id: '2',
    name: 'PackingList_VC2024001.pdf',
    type: 'packing_list',
    typeName: 'Упаковочный лист',
    order: 'VC2024001',
    size: '128 KB',
    uploadedAt: '15 января 2024',
  },
  {
    id: '3',
    name: 'CustomsDeclaration_VC2024002.pdf',
    type: 'customs',
    typeName: 'Таможенная декларация',
    order: 'VC2024002',
    size: '512 KB',
    uploadedAt: '12 января 2024',
  },
  {
    id: '4',
    name: 'Invoice_VC2024002.pdf',
    type: 'invoice',
    typeName: 'Счёт',
    order: 'VC2024002',
    size: '198 KB',
    uploadedAt: '10 января 2024',
  },
]

const typeIcons: Record<string, string> = {
  invoice: '📄',
  packing_list: '📋',
  customs: '📑',
  other: '📎',
}

const filters = [
  { id: 'all', name: 'Все' },
  { id: 'invoice', name: 'Счета' },
  { id: 'packing_list', name: 'Упаковочные листы' },
  { id: 'customs', name: 'Таможенные' },
]

export default function DocumentsPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredDocs = documents.filter((doc) => {
    if (activeFilter === 'all') return true
    return doc.type === activeFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Мои документы</h2>
        <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
          + Загрузить документ
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>

      {/* Documents list */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                  {typeIcons[doc.type] || typeIcons.other}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{doc.name}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{doc.typeName}</span>
                    <span>•</span>
                    <span>Заказ {doc.order}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{doc.uploadedAt}</span>
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  ⬇️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Документов не найдено
          </h3>
          <p className="text-gray-600 mb-6">
            У вас пока нет документов в этой категории
          </p>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 rounded-2xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">
          Какие документы можно загрузить?
        </h3>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>• Счета и инвойсы</li>
          <li>• Упаковочные листы</li>
          <li>• Таможенные декларации</li>
          <li>• Сертификаты происхождения</li>
          <li>• Другие документы по грузу</li>
        </ul>
      </div>
    </div>
  )
}
