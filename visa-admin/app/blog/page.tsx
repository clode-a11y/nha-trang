import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Header } from '../components/Header'
import { FooterSection } from '../components/FooterSection'
import { ThemeToggle } from '../components/ThemeToggle'
import { BlogPostsList } from './BlogPostsList'

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

  return (
    <div className="min-h-screen dark:bg-gray-900 transition-colors">
      <ThemeToggle />

      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-green-200 via-pink-200 to-orange-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      <Header />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-4xl mb-4 block">📚</span>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
              Блог о Вьетнаме
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Полезные статьи о визах, путешествиях и жизни во Вьетнаме
            </p>
          </div>

          {/* Posts with Filter */}
          <BlogPostsList posts={posts} />

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-green-600 dark:text-green-400 font-medium hover:underline active:scale-95 transition"
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
