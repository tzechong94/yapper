# AI Chatbot Documentation

## Overview

The AI Chatbot project allows users to chat with an AI assistant, save chat histories, and create new conversations. Each chat is persisted in a PostgreSQL database (NeonDB) with Drizzle ORM for database interaction. The application supports user authentication via ClerkJS, providing options to log in with Google, GitHub, or email.

The user interface (UI) is built with **Next.js**, **TypeScript**, **TailwindCSS**, **ShadCN**, and **Lucide React** icons. The application makes use of **TanStack Query** for data fetching and **OpenAI's Chat Completion API** for AI interaction.

## Features

- **Chat Creation**: Users can create new chats with the AI assistant.
- **Chat History**: Each conversation is saved in the database and can be accessed at any time.
- **Delete Chats**: Users have the ability to delete chats.
- **Authentication**: Supports Google, GitHub, and email-based login using ClerkJS.
- **Responsive Design**: The UI adapts to different screen sizes using TailwindCSS for styling.

## Tech Stack

- **Frontend**:

  - **Next.js** (App Router, API routes)
  - **TypeScript**
  - **TailwindCSS** (styling)
  - **ShadCN** (UI components)
  - **Lucide React** (Icons)
  - **TanStack Query** (data fetching)

- **Backend**:

  - **NeonDB** (PostgreSQL Database)
  - **Drizzle ORM** (Database ORM)
  - **ClerkJS** (Authentication)

- **APIs**:

  - **OpenAI** (Chat Completion API for AI responses)
  - **Next.js API Routes** (to handle database operations)

- **Deployment**:
  - **Vercel** (Deployment with automatic CI/CD pipeline)
  - **GitHub** (Version control and deployment triggers)

## Architecture Overview

1. **Frontend**:

   - The **Next.js** application serves both static pages and dynamic routes. It uses the **App Router** to organize the structure.
   - For user interface, **TailwindCSS** is used for responsive and modern UI designs, while **ShadCN** provides pre-built, customizable UI components. **Lucide React** is used to integrate icons into the application.
   - **TanStack Query** is used for handling data fetching (including chat history retrieval and chat creation).

2. **Backend**:

   - The backend API routes in **Next.js** handle database operations such as fetching and deleting chat data. These routes communicate with the **NeonDB** PostgreSQL database.
   - **Drizzle ORM** is used to interact with the database, ensuring smooth and efficient querying.
   - The **OpenAI API** is used to generate AI responses for the chatbot, which are then displayed in the chat interface.

3. **Authentication**:

   - **ClerkJS** handles user authentication, supporting various methods including **Google**, **GitHub**, and **email** login.
   - After successful authentication, users can create and view their chats. All chats are associated with the authenticated user.

4. **Database**:
   - **NeonDB** is a PostgreSQL database used to persist user data, chat histories, and chat metadata (such as user ID, creation time, and content).
   - **Drizzle ORM** is used as the object-relational mapper (ORM) to interact with the PostgreSQL database in a type-safe manner, ensuring smooth operations for creating, retrieving, and deleting chats.

## API Routes

- **/api/chat**: POST request to chat with AI. Accepts input from the user and sends the message to the OpenAI API, storing both the user’s prompt and the AI response in the database.
- **/api/delete-chat/{id}**: DELETE request to delete a chat. It removes the selected chat from the database and all associated messages.
- **/api/get-messages**: GET request to retrieve the chat messages for the associated chat ID.
- **/api/create-chat**: POST request to create a new chat. It creates a new chat in the database and returns the chat ID.

## Database Schema

- **Chats**:
  - `id` (Primary Key, Auto-increment)
  - `userId` (Foreign Key: links to Clerk user)
  - `createdAt` (Timestamp)
  - `pdfName` (Chat name, optional)
- **Messages**:
  - `id` (Primary Key, Auto-increment)
  - `chatId` (Foreign Key: links to chat)
  - `role` (AI or User)
  - `content` (Text content of the message)
  - `createdAt` (Timestamp)

## Authentication Flow

1. The user logs in using one of the supported methods: **Google**, **GitHub**, or **email**.
2. Upon successful authentication, the user is redirected to the homepage or the chat page.
3. All chats created by the user are associated with their **userId** in the database, ensuring data isolation between users.

## Deployment and CI/CD

- **Vercel** handles deployment, with automatic CI/CD setup whenever changes are pushed to the GitHub repository. The build process automatically detects changes and deploys the latest version.
- The database is hosted on **NeonDB**, which integrates seamlessly with PostgreSQL.

## Conclusion

This project provides a simple but powerful AI-powered chatbot with full user authentication, chat history persistence, and a clean, modern UI. By using **Next.js**, **ClerkJS**, **Drizzle ORM**, and **NeonDB**, the architecture ensures scalability and maintainability for future enhancements.

TestPassword123!@3 -> test account