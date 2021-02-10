<template>
  <div class="pc-contacts">
    <h1 class="pc-contacts__title">{{ titleContactList }}</h1>
    <div
      v-for="section in sectionsOrderedAlphabetically"
      :key="section.id"
      class="pc-contacts__section"
    >
      <h2 class="pc-contacts__section-title">{{ section.title }}</h2>
      <ul>
        <li
          v-for="contact in section.contacts"
          :key="contact.id"
          class="pc-contacts__section-contact"
          @click="$emit('contactWasSelected', contact)"
        >
          <img
            class="pc-contacts__section-contact-img"
            :srcset="smallImage(contact.smallImageURL)"
            alt=""
          />
          <span
            v-if="contact.isFavorite"
            class="pc-contacts__section-contact-favorite"
            >⭐</span
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
    titleContactList: {
      type: String,
      default: "Contacts"
    },
    sections: {
      type: Array,
      required: true,
      validator: function(sections) {
        return sections.every(
          e => e.id && e.title && Array.isArray(e.contacts)
        );
      }
    },
    defaultContactImages: {
      type: Array,
      validator: function(defaultContactImages) {
        const isAString = e => typeof e === "string";
        return (
          defaultContactImages.length && defaultContactImages.every(isAString)
        );
      }
    }
  },
  computed: {
    sectionsOrderedAlphabetically() {
      const sections = [...this.sections];
      for (const section of this.sections) {
        section.contacts.sort(function(a, b) {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      }
      return sections;
    }
  },
  methods: {
    smallImage(ImageURL) {
      const defaultContactImages = this.defaultContactImages?.length
        ? this.defaultContactImages.join(" ,")
        : "";
      return ImageURL || defaultContactImages;
    }
  }
};
</script>

<style lang="sass" scoped>
.pc-contacts
  color: #34353b
  border: 1px solid #ececec
  .pc-contacts__title
    border-bottom: 1px solid #ececec
    background-color: #F9F9F9
    font-size: 18px
    text-align: center
    padding: 25px 0 12px
  .pc-contacts__section-title
    background-color: #f4f4f4
    font-size: 14px
    padding: 8px 15px
</style>
