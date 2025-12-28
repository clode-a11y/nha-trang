import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const visas = await prisma.visaType.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(visas)
  } catch (error) {
    console.error('Error fetching visas:', error)
    return NextResponse.json({ error: 'Failed to fetch visas' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const visa = await prisma.visaType.create({
      data: {
        title: body.title,
        description: body.description,
        duration: body.duration,
        price: body.price,
        documents: body.documents,
        isActive: body.isActive ?? true,
        order: body.order ?? 0
      }
    })
    return NextResponse.json(visa)
  } catch (error) {
    console.error('Error creating visa:', error)
    return NextResponse.json({ error: 'Failed to create visa' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const visa = await prisma.visaType.update({
      where: { id: body.id },
      data: {
        title: body.title,
        description: body.description,
        duration: body.duration,
        price: body.price,
        documents: body.documents,
        isActive: body.isActive,
        order: body.order
      }
    })
    return NextResponse.json(visa)
  } catch (error) {
    console.error('Error updating visa:', error)
    return NextResponse.json({ error: 'Failed to update visa' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    await prisma.visaType.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting visa:', error)
    return NextResponse.json({ error: 'Failed to delete visa' }, { status: 500 })
  }
}
