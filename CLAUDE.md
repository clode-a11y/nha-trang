# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/claude-code) when working with code in this repository.

## Project Overview

Nha Trang Rentals — a website for long-term apartment rentals in Nha Trang, Vietnam. The site serves as a lead generation platform for a real estate agent (rieltор), connecting Russian-speaking and international clients with rental properties.

## Business Model

- **Agent Model**: The site owner (agent) works with Vietnamese realtors who have access to apartments
- **No Direct Booking**: Clients submit viewing requests or video call requests, then agent arranges with Vietnamese realtors
- **Single City Focus**: Only Nha Trang, organized by districts
- **Multi-language**: Russian (primary), English, Vietnamese

## Key Features (Killer Features)

1. **Viewing Request** — client requests in-person apartment viewing
2. **Video Call from Apartment** — remote showing for clients not yet in Nha Trang
3. **Availability Status** — "Available now" vs "Available from [date]" (current tenants)
4. **Showing Possibility Flag** — some apartments can't be shown (tenants don't allow)
5. **Districts as Main Navigation** — instead of cities, filter by Nha Trang districts

## Architecture Decisions

- **Single Site, Modular Structure** — start with rentals, expand later (visas, blog, etc.)
- **Airbnb-like UX** — proven patterns, horizontal card sliders by district
- **Admin Panel** — all content (districts, apartments) managed dynamically
- **Favorites**: localStorage for guests, database for registered users

## Tech Stack

To be decided. Likely:
- Frontend: Next.js / React
- Styling: Tailwind CSS
- Backend: TBD
- Database: TBD
- Hosting: TBD

## Documentation

See `/docs` folder for detailed specifications:
- `docs/user-stories.md` — user stories by page
- `docs/data-models.md` — entities and relationships
- `docs/pages.md` — page structure and components

## Commands

TBD — will be added when project is initialized.
