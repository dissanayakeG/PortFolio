## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

# Prisma Setting

Here's a concise reference of everything we've used so far.

# 1. Create the project

```bash
npx create-next-app@latest study-helper
```

# 2. Install Prisma

```bash
npm install prisma @prisma/client
```

# 3. Initialize Prisma

```bash
npx prisma init
```

# 4. Install SQLite adapter (Prisma 7)

```bash
npm install @prisma/adapter-better-sqlite3 better-sqlite3
```

# 5. Install form libraries

```bash
npm install react-hook-form zod @hookform/resolvers
```

# 6. Install tsx (for running seed files)

```bash
npm install -D tsx
```

# Prisma Commands

## Generate Prisma Client

Run whenever you change `schema.prisma`.

```bash
npx prisma generate
```

## Create a migration

Run after changing the schema.

```bash
npx prisma migrate dev --name init
```

Example:

```bash
npx prisma migrate dev --name add_notes
npx prisma migrate dev --name add_examples
```

## Reset the database

Deletes all data and reapplies migrations.

```bash
npx prisma migrate reset
```

## Check migration status

```bash
npx prisma migrate status
```

## Open Prisma Studio

```bash
npx prisma studio
```

## Seed the database

```bash
npx tsx prisma/seed.ts
```

# Run the application

Development server:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Run production:

```bash
npm start
```

# Typical Workflow

When you modify the Prisma schema:

```bash
# 1. Edit prisma/schema.prisma

# 2. Create migration
npx prisma migrate dev --name your_migration_name

# 3. Regenerate Prisma Client (usually automatic with migrate, but safe to run)
npx prisma generate

# 4. (Optional) Reseed database
npx tsx prisma/seed.ts

# 5. Start development server
npm run dev
```