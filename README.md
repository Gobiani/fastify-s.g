# Omno Payment API Integration

## Prerequisites
- Node.js
- npm

## Setup Instructions

1. Clone the repository
   ```bash
   git clone <your-repository-url>
   cd <project-directory>
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure Environment Variables
   Create a `.env` file in the project root and configure the following variables:

   ```
   # Server configuration
   PORT=3000
   HOST=0.0.0.0

   # Omno API credentials
   OMNO_MERCHANT_NAME=
   OMNO_CLIENT_ID=
   OMNO_CLIENT_SECRET=
   OMNO_BASE_URL=

   # Webhook configuration
   WEBHOOK_BASE_URL=
   ```

   ### Required Environment Variables to Configure:
   - `OMNO_MERCHANT_NAME`: Your merchant account name
   - `OMNO_CLIENT_ID`: Your Omno API client ID
   - `OMNO_CLIENT_SECRET`: Your Omno API client secret
   - `OMNO_BASE_URL`: Base URL for Omno API
   - `WEBHOOK_BASE_URL`: Webhook receiving URL (e.g., webhooks.site URL)

4. Run the Application
   ```bash
   npm start
   ```

## Webhook Integration

- Use a service like [webhooks.site](https://webhooks.site) to generate a unique webhook URL
- Configure the `WEBHOOK_BASE_URL` in your `.env` file with the generated URL
- Ensure your webhook endpoint can receive POST requests with `application/json` content type
- The application will forward webhook data to `localhost:3000/webhook`
