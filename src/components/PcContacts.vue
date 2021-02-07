<template>
  <div class="pc-contacts">
    <div
      v-for="section in sections"
      :key="section.id"
      class="pc-contacts__section"
    >
      <h1 class="pc-contacts__section-title">{{ section.title }}</h1>
      <ul>
        <li
          v-for="contact in section.contacts"
          :key="contact.id"
          class="pc-contacts__section-contact"
        >
          <span class="pc-contacts__section-contact-name">{{
            contact.name
          }}</span>
          <span
            v-if="contact.companyName"
            class="pc-contacts__section-contact-company-name"
            >{{ contact.companyName }}</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sections: {
      type: Array,
      required: true,
      validator: function(sections) {
        return sections.every(
          e => e.id && e.title && Array.isArray(e.contacts)
        );
      }
    }
  }
};
</script>

<style></style>
