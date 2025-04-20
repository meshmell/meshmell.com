import { PrismaClient } from "@prisma/client";

import { ActionDetails } from "@/src/types/actions";

import seedData from "./seedData";
import seedDevData from "./seedDevData";

const prisma = new PrismaClient();

async function main() {
  const actionMap = new Map<string, ActionDetails>();
  const categoryMap = new Map<string, any>();
  const userMap = new Map<string, any>();
  const formatMap = new Map<string, any>();
  const resolutionMap = new Map<string, any>();

  // Insert Main Roles
  const mainRoles = ["admin", "user"];
  for (const role of mainRoles) {
    await prisma.mainRole.create({
      data: {
        name: role,
        slug: role,
      },
    });
  }

  // Insert Sub Roles
  const subRoles = ["creator", "sponsor", "developer"];
  for (const role of subRoles) {
    await prisma.subRole.create({
      data: {
        name: role,
        slug: role,
      },
    });
  }

  // Insert Actions
  for (const actionData of seedData.actions) {
    const action = await prisma.action.create({
      data: {
        name: actionData.name,
        slug: actionData.slug,
        icon: actionData.icon,
      },
    });
    actionMap.set(actionData.slug, action);
  }

  if (process.env.NEXT_PUBLIC_ENV_STATUS !== "production") {
    // Insert Sponsors
    for (const sponsorData of seedDevData.sponsors) {
      await prisma.user.create({
        data: {
          slug: sponsorData.slug,
          name: sponsorData.name,
          description: sponsorData.description,
          mainRole: { connect: { slug: "user" } },
          subRoles: { connect: { slug: "sponsor" } },
          password: "sponsor",
        },
      });
    }
  }

  // Insert Creators
  for (const creatorData of seedData.creators) {
    const user = await prisma.user.create({
      data: {
        slug: creatorData.slug,
        name: creatorData.name,
        description: creatorData.description,
        mainRole: { connect: { slug: "user" } },
        subRoles: { connect: { slug: "creator" } },
        password: "creator",
      },
    });
    userMap.set(creatorData.slug, user);
  }

  // Insert Users
  for (const userData of seedData.users) {
    await prisma.user.create({
      data: {
        slug: userData.slug,
        name: userData.name,
        mainRole: { connect: { slug: "user" } },
        subRoles: { connect: { slug: "normal" } },
        password: "user",
      },
    });
  }

  // Insert Admin
  await prisma.user.create({
    data: {
      email: "mesh@ mesh.com",
      slug: "mesh",
      password: "mesh",
      name: "Mesh Admin",
      mainRole: { connect: { slug: "admin" } },
    },
  });

  // Insert Categories
  for (const categoryData of seedData.categories) {
    const category = await prisma.category.create({
      data: {
        name: categoryData.name,
        slug: categoryData.slug,
        icon: categoryData.icon,
        color: categoryData.color,
      },
    });
    categoryMap.set(categoryData.slug, category);
  }

  // Collect Formats and Resolutions
  const formatSet = new Set<string>();
  const resolutionSet = new Set<string>();

  for (const modelData of seedData.models) {
    if (modelData.formats) {
      for (const format of modelData.formats) {
        formatSet.add(format.name);
      }
    }

    if (modelData.resolutions) {
      for (const resolution of modelData.resolutions) {
        resolutionSet.add(resolution);
      }
    }
  }

  // Insert Formats
  for (const formatName of formatSet) {
    const format = await prisma.format.create({
      data: {
        name: formatName,
      },
    });
    formatMap.set(formatName, format);
  }

  // Insert Resolutions
  for (const resolutionName of resolutionSet) {
    const resolution = await prisma.resolution.create({
      data: {
        name: resolutionName,
      },
    });
    resolutionMap.set(resolutionName, resolution);
  }

  // Insert ThreeDModels
  for (const modelData of seedData.models) {
    const user = userMap.get(modelData.creator);

    if (!user) {
      console.error(`User ${modelData.creator} not found`);
      continue;
    }

    const categories = modelData.categoryTags
      .map((slug: string) => categoryMap.get(slug))
      .filter(Boolean);

    const actions = (modelData.actions ?? [])
      .map((slug: string) => actionMap.get(slug))
      .filter(Boolean);

    const formats = (modelData.formats || [])
      .map((format: any) => formatMap.get(format.slug))
      .filter(Boolean);

    const resolutions = (modelData.resolutions || [])
      .map((name: string) => resolutionMap.get(name))
      .filter(Boolean);

    await prisma.threeDModel.create({
      data: {
        name: modelData.name,
        slug: modelData.slug,
        description: modelData.description,
        scale: modelData.scale,
        rotationDegreesX: modelData.rotationDegrees.x,
        rotationDegreesY: modelData.rotationDegrees.y,
        rotationDegreesZ: modelData.rotationDegrees.z,
        price: modelData.price,
        license: modelData.license,
        credit: modelData.credit,
        isDownloadable: modelData.isDownloadable,
        publishedAt: new Date(modelData.published),
        user: { connect: { id: user.id } },
        categories: {
          connect: categories.map((category: any) => ({ id: category.id })),
        },
        actions: {
          connect: actions.map((action: any) => ({ id: action.id })),
        },
        formats: {
          connect: formats.map((format: any) => ({ id: format.id })),
        },
        resolutions: {
          connect: resolutions.map((resolution: any) => ({
            id: resolution.id,
          })),
        },
      },
    });
  }

  console.log("Database has been seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
