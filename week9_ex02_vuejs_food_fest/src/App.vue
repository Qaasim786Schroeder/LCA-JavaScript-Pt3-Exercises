<template>
  <div class="app-container">
    <header class="hero-header">
      <span class="event-tag">Annual Outdoor Event</span>
      <h1>Cape Town Food Fest 2026</h1>
      <p class="event-desc">
        Join us for a spectacular weekend of culinary delight. Explore our
        ticket choices below!
      </p>

      <div class="tracker-badge">
        ❤️ Saved Tiers: <span class="counter-num">{{ favouriteCount }}</span>
      </div>
    </header>

    <main class="tickets-grid">
      <TicketCard
        v-for="ticket in tickets"
        :key="ticket.id"
        :ticket="ticket"
        @toggle-favourite="handleFavouriteToggle"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TicketCard from "./components/TicketCard.vue";

const tickets = ref([
  {
    id: 1,
    name: "Bronze Pass",
    price: 150,
    description: "Access to street food vendors and standard open lawn areas.",
    benefits: [
      "Access to all general vendor zones",
      "Standard unreserved lawn seating",
      "1x Complimentary soft drink",
    ],
    featured: false,
    isFavourite: false,
  },
  {
    id: 2,
    name: "Silver Pass",
    price: 350,
    description:
      "Includes entry to professional chef tasting sessions and masterclasses.",
    benefits: [
      "All Bronze Pass areas included",
      "Entry to 2 Live Chef Masterclasses",
      "3x Free food vendor tokens",
      "Priority entrance lanes",
    ],
    featured: true,
    isFavourite: false,
  },
  {
    id: 3,
    name: "Gold VIP Pass",
    price: 750,
    description:
      "All-access luxury pass with entry to premium private bars and lounges.",
    benefits: [
      "All Silver Pass benefits included",
      "Access to private VIP Lounges",
      "Unlimited premium beverage tasting",
      "Exclusive chef meet-and-greets",
    ],
    featured: false,
    isFavourite: false,
  },
]);

const handleFavouriteToggle = (id) => {
  const targetCard = tickets.value.find((t) => t.id === id);
  if (targetCard) {
    targetCard.isFavourite = !targetCard.isFavourite;
  }
};

const favouriteCount = computed(() => {
  return tickets.value.filter((t) => t.isFavourite).length;
});
</script>

<style>
body {
  margin: 0;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  background-color: #f8fafc;
  color: #0f172a;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.hero-header {
  text-align: center;
  margin-bottom: 3rem;
}

.event-tag {
  color: #ff6b6b;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

.hero-header h1 {
  font-size: 2.5rem;
  margin: 0.5rem 0;
}

.event-desc {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.tracker-badge {
  display: inline-block;
  background: #1e293b;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: bold;
}

.counter-num {
  color: #ff6b6b;
}

.tickets-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .tickets-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .tickets-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
