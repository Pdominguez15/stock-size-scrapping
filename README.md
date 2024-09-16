# Stock size scrapping

This is a serverless application built using Wrangler, which includes three endpoints and a scheduled task. It serves as the backend logic for a frontend application where users can add out-of-stock products and receive notifications when they become available.

## Prerequisites

- Wrangler installed on your system. Install Wrangler globally: `npm install -g @cloudflare/wrangler`

## Installation

Follow the steps below to set up and run the application:

1. Clone this repository on your local machine or download the project files.

2. In the project's root directory, run the following command to install the required dependencies:

   ```bash
   npm install
   ```

3. Create a wrangler.toml file in the project's root directory and define the following environment variables:

   ```bash
   TOKEN_TELEGRAM: The token for your Telegram bot.
   CHAT_ID: The ID of the chat where notifications will be sent.
   MAILSERVER: The configuration for your mail server.
   REALM_APP_NAME: The name of your Realm application.
   REALM_APP_API_KEY: The API key for your Realm application.
   ```

4. Start the application by running the following command:

   ```bash
   npm run start
   ```

## Usage

The application exposes a these endpoints:

### `/getData` (POST)

This endpoint is used to retrieve information for a product.

### `/sendData` (POST)

This endpoint allows you to save product data in the database using MongoDB.

### `Scheduled`

The application includes a scheduled task that runs periodically to check if the products stored in the database have become available in stock. If a product is available, it sends a notification to the user.

## Contribution

If you'd like to contribute to this project, feel free to do so. You can submit pull requests with your improvements, bug fixes, or other modifications.

## Credits

This project utilizes the following npm packages:

- Itty-router: https://www.npmjs.com/package/itty-router
- Mongoose: https://www.npmjs.com/package/mongoose
- realm-web: https://www.npmjs.com/package/realm-web

## License

This project is licensed under the MIT License. See the LICENSE file for details.
