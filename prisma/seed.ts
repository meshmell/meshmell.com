import { PrismaClient } from '@prisma/client'
import models from './seed/models.json'
import actions from './seed/actions.json'
import categories from './seed/categories.json'
import users from './seed/users.json'

const prisma = new PrismaClient()

async function main() {
  // Create main roles
  const adminRole = await prisma.mainRole.upsert({
    where: { slug: 'admin' },
    update: {},
    create: {
      slug: 'admin',
      name: 'Admin'
    }
  })

  const userRole = await prisma.mainRole.upsert({
    where: { slug: 'user' },
    update: {},
    create: {
      slug: 'user',
      name: 'User'
    }
  })

  // Create sub roles
  const creatorRole = await prisma.subRole.upsert({
    where: { slug: 'creator' },
    update: {},
    create: {
      slug: 'creator',
      name: 'Creator'
    }
  })

  const developerRole = await prisma.subRole.upsert({
    where: { slug: 'developer' },
    update: {},
    create: {
      slug: 'developer',
      name: 'Developer'
    }
  })

  const sponsorRole = await prisma.subRole.upsert({
    where: { slug: 'sponsor' },
    update: {},
    create: {
      slug: 'sponsor',
      name: 'Sponsor'
    }
  })

  // Create users from users.json
  const createdUsers = await Promise.all(
    users.map(async (user) => {
      // Get main role based on mainRoles field
      const mainRole = user.mainRoles === 'admin' ? adminRole : userRole

      // Get sub roles based on subRoles array
      const subRoles = await Promise.all(
        user.subRoles.map(async (role) => {
          const subRole = await prisma.subRole.findUnique({
            where: { slug: role }
          })
          return { id: subRole?.id }
        })
      )

      return prisma.user.upsert({
        where: { slug: user.slug },
        update: {},
        create: {
          name: user.name,
          slug: user.slug,
          description: user.description || null,
          twitterUrl: user.twitter || null,
          websiteUrl: user.website || null,
          youtubeUrl: user.youtube || null,
          mainRoleId: mainRole.id,
          subRoles: {
            connect: subRoles.filter(role => role.id)
          }
        }
      })
    })
  )

  // Create categories from categories.json
  const createdCategories = await Promise.all(
    categories.map(async (category) => {
      return prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: {
          name: category.name,
          slug: category.slug,
          icon: category.icon,
          color: category.color
        }
      })
    })
  )

  // Create actions from actions.json
  const createdActions = await Promise.all(
    actions.map(async (action) => {
      return prisma.action.upsert({
        where: { slug: action.slug },
        update: {},
        create: {
          name: action.name,
          slug: action.slug,
          icon: action.icon
        }
      })
    })
  )

  // Create formats
  const formatSlugs = Array.from(
    new Set(models.flatMap(model => model.formats))
  )

  const formats = await Promise.all(
    formatSlugs.map(async (name) => {
      const format = await prisma.format.create({
        data: { name }
      })
      return format
    })
  )

  // Create resolutions
  const resolutionSlugs = Array.from(
    new Set(models.flatMap(model => model.resolutions || []))
  )

  const resolutions = await Promise.all(
    resolutionSlugs.map(async (name) => {
      const resolution = await prisma.resolution.create({
        data: { name }
      })
      return resolution
    })
  )

  // Create 3D models
  for (const model of models) {
    const user = createdUsers.find(u => u.slug === model.creator)
    if (!user) continue

    const threeDModel = await prisma.threeDModel.upsert({
      where: { slug: model.slug },
      update: {},
      create: {
        name: model.name,
        slug: model.slug,
        description: model.description || '',
        price: model.price,
        license: model.license,
        credit: model.credit || null,
        isDownloadable: model.isDownloadable,
        publishedAt: new Date(model.published),
        scale: model.scale,
        rotationDegreesX: model.rotationDegrees.x,
        rotationDegreesY: model.rotationDegrees.y,
        rotationDegreesZ: model.rotationDegrees.z,
        userId: user.id,
        categories: {
          connect: model.categoryTags.map(tag => ({
            slug: tag
          }))
        },
        formats: {
          create: model.formats.map(format => ({
            format: {
              connect: { id: formats.find(f => f.name === format)?.id }
            },
            isUsed: format === model.usedFormat
          }))
        },
        resolutions: {
          connect: (model.resolutions || []).map(resolution => ({
            id: resolutions.find(r => r.name === resolution)?.id
          })).filter(Boolean)
        },
        actions: {
          connect: (model.actions || []).map(action => ({
            slug: action
          }))
        }
      }
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
