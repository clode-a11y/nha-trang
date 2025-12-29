import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@vietvisa.com' }
    })

    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin already exists' })
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    const admin = await prisma.user.create({
      data: {
        email: 'admin@vietvisa.com',
        password: hashedPassword,
        name: 'Admin',
        role: 'admin'
      }
    })

    // Create sample visa types
    await prisma.visaType.createMany({
      data: [
        {
          title: 'Безвизовый въезд',
          description: 'Граждане РФ могут въезжать во Вьетнам без визы на срок до 45 дней.',
          duration: 'до 45 дней',
          price: 'Бесплатно',
          documents: 'Загранпаспорт со сроком действия минимум 6 месяцев',
          order: 1
        },
        {
          title: 'E-Visa (электронная виза)',
          description: 'Электронная виза оформляется онлайн на официальном сайте.',
          duration: 'до 90 дней',
          price: '25 USD',
          documents: 'Загранпаспорт, фото 4x6, подтверждение проживания',
          order: 2
        },
        {
          title: 'Виза по прилёту',
          description: 'Оформляется в аэропорту при наличии пригласительного письма.',
          duration: 'до 30 дней',
          price: '25-50 USD',
          documents: 'Загранпаспорт, пригласительное письмо, фото, наличные',
          order: 3
        }
      ]
    })

    // Create sample FAQs
    await prisma.fAQ.createMany({
      data: [
        {
          question: 'Нужна ли виза гражданам России для въезда во Вьетнам?',
          answer: 'Граждане РФ могут въезжать во Вьетнам без визы на срок до 45 дней. Для более длительного пребывания потребуется виза.',
          category: 'Общие вопросы',
          order: 1
        },
        {
          question: 'Как оформить e-visa во Вьетнам?',
          answer: 'E-visa оформляется онлайн на официальном сайте immigration.gov.vn. Процесс занимает 3-5 рабочих дней.',
          category: 'E-Visa',
          order: 2
        },
        {
          question: 'Какие документы нужны для визы?',
          answer: 'Загранпаспорт со сроком действия минимум 6 месяцев, фото 4x6 см, заполненная анкета.',
          category: 'Документы',
          order: 3
        }
      ]
    })

    return NextResponse.json({
      message: 'Database seeded successfully',
      admin: { email: admin.email, name: admin.name }
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
  }
}
