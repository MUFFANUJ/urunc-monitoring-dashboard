# urunc CI Dashboard

A comprehensive dashboard for monitoring CI/CD workflows for the [urunc](https://github.com/nubificus/urunc) project.

## Features

- **Real-time Monitoring**: Track the status of nightly integration tests, unit tests, and E2E workflows.
- **Visual Metrics**: View success rates, duration trends, and failure analysis through interactive charts.
- **Job Details**: Drill down into specific job runs to inspect logs and failure reasons.
- **Responsive Design**: optimized for both desktop and mobile viewing with dark mode support.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nubificus/urunc-ci-dashboard.git
   cd urunc-ci-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Build

To create a production build:

```bash
npm run build
```

## Tech Stack

- **Framework**: React + Vite
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: TanStack Query

## License

CNCF urunc Project
