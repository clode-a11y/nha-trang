import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Header } from '../components/Header'
import { FooterSection } from '../components/FooterSection'
import { ThemeToggle } from '../components/ThemeToggle'

async function getBlogPosts() {
  return prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' }
  })
}

export const metadata = {
  title: 'Блог о Вьетнаме | VietVisa',
  description: 'Полезные статьи о визах, путешествиях и жизни во Вьетнаме'
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  const categoryColors: Record<string, string> = {
    'Визы': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    'E-Visa': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    'Путешествия': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    'Советы': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  }

  const categoryIcons: Record<string, string> = {
    'Визы': '🛂',
    'E-Visa': '📱',
    'Путешествия': '✈️',
    'Советы': '💡',
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 transition-colors">
      <ThemeToggle />

      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-green-200 via-pink-200 to-orange-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      <Header />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-4xl mb-4 block">📚</span>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              Блог о Вьетнаме
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Полезные статьи о визах, путешествиях и жизни во Вьетнаме
            </p>
          </div>

          {/* Posts Grid */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl p-6 shadow-lg border border-white/50 dark:border-gray-700 hover:scale-[1.02] hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">
                    {categoryIcons[post.category || ''] || '📄'}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {post.category && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
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
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
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

          {posts.length === 0 && (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">📝</span>
              <p className="text-gray-500 dark:text-gray-400">
                Статьи скоро появятся
              </p>
            </div>
          )}

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-medium hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Вернуться на главную
            </Link>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
