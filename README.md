# Player Data Platform (PDP)

A lightweight internal web tool built for player support teams to look up, inspect, and understand player account data across multiple games or user accounts — all in one place.

---

## What Is This?

**Player Data Platform** is an internal tool designed to help player support agents quickly access and review player information without needing direct database access or developer assistance.

It provides a clean, unified interface to view:

- **Core Account Info** — player identity, registration details, and account status
- **Game Progress** — level progress, milestones, and game-specific data per title
- **Currency & Inventory** — soft/hard currency balances and in-game item ownership
- **Purchase & Payment History** — transaction records and payment events
- **Ads & Reward Info** — ad engagement and reward redemption history
- **Technical Logs** — diagnostic data useful for troubleshooting player-reported issues

---

## Who Is It For?

This tool is intended for player support agents and team leads who need fast,  access to player data to resolve support tickets effectively.

---

## Tech Stack

| Layer    | Technology                    |
|----------|-------------------------------|
| Framework| React 19 (Vite)               |
| Styling  | Tailwind CSS v3               |
| Routing  | React Router v7               |
| Icons    | Lucide React                  |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Authentication

The app uses a simple login gate.(no ID and password needed). Use the provided demo account visible on the landing page to test the PDP out

---

## Notes

- All data displayed is fake or mockup to showcase the design of the PDP tool.
- This tool is just a mockup tool serve as a starting reference. 