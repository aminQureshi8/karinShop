# 🛍️ KarinShop

A modern, full-featured e-commerce platform built with **Next.js 16**, **TypeScript**, **MongoDB**, and **Redux Toolkit**. KarinShop delivers a fast, scalable, and production-ready shopping experience with a rich admin CMS and seamless user interface.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Database** | MongoDB + Mongoose |
| **State Management** | Redux Toolkit + React Redux |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Authentication** | NextAuth.js + JWT + bcrypt |
| **Rich Text Editor** | CKEditor 5 |
| **File Storage** | AWS S3 + Cloudinary |
| **Package Manager** | pnpm (workspace) |
| **Containerization** | Docker |
| **PWA** | next-pwa |

---

## ✨ Features

- 🛒 Full shopping cart and product catalog
- 🔐 Secure authentication with JWT and NextAuth.js
- 📦 Product management with rich-text descriptions (CKEditor 5)
- 🖼️ Image uploads via AWS S3 and Cloudinary
- 📅 Jalali (Persian) calendar support
- 🎨 Dark/light theme with next-themes
- 📱 Progressive Web App (PWA) support
- ⚡ Top-loading progress bar for smooth navigation
- 🔔 Toast notifications via react-hot-toast and SweetAlert2
- 🎡 Product carousels powered by Swiper
- 📐 Accessible UI components from Radix UI and Headless UI
- 🐳 Docker-ready with multi-stage production build

---

## 📁 Project Structure

```
karinShop/
├── config/          # App-wide configuration (DB, auth, etc.)
├── models/          # Mongoose data models
├── public/          # Static assets
├── src/             # Application source (pages, components, lib, store)
├── Dockerfile       # Multi-stage Docker build
├── next.config.ts   # Next.js configuration
├── tsconfig.json    # TypeScript configuration
└── package.json     # Dependencies and scripts
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+
- MongoDB instance (local or cloud)

### Installation

```bash
# Clone the repository
git clone https://github.com/aminQureshi8/karinShop.git
cd karinShop

# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory and configure the following:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# JWT
JWT_SECRET=your_jwt_secret

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_s3_bucket_name

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Running the App

```bash
# Development
pnpm dev

# Production build
pnpm build
pnpm start

# Linting
pnpm lint
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 🐳 Docker Deployment

The project includes an optimized multi-stage Dockerfile using a minimal Node.js 20 slim image.

```bash
# Build the Docker image
docker build -t karinshop .

# Run the container
docker run -p 3000:3000 --env-file .env.local karinshop
```

The production container runs as a non-root user for improved security and exposes port `3000`.

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `next` 16 | Core framework |
| `mongoose` | MongoDB ODM |
| `@reduxjs/toolkit` | State management |
| `next-auth` | Authentication |
| `@ckeditor/ckeditor5-react` | Rich text editing |
| `@aws-sdk/client-s3` | File uploads to S3 |
| `cloudinary` | Image hosting & transformation |
| `swiper` | Product carousels |
| `react-hook-form` | Form handling |
| `sweetalert2` | Alert dialogs |
| `jalaali-js` | Jalali/Persian date conversion |
| `next-pwa` | Progressive Web App support |
| `next-themes` | Dark/light mode |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is private and not licensed for public distribution.

---

## 👤 Author

**Amin Qureshi**
- GitHub: [@aminQureshi8](https://github.com/aminQureshi8)
