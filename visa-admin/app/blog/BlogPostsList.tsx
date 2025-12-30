'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  category: string | null
  publishedAt: Date | null
}

interface Props {
  posts: Post[]
}

const categoryColors: Record<string, string> = {
  'Визы': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800',
  'E-Visa': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  'Путешествия': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  'Советы': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 border-orange-200 dark:border-orange-800',
  'Безопасность': 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-800',
}

const categoryIcons: Record<string, string> = {
  'Визы': '🛂',
  'E-Visa': '📱',
  'Путешествия': '✈️',
  'Советы': '💡',
  'Безопасность': '🛡️',
}

export function BlogPostsList({ posts }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Get unique categories with counts
  const categories = posts.reduce((acc, post) => {
    const cat = post.category || 'Другое'
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const filteredPosts = posts.filter(post => {
    const matchesCategory = !activeCategory || post.category === activeCategory
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const clearFilters = () => {
    setActiveCategory(null)
    setSearchQuery('')
  }

  return (
    <>
      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск статей..."
          className="w-full px-5 py-4 pl-12 text-base bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl border border-white/50 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 active:scale-90 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide sm:flex-wrap sm:justify-center sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0">
        <button
          onClick={() => setActiveCategory(null)}
          className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 border whitespace-nowrap ${
            activeCategory === null
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 border-transparent'
              : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-400'
          }`}
        >
          Все ({posts.length})
        </button>
        {Object.entries(categories)
          .sort((a, b) => b[1] - a[1])
          .map(([category, count]) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 border flex items-center gap-1.5 whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 border-transparent'
                  : `${categoryColors[category]?.split(' ').slice(0, 2).join(' ') || 'bg-gray-100 text-gray-700'} border-transparent hover:border-gray-400 dark:hover:border-gray-500`
              }`}
            >
              <span>{categoryIcons[category] || '📄'}</span>
              {category} ({count})
            </button>
          ))}
      </div>

      {/* Posts Grid */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl p-5 md:p-6 shadow-lg border border-white/50 dark:border-gray-700 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl transition-all"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl md:text-4xl flex-shrink-0">
                {categoryIcons[post.category || ''] || '📄'}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {post.category && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]?.split(' ').slice(0, 4).join(' ') || 'bg-gray-100 text-gray-700'}`}>
                      {post.category}
                    </span>
                  )}
                  <span className="text-sm text-gray-400">
                    {post.publishedAt?.toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 mt-3 text-green-600 dark:text-green-400 font-medium">
                  Читать далее
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">{searchQuery ? '🔍' : '📝'}</span>
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery
              ? `Ничего не найдено по запросу "${searchQuery}"`
              : activeCategory
                ? `Нет статей в категории "${activeCategory}"`
                : 'Статьи скоро появятся'}
          </p>
          {(activeCategory || searchQuery) && (
            <button
              onClick={clearFilters}
              className="mt-4 text-green-600 dark:text-green-400 font-medium hover:underline"
            >
              Сбросить фильтры
            </button>
          )}
        </div>
      )}
    </>
  )
}
