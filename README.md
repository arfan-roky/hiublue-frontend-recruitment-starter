# Setup Guide for Hiublue Frontend Recruitment Starter

## Deployment URL

You can visit the website and log in using the following details:

**URL:** [https://hiublue-frontend-recruitment-starter-omega.vercel.app/](https://hiublue-frontend-recruitment-starter-omega.vercel.app/)

**Credentials:**

- **Email:** test@example.com
- **Password:** password123

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (Latest LTS version recommended)
- **pnpm** (Package Manager)

If you don’t have `pnpm`, install it using:

```sh
npm install -g pnpm
```

## Clone the Repository

To get started, clone the repository using SSH:

```sh
git clone git@github.com:arfan-roky/hiublue-frontend-recruitment-starter.git
```

Navigate into the project directory:

```sh
cd hiublue-frontend-recruitment-starter
```

## Environment Variables

Create a `.env.local` file in the root directory and add the required environment variables:

```
NEXT_PUBLIC_API_URL=https://example.com/api
```

## Install Dependencies

Run the following command to install the required dependencies:

```sh
pnpm install
```

## Start the Development Server

Once dependencies are installed, start the Next.js development server with:

```sh
pnpm run dev
```

The application should now be running on **http://localhost:3000/** by default.

## Additional Commands

- **Build for production**:
  ```sh
  pnpm run build
  ```
- **Run production server**:
  ```sh
  pnpm start
  ```

For any issues, check the project documentation or open an issue in the repository.
