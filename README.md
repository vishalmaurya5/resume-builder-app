# Resume Builder

Resume Builder is a full-stack web application that allows registered users to create, edit, save, preview, print, and share professional resumes. The system provides structured resume forms, multiple resume templates, live preview, MongoDB-backed storage, Clerk-based authentication, and public resume sharing.

## Project Overview

The project is designed to solve a common problem faced by students, freshers, and working professionals: creating a clean, structured, and recruiter-friendly resume without manually handling document formatting. Users can register, select a resume template, enter professional details section by section, preview the resume in real time, save it to the database, make it public or private, share it as text or a public link, and print or save it using the browser print workflow.

## Abstract

The Resume Builder project is a MERN-based web application developed to simplify the resume creation process. The application provides a responsive frontend built with React and Vite, a backend REST API built with Node.js and Express.js, and persistent storage using MongoDB. Authentication is handled through Clerk, allowing only registered and logged-in users to manage resumes. The system supports resume sections such as personal information, professional summary, experience, education, certificates, projects, and skills. Multiple templates are provided, including ATS-friendly, classic, modern, minimal, and image-sidebar layouts. The application also supports public resume previews and print-ready saving.

## Objectives

- To provide a simple and professional platform for resume creation.
- To allow authenticated users to create, update, delete, and manage resumes.
- To provide multiple resume templates suitable for different user needs.
- To show a real-time preview while the user edits resume details.
- To store resume data securely in MongoDB.
- To support public or private resume visibility.
- To allow users to share resumes as formatted text or public preview links.
- To provide print-ready resume output using the browser print function.

## Scope

The application covers the complete workflow of resume management:

- User authentication and protected dashboard access.
- Resume creation using structured input forms.
- Resume editing and saving to database.
- Template and accent color customization.
- Resume preview with actual selected template.
- Certificate section support.
- Public resume view route for sharing.
- Print preview and save-as-PDF browser workflow.

## Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Clerk React SDK
- Lucide React icons

### Backend

- Node.js
- Express.js
- Mongoose
- MongoDB
- CORS
- Morgan
- dotenv

### Database

- MongoDB Atlas

### Authentication

- Clerk authentication on the frontend
- Bearer token verification middleware on the backend

## System Modules

### 1. Home Page Module

The home page introduces the Resume Builder platform with professional marketing content, feature highlights, testimonials, call-to-action section, and footer navigation.

### 2. Authentication Module

The application uses Clerk authentication to manage user sessions. Protected routes ensure that only registered and logged-in users can access the dashboard and resume builder.

### 3. Dashboard Module

The dashboard displays existing resumes, a create-resume action, and professional template preview cards. Each template card shows dummy resume data clearly so users can understand the design before selecting it.

### 4. Resume Builder Module

The resume builder allows users to complete resume sections step by step:

- Template
- Color
- Personal information
- Professional summary
- Experience
- Education
- Certificates
- Projects
- Skills

### 5. Template Rendering Module

The system includes multiple reusable resume template components:

- ATS Friendly Template
- Classic Template
- Modern Template
- Minimal Template
- Image Sidebar Template

### 6. Resume Preview Module

The live preview updates as the user enters data. This gives immediate visual feedback and helps users understand how the final resume will appear.

### 7. Print and Save Module

The project uses the browser print workflow through `window.print()` to preserve actual resume layout and A4 formatting. Users can save the resume as a PDF from the print dialog.

### 8. Share Module

Users can share the resume in two ways:

- Share as formatted text.
- Copy a public resume link when the resume is saved and marked public.

### 9. Backend API Module

The backend provides REST APIs for resume management and public resume access.

## Main Features

- User registration and login.
- Protected dashboard.
- Resume CRUD operations.
- Multiple professional templates.
- Template preview with dummy data.
- Live resume preview.
- Accent color selection.
- Profile photo upload for image-based templates.
- Certificate section.
- Public/private resume visibility.
- Share resume text.
- Copy public resume link.
- Browser print preview and PDF save flow.
- MongoDB database integration.

## Folder Structure

```text
Resume Builder/
  client/
    src/
      assets/
        templates/
          ATSTemplate.jsx
          ClassicTemplate.jsx
          MinimalImageTemplate.jsx
          MinimalTemplate.jsx
          ModernTemplate.jsx
      components/
        home/
        PersonalInfoForm.jsx
        ProtectedRoute.jsx
        ResumeTemplateRenderer.jsx
      lib/
        api.js
        printResume.js
        resumeTemplates.js
        sampleResumes.js
      pages/
        Dashboard.jsx
        Home.jsx
        Layout.jsx
        Login.jsx
        Preview.jsx
        ResumeBuilder.jsx
    package.json
  server/
    src/
      config/
        db.js
      controllers/
        authController.js
        resumeController.js
      middleware/
        authMiddleware.js
        errorHandler.js
      models/
        Resume.js
        User.js
      routes/
        authRoutes.js
        resumeRoutes.js
      app.js
      server.js
    package.json
  README.md
  package.json
```

## Database Design

### Resume Collection

The resume document stores all user resume information.

Important fields:

- `userId`: owner of the resume.
- `title`: resume title.
- `personal_info`: name, profession, email, phone, location, links, and image.
- `professional_summary`: summary paragraph.
- `experience`: company, position, dates, description, and current job status.
- `education`: institution, degree, field, graduation date, and GPA.
- `certificates`: certificate name, issuer, issue date, credential URL, and description.
- `project`: project name, type, and description.
- `skills`: list of skills.
- `template`: selected resume template.
- `accent_color`: selected template accent color.
- `public`: resume visibility status.

## API Endpoints

### Health Check

```http
GET /api/health
```

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
```

### Resume Routes

```http
GET /api/resumes
POST /api/resumes
GET /api/resumes/:id
PUT /api/resumes/:id
DELETE /api/resumes/:id
GET /api/resumes/public/:id
```

## Installation and Setup

### 1. Install Root Dependencies

```bash
npm install
```

### 2. Install Client Dependencies

```bash
cd client
npm install
```

### 3. Install Server Dependencies

```bash
cd server
npm install
```

## Environment Variables

### Client `.env.local`

```env
VITE_API_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY
```

### Server `.env`

```env
PORT=5000
CLIENT_ORIGIN=http://127.0.0.1:5173
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
MONGO_DB_NAME=resume-builder
JWT_SECRET=YOUR_JWT_SECRET
JWT_EXPIRES_IN=7d
```

Do not commit real secret values to a public repository.

## Run the Project

### Start Backend

```bash
npm run server:dev
```

### Start Frontend

```bash
npm run client:dev
```

Frontend runs on:

```text
http://127.0.0.1:5173
```

Backend runs on:

```text
http://localhost:5000
```

## Build and Verification

### Frontend Lint

```bash
npm run client:lint
```

### Frontend Build

```bash
npm run client:build
```

## User Workflow

1. User opens the website.
2. User registers or logs in.
3. User enters the dashboard.
4. User selects a resume template.
5. User creates a resume.
6. User fills personal information, summary, experience, education, certificates, projects, and skills.
7. User previews the resume live.
8. User saves the resume.
9. User sets visibility to public or private.
10. User shares resume text or public link.
11. User opens print preview and saves the resume as PDF.

## Thesis Report Guidance

This README can be expanded into a thesis report using the following chapter structure:

### Chapter 1: Introduction

- Background of resume building systems.
- Problem statement.
- Project motivation.
- Objectives.
- Scope of the project.

### Chapter 2: Literature Review

- Existing online resume builders.
- Importance of ATS-friendly resumes.
- Authentication and secure user data management.
- Need for template-based document generation.

### Chapter 3: System Analysis

- Existing system limitations.
- Proposed system.
- Feasibility study.
- Functional requirements.
- Non-functional requirements.

### Chapter 4: System Design

- System architecture.
- Frontend design.
- Backend design.
- Database schema.
- API design.
- Data flow diagrams.
- Use case diagrams.

### Chapter 5: Implementation

- React frontend implementation.
- Clerk authentication integration.
- Express backend implementation.
- MongoDB integration.
- Resume template rendering.
- Print and share functionality.

### Chapter 6: Testing

- Unit-level testing of components.
- API testing.
- Authentication flow testing.
- Resume CRUD testing.
- Print preview testing.
- Public link testing.

### Chapter 7: Result and Discussion

- Screenshots of home page, dashboard, builder, preview, and print output.
- Explanation of achieved objectives.
- System limitations.

### Chapter 8: Conclusion and Future Scope

- Conclusion.
- Future improvements.
- Possible enhancements such as more templates, analytics, multilingual resumes, and admin panel.

## Functional Requirements

- The system shall allow users to register and log in.
- The system shall allow only authenticated users to access the dashboard.
- The system shall allow users to create resumes.
- The system shall allow users to edit resume content.
- The system shall allow users to select templates and colors.
- The system shall allow users to save resumes in MongoDB.
- The system shall allow users to delete resumes.
- The system shall allow users to mark resumes public or private.
- The system shall allow users to share resume text.
- The system shall allow users to copy a public resume link.
- The system shall allow users to print and save resumes as PDF.

## Non-Functional Requirements

- The application should be responsive.
- The user interface should be simple and professional.
- The resume preview should be clear and readable.
- The backend should return proper error messages.
- The database should persist resume data reliably.
- Protected routes should prevent unauthorized access.
- The system should be maintainable and modular.

## Future Scope

- Add more resume templates.
- Add cover letter builder.
- Add admin dashboard.
- Add resume scoring.
- Add multilingual resume support.
- Add drag-and-drop section ordering.
- Add downloadable DOCX export.
- Add version history for resumes.
- Add analytics for public resume views.

## References

### Technology References

- React: https://react.dev/
- Vite: https://vite.dev/
- Tailwind CSS: https://tailwindcss.com/
- React Router: https://reactrouter.com/
- Clerk React Authentication: https://clerk.com/docs/react/getting-started/quickstart
- Lucide React Icons: https://lucide.dev/
- Node.js: https://nodejs.org/
- Express.js: https://expressjs.com/
- MongoDB: https://www.mongodb.com/
- Mongoose: https://mongoosejs.com/
- MongoDB Atlas: https://www.mongodb.com/products/platform/atlas-database
- dotenv: https://github.com/motdotla/dotenv
- CORS middleware: https://github.com/expressjs/cors
- Morgan logger: https://github.com/expressjs/morgan

### UI Reference

- Prebuilt UI was used as a UI design reference for selected landing page sections and layout inspiration: https://prebuiltui.com/

### Project Idea Reference

- GreatStack was used as a project idea and learning reference for the resume builder concept and implementation direction: https://www.youtube.com/@GreatStackDev

## Conclusion

Resume Builder provides a complete digital workflow for professional resume creation. It combines a responsive React frontend, secure authentication, MongoDB storage, reusable resume templates, live preview, public sharing, and print-ready output. The project is suitable for academic submission because it demonstrates full-stack development, database design, authentication, protected routes, CRUD operations, responsive UI design, and real-world problem solving.
