import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '../../components/Header'
import { FooterSection } from '../../components/FooterSection'
import { ThemeToggle } from '../../components/ThemeToggle'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug }
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return { title: 'Статья не найдена' }
  }

  return {
    title: `${post.title} | VietVisa`,
    description: post.excerpt || post.title
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post || !post.isPublished) {
    notFound()
  }

  const categoryColors: Record<string, string> = {
    'Визы': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    'E-Visa': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    'Путешествия': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    'Советы': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  }

  // Simple markdown to HTML conversion
  const formatContent = (content: string) => {
    return content
      // Headers
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">$1</h2>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-green-600 dark:text-green-400 underline hover:no-underline" target="_blank" rel="noopener">$1</a>')
      // Lists
      .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4 list-decimal">$2</li>')
      // Checkmarks
      .replace(/- ✅/g, '<li class="ml-4 flex items-center gap-2"><span class="text-green-500">✅</span>')
      // Tables (simple)
      .replace(/\| (.*) \|/g, (match) => {
        const cells = match.split('|').filter(c => c.trim())
        if (cells.some(c => c.includes('---'))) return ''
        return `<tr class="border-b dark:border-gray-700">${cells.map(c => `<td class="px-4 py-2">${c.trim()}</td>`).join('')}</tr>`
      })
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 dark:text-gray-300">')
      // Line breaks
      .replace(/\n/g, '<br/>')
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 transition-colors">
      <ThemeToggle />

      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-green-200 via-pink-200 to-orange-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      <Header />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-3 py-2 -ml-3 text-green-600 dark:text-green-400 font-medium hover:underline active:scale-95 transition mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Все статьи
          </Link>

          {/* Article */}
          <article className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50 dark:border-gray-700">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-4">
              {post.category && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
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

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b dark:border-gray-700">
                {post.excerpt}
              </p>
            )}

            {/* Content */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: `<p class="mb-4 text-gray-700 dark:text-gray-300">${formatContent(post.content)}</p>`
              }}
            />
          </article>

          {/* CTA */}
          <div className="mt-8 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-6 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Нужна помощь с визой?</h3>
            <p className="opacity-90 mb-4">Мы поможем оформить визу во Вьетнам быстро и без проблем</p>
            <Link
              href="/#contacts"
              className="inline-block bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition"
            >
              Оставить заявку
            </Link>
          </div>

          {/* Share */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-3">Поделиться статьёй:</p>
            <div className="flex justify-center gap-3">
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(`https://visa-admin-henna.vercel.app/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition"
              >
                📱
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + `https://visa-admin-henna.vercel.app/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition"
              >
                💬
              </a>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
