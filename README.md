# NexusChat ⚡️

<p align="center">
  A full-stack, real-time chat application featuring direct messaging and live, streaming conversations with advanced AI personas.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12-FF2D20?style=for-the-badge&logo=laravel" alt="Laravel">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Reverb-1.5-F05340?style=for-the-badge&logo=laravel" alt="Reverb">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
</p>

<p align="center">
  <em><br>Application Architecture Overview</em>
</p>

NexusChat is built with a decoupled, API-driven architecture, combining a powerful Laravel backend with a responsive React frontend. It demonstrates a complete, modern development workflow, from secure authentication to real-time, AI-powered interactions.

---

## ✨ Core Features

* **Real-Time Communication:** Engage in instant, bidirectional conversations powered by **Laravel Reverb** and WebSockets, ensuring zero-latency message delivery.
* **Intelligent AI Personas:** Chat with unique AI personalities integrated via the **Google Gemini API**. Each persona has a distinct system prompt defining its behavior.
* **Live Streaming Responses:** Experience a dynamic "typing" effect as AI responses are streamed chunk-by-chunk directly to the UI for a more engaging and natural interaction.
* **Secure Authentication:** Robust and secure user authentication supporting both traditional email/password login and seamless **Google OAuth 2.0**, all managed by **Laravel Sanctum**.
* **Modern, Responsive Interface:** A sleek and intuitive UI built with **React** and **Tailwind CSS**, designed for a seamless experience across all devices.
* **Optimized State Management:** Efficiently manages server-side state with **TanStack Query** and client-side state with **Zustand** for a fast and reliable user experience.
* **API Safeguards:** Built-in protection against abuse with API rate limiting for message creation and a hard cap on total user registrations.

---

## 🛠️ Tech Stack

| Category      | Technology                                                                                                                              |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend** | **Laravel 12** (PHP 8.4), **Laravel Reverb**, **Laravel Sanctum**, **PostgreSQL**, Google Gemini API                                       |
| **Frontend** | **React 18** (Vite), **TypeScript**, **Tailwind CSS**, **TanStack Query**, **Zustand**, Axios, Laravel Echo                                |
| **DevOps** | Composer, NPM, Git                                                                                                                      |

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* PHP >= 8.4
* Node.js >= 18.x
* Composer
* PostgreSQL or another configured database

### Installation

1.  **Clone the repositories** for both the frontend (`chat-client`) and backend (`chat-api`).

2.  **Setup Backend (`chat-api`):**
    ```bash
    # Navigate to the backend directory
    cd chat-api

    # Install PHP dependencies
    composer install

    # Create your environment file
    cp .env.example .env

    # Generate an application key
    php artisan key:generate

    # Configure your .env file with database, Reverb, and Google credentials
    # ...

    # Run database migrations and seeders
    php artisan migrate:fresh --seed

    # Start the development server and queue worker
    php artisan serve
    php artisan reverb:start
    php artisan queue:listen
    ```

3.  **Setup Frontend (`chat-client`):**
    ```bash
    # Navigate to the frontend directory
    cd chat-client

    # Install NPM packages
    npm install

    # Create your environment file and add VITE_REVERB_* variables
    cp .env.example .env.local

    # Start the development server
    npm run dev
    ```

Your application should now be running, with the frontend available at `http://localhost:5173` and the backend at `http://localhost:8000`.