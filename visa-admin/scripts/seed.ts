import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@vietvisa.com' },
    update: {},
    create: {
      email: 'admin@vietvisa.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin'
    }
  })
  console.log('Admin created:', admin.email)

  // Create sample visa types
  const visas = await prisma.visaType.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Безвизовый въезд',
        description: 'Граждане РФ могут въезжать во Вьетнам без визы на срок до 45 дней. Паспорт должен быть действителен минимум 6 месяцев.',
        duration: 'до 45 дней',
        price: 'Бесплатно',
        documents: 'Загранпаспорт со сроком действия минимум 6 месяцев',
        order: 1
      },
      {
        title: 'E-Visa (электронная виза)',
        description: 'Электронная виза оформляется онлайн на официальном сайте immigration.gov.vn. Срок оформления 3-5 рабочих дней.',
        duration: 'до 90 дней',
        price: '25 USD',
        documents: 'Загранпаспорт, фото 4x6, подтверждение проживания',
        order: 2
      },
      {
        title: 'Виза по прилёту (VOA)',
        description: 'Оформляется в аэропорту при наличии пригласительного письма от аккредитованного агентства.',
        duration: 'до 30 дней',
        price: '25-50 USD',
        documents: 'Загранпаспорт, пригласительное письмо, фото 4x6, наличные USD',
        order: 3
      }
    ]
  })
  console.log('Visa types created:', visas.count)

  // Create sample FAQs
  const faqs = await prisma.fAQ.createMany({
    skipDuplicates: true,
    data: [
      {
        question: 'Нужна ли виза гражданам России для въезда во Вьетнам?',
        answer: 'Граждане РФ могут въезжать во Вьетнам без визы на срок до 45 дней. Для более длительного пребывания потребуется виза.',
        category: 'Общие вопросы',
        order: 1
      },
      {
        question: 'Как оформить e-visa во Вьетнам?',
        answer: 'E-visa оформляется онлайн на официальном сайте immigration.gov.vn. Заполните анкету, загрузите фото и оплатите сбор $25. Срок оформления 3-5 рабочих дней.',
        category: 'E-Visa',
        order: 2
      },
      {
        question: 'Какие документы нужны для визы?',
        answer: 'Загранпаспорт со сроком действия минимум 6 месяцев, фото 4x6 см на белом фоне, заполненная анкета, подтверждение брони отеля.',
        category: 'Документы',
        order: 3
      }
    ]
  })
  console.log('FAQs created:', faqs.count)

  console.log('Seeding completed!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
