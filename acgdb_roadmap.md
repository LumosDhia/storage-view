# Roadmap: Building and Deploying an OpenList-Powered Media Database

This roadmap details the end-to-end journey of creating a file-hosting platform similar to ACGDB. It walks you through spinning up the cloud storage architecture, installing the OpenList web application, configuring a secure proxy, and setting up an automated Telegram Bot for sponsors.

---

## Phase 1: Infrastructure & Storage Planning
*The foundation of your database begins with securing limitless, low-cost cloud storage.*

### 1. Purchase a Domain Name
* Buy a domain name on platforms like Namecheap or Porkbun (e.g., `my-anime-db.net`).
* Point the domain's nameservers to **Cloudflare** for DNS management.

### 2. Configure Cloud Storage
* Instead of buying physical hard drives, register for **Google Workspace** (Enterprise/Business) or acquire existing high-tier Google Drive accounts.
* Create a **Shared Drive** (Team Drive) which separates your archival data from your personal Drive quota.
* Upload a test batch of media files organized into clean folder structures (e.g., `/Anime/`, `/Galgames/`, `/Manga/`).

---

## Phase 2: Deploying the OpenList Core
*OpenList acts as both your backend indexer and your SolidJS-powered frontend.*

### 1. Rent a Virtual Private Server (VPS)
* Purchase a cheap Linux VPS (Ubuntu 22.04) from a popular host like **Hetzner**, **DigitalOcean**, or **AWS Lightsail** (costing ~$5-$10/month).
* Connect to your VPS via SSH.

### 2. Install OpenList via Docker
* Install Docker and Docker Compose on your VPS.
* Pull the official OpenList docker image. Using Docker ensures your deployment remains isolated and easy to update.
* Run the container mapping the internal container port (usually `5244`) to a port on your VPS.

### 3. Connect OpenList to Google Drive
* Log into the OpenList admin dashboard via your VPS IP: `http://<VPS_IP>:5244`.
* Navigate to the **Storage** section and add a new drive.
* Select "Google Drive" and input your Google Drive API credentials (Client ID, Client Secret, and Refresh Token obtained via the Google Cloud Console).
* Set the Root Folder ID to the ID of your Shared Drive. Your files will instantly appear in the OpenList web interface.

---

## Phase 3: Networking & Security
*A media site needs robust security and clean URLs to handle high traffic and prevent IP bans.*

### 1. Setup Nginx Reverse Proxy
* Install **Nginx** on your VPS.
* Configure an Nginx server block to proxy traffic from port `80/443` (HTTP/HTTPS) to your OpenList internal port `5244`.
* This converts your domain `my-anime-db.net` to properly display the OpenList interface without showing the port number.

### 2. SSL and HTTPS
* Use **Certbot** (Let's Encrypt) to generate a free SSL certificate for your Nginx proxy, ensuring all file transfers are encrypted.

### 3. Cloudflare Protection
* In your Cloudflare dashboard, ensure the "Proxy" status (the orange cloud) is enabled for your domain.
* Configure Cloudflare's **Web Application Firewall (WAF)** and caching rules to intercept bot attacks and serve static site assets from the edge, saving your VPS bandwidth.

---

## Phase 4: Automation & Monetization
*If you plan to scale dynamically, you must automate the process of adding VIPs/Sponsors directly to Google Drive.*

### 1. Configure the Google Admin SDK
* In the Google Cloud Console, enable the **Admin SDK API** and generate a Service Account JSON key. This allows programmatic control over who has access to your Shared Drive.

### 2. Build the Telegram Bot
* Write a bot using Python (`python-telegram-bot`) or Node.js (`node-telegram-bot-api`).
* **Workflow:**
  1. User triggers `/donate` or `/addvalue`.
  2. The bot provides payment links (Stripe, Patreon API integration, or crypto addresses).
  3. User provides proof of payment (Transaction ID) and their Gmail address.
  4. Bot reads the Google Service Account JSON and automatically adds the user's Gmail to the Google Shared Drive with "Viewer" permissions.

### 3. Deploy the Bot
* Run the Telegram bot continuously on your VPS using a process manager like **PM2** (Node.js) or **Systemd** (Python) so it stays alive 24/7.

---

## Phase 5: Customization & Launch
*The final polish gives you the exact look and feel required.*

### 1. Theme Configuration
* Dive into the OpenList dashboard to configure branding. Modify custom headers, inject arbitrary CSS if needed, and configure features like Dark Mode.

### 2. Performance Tuning
* Test streaming capabilities. OpenList natively uses ArtPlayer.js, so ensure video proxy settings are optimal depending on Cloudflare caching rules.

### 3. Community Building
* Launch a public Telegram channel or Discord for announcements, linking them prominently on the site's homepage or OpenList's custom `README.md` block on the root folder.
