'use client'

import { useEffect, useState } from 'react'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  category: string | null
  isPublished: boolean
  publishedAt: string | null
  createdAt: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    isPublished: false
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const res = await fetch('/api/blog')
    const data = await res.json()
    setPosts(data)
    setLoading(false)
  }

  const openModal = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post)
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || '',
        category: post.category || '',
        isPublished: post.isPublished
      })
    } else {
      setEditingPost(null)
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        isPublished: false
      })
    }
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const method = editingPost ? 'PUT' : 'POST'
    const body = editingPost
      ? { ...formData, id: editingPost.id }
      : formData

    await fetch('/api/blog', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    setShowModal(false)
    fetchPosts()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить эту статью?')) return

    await fetch(`/api/blog?id=${id}`, { method: 'DELETE' })
    fetchPosts()
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Блог</h1>
        <button
          onClick={() => openModal()}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition"
        >
          + Новая статья
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {post.category && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        {post.category}
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {post.isPublished ? 'Опубликовано' : 'Черновик'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => openModal(post)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Изменить
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}

          {posts.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">
              Нет статей. Напишите первую!
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {editingPost ? 'Редактировать' : 'Новая'} статья
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Краткое описание</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  rows={2}
                  placeholder="Краткое описание для превью"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Содержание</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-sm"
                  rows={10}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Новости, Гайды, Советы..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-emerald-500"
                />
                <label htmlFor="isPublished" className="text-sm text-gray-700">Опубликовать</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
