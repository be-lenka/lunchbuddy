# LunchBuddy Slack Bot

<center>
   
![obrázok](https://github.com/user-attachments/assets/157c980b-afca-4396-a373-ec2ba6a7a611)
</center>

LunchBuddy is a Slack bot designed to simplify your lunch planning. It fetches daily menu offers from nearby restaurants and displays them directly in your Slack workspace. With features like restaurant-specific menu queries, lunch polls, and seamless Slack integration, LunchBuddy is the ultimate tool for teams deciding where to eat.

## List of Basic Commands:

#### `shall we lunch?`

Triggers a simple poll with the question "Where should we go for lunch?"

![obrázok](https://github.com/user-attachments/assets/f2285ddd-a30f-45c8-8a87-bb6f82c5dbf7)

#### `what is the offer?`

Displays a list of all restaurants along with their daily menus.

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/be-lenka/lunchbuddy.git && cd lunchbuddy
```

### Step 2: Create a New Slack App

1. Go to the [Slack API Apps page](https://api.slack.com/apps).
2. Click **"Create New App"**.
3. Choose **"From scratch"** and provide a name for your app (e.g., `LunchBuddy`) and select your Slack workspace.
4. Navigate to **"OAuth & Permissions"**:
   - Add the following scopes under **Bot Token Scopes**:
     - `chat:write`
     - `commands`
     - `reactions:write`
     - `channels:read`
     - `groups:read`
     - `im:read`
     - `mpim:read`
   - Click **"Install App to Workspace"** and authorize the app.
   - Copy the **Bot User OAuth Token**.
5. Navigate to **"Basic Information"**:
   - Copy the **Signing Secret**.
6. Navigate to **"Socket Mode"**:
   - Enable **Socket Mode** and generate an **App Token**.
   - Copy the **App Token**.

### Step 3: Configure Environment Variables

1. Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```
2. Add the following environment variables to the `.env` file:
   ```env
   SLACK_BOT_OAUTH_TOKEN=your-bot-user-oauth-token
   SLACK_SIGNING_SECRET=your-signing-secret
   SLACK_API_TOKEN=your-app-token
   SLACK_DEBUG=true
   PORT=3000
   ```

### Step 4: Install Dependencies

```bash
npm install
```

### Step 5: Run the Bot in the Background

To run the bot in the background, use **PM2**, a process manager for Node.js applications.

#### Install PM2

Install PM2 globally on your system:

```bash
npm install -g pm2
```

#### Start the Bot

Start the bot using PM2:

```bash
pm2 start src/index.js --name lunchbuddy
```

#### Save the PM2 Process List

Save the PM2 process list to ensure it restarts automatically after a system reboot:

```bash
pm2 save
```

#### Enable PM2 Startup Script

Generate and configure a startup script for PM2 to run on system boot:

```bash
pm2 startup
```

#### Monitor the Bot

- View logs:
  ```bash
  pm2 logs lunchbuddy
  ```
- Check the status of the bot:
  ```bash
  pm2 status
  ```

#### Stop or Restart the Bot

- To stop the bot:
  ```bash
  pm2 stop lunchbuddy
  ```
- To restart the bot:
  ```bash
  pm2 restart lunchbuddy
  ```

### Step 6: Invite the Bot to a Channel

Invite the bot to a Slack channel by typing:

```bash
@<your-bot-name>
```

Or start a direct message with the bot.

---

## Running Tests

```bash
npm test
```
