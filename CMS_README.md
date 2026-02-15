# Portfolio CMS Documentation

## Overview

This portfolio website includes a built-in Content Management System (CMS) that allows you to manage:
- **Development Projects** - Your coding projects and applications
- **Design Showcase** - Your design work and creative projects
- **Achievements & Certifications** - Your professional certifications and achievements
- **Testimonials** - Client reviews and feedback

## Accessing the Admin Panel

1. Navigate to `/admin` in your browser (e.g., `http://localhost:3000/admin`)
2. Enter the admin password (default: `admin123`)
3. You'll be redirected to the CMS dashboard

## Features

### Projects Management
- **Dual Mode**: Manage both Developer and Designer projects separately
- **Fields**:
  - Title
  - Category
  - Layout (tall, medium, short)
  - Description
  - Technologies (comma-separated)
  - Image URL
  - Live URL
  - GitHub URL
- **Operations**: Create, Read, Update, Delete (CRUD)

### Achievements Management
- **Fields**:
  - Title
  - Issuer
  - Date
  - Description
  - Category
  - Icon (emoji)
  - Certificate URL
  - Credential URL
- **Operations**: CRUD

### Testimonials Management
- **Fields**:
  - Name
  - Role
  - Company
  - Content
  - Rating (1-5 stars)
  - Avatar URL
  - Featured flag
- **Operations**: CRUD

## Data Storage

All content is stored in JSON files located in `/lib/data/`:
- `projects.json` - All project data
- `achievements.json` - All achievement data
- `testimonials.json` - All testimonial data

## API Endpoints

### Projects
- `GET /api/projects?mode=developer|designer` - Fetch projects
- `POST /api/projects` - Create new project
- `PUT /api/projects` - Update existing project
- `DELETE /api/projects?mode=developer|designer&id=<id>` - Delete project

### Achievements
- `GET /api/achievements` - Fetch all achievements
- `POST /api/achievements` - Create new achievement
- `PUT /api/achievements` - Update existing achievement
- `DELETE /api/achievements?id=<id>` - Delete achievement

### Testimonials
- `GET /api/testimonials` - Fetch all testimonials
- `POST /api/testimonials` - Create new testimonial
- `PUT /api/testimonials` - Update existing testimonial
- `DELETE /api/testimonials?id=<id>` - Delete testimonial

## Security

⚠️ **Important**: The current authentication is basic and for development purposes only.

For production, you should:
1. Implement proper authentication (NextAuth.js, Auth0, etc.)
2. Add environment variables for sensitive data
3. Implement role-based access control
4. Add CSRF protection
5. Use a proper database instead of JSON files

## Customization

### Changing the Admin Password

Edit `/app/admin/page.tsx` and modify the password check:

```typescript
if (password === "your-new-password") {
  setIsAuthenticated(true);
}
```

---

Happy content managing! 🎉
