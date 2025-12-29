import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [
      totalVisas,
      totalFaqs,
      totalPosts,
      totalSubscribers,
      totalMessages,
      todayViews,
      weekViews
    ] = await Promise.all([
      prisma.visaType.count({ where: { isActive: true } }),
      prisma.fAQ.count({ where: { isActive: true } }),
      prisma.blogPost.count({ where: { isPublished: true } }),
      prisma.subscriber.count({ where: { isActive: true } }),
      prisma.chatMessage.count(),
      prisma.pageView.count({
        where: { createdAt: { gte: today } }
      }),
      prisma.pageView.count({
        where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }
      })
    ])

    // Get views by day for last 7 days
    const last7Days = await prisma.pageView.groupBy({
      by: ['createdAt'],
      _count: true,
      where: {
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }
    })

    // Get top pages
    const topPages = await prisma.pageView.groupBy({
      by: ['page'],
      _count: { page: true },
      orderBy: { _count: { page: 'desc' } },
      take: 5
    })

    // Get geography
    const geography = await prisma.pageView.groupBy({
      by: ['country'],
      _count: { country: true },
      where: { country: { not: null } },
      orderBy: { _count: { country: 'desc' } },
      take: 5
    })

    return NextResponse.json({
      stats: {
        totalVisas,
        totalFaqs,
        totalPosts,
        totalSubscribers,
        totalMessages,
        todayViews,
        weekViews
      },
      viewsByDay: last7Days,
      topPages: topPages.map(p => ({ page: p.page, count: p._count.page })),
      geography: geography.map(g => ({ country: g.country, count: g._count.country }))
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
