<template>
  <div :class="['ticket-card', { 'featured-card': ticket.featured }]">
    <span v-if="ticket.featured" class="badge-featured">Most Popular</span>

    <div class="card-header">
      <h3>{{ ticket.name }}</h3>
      <p class="description">{{ ticket.description }}</p>
    </div>

    <div class="card-price">
      <span class="currency">R</span>
      <span class="amount">{{ ticket.price }}</span>
    </div>

    <ul class="benefits-list">
      <li v-for="(benefit, index) in ticket.benefits" :key="index">
        ✓ {{ benefit }}
      </li>
    </ul>

    <div class="card-actions">
      <button
        @click="$emit('toggle-favourite', ticket.id)"
        :class="['btn-fav', { 'is-fav': ticket.isFavourite }]"
      >
        {{ ticket.isFavourite ? "❤️ Favourited" : "🤍 Favourite" }}
      </button>

      <button class="btn-buy">Buy Ticket</button>
    </div>
  </div>
</template>

<script setup>
// Defining the prop object structure passed down from App.vue
defineProps({
  ticket: {
    type: Object,
    required: true,
  },
});

// Emitting the click choice event back to the parent data state array
defineEmits(["toggle-favourite"]);
</script>

<style scoped>
.ticket-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2.2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

/* Optional Stretch Goal Hover Effect Animation */
.ticket-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

/* Distinct styling targeting the featured card tier */
.featured-card {
  border: 2.5px solid #ff6b6b;
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.15);
}

.badge-featured {
  position: absolute;
  top: -12px;
  right: 24px;
  background: #ff6b6b;
  color: white;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #1a202c;
}

.description {
  color: #718096;
  font-size: 0.95rem;
  line-height: 1.4;
  margin: 0;
}

.card-price {
  margin: 1.5rem 0;
  color: #1a202c;
}

.currency {
  font-size: 1.5rem;
  font-weight: bold;
  vertical-align: top;
  margin-right: 2px;
}

.amount {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -1px;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  text-align: left;
}

.benefits-list li {
  margin-bottom: 0.75rem;
  color: #4a5568;
  font-size: 0.95rem;
}

.card-actions {
  display: flex;
  gap: 12px;
}

.btn-buy {
  flex: 1;
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.btn-buy:hover {
  background: #fa5252;
}

.btn-fav {
  background: #f1f5f9;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  color: #4a5568;
  transition: all 0.2s;
}

.btn-fav:hover {
  background: #e2e8f0;
}

/* Dynamic design variation when selected as favourite */
.btn-fav.is-fav {
  background: #ffe3e3;
  color: #ff6b6b;
  font-weight: bold;
}
</style>
