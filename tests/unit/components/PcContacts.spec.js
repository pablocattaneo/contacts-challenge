import { shallowMount } from "@vue/test-utils";
import PcContacts from "@/components/PcContacts";

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(PcContacts, {
    propsData: {
      sections: [
        {
          id: 1,
          title: "FAVORITE CONTACTS",
          contacts: [
            {
              smallImageURL: "",
              defaultImage: "",
              name: "Jhon Lennon",
              id: "1",
              companyName: "Apple Corps",
              isFavorite: true
            },
            {
              smallImageURL: "",
              defaultImage: "",
              name: "Gustavo Cerati",
              id: "2",
              companyName: "",
              isFavorite: true
            }
          ]
        },
        {
          id: 2,
          title: "OTHER CONTACTS",
          contacts: [
            {
              smallImageURL: "",
              defaultImage: "",
              name: "Miss Piggy",
              id: "3",
              companyName: "Muppets, Bab",
              isFavorite: false
            },
            {
              smallImageURL: "",
              defaultImage: "",
              name: "Winnie-the-Pooh",
              id: "4",
              companyName: "",
              isFavorite: false
            }
          ]
        }
      ]
    }
  });
});

test("Sanity test", () => {
  expect(true).toBe(true);
});

describe("Component is well formed", () => {
  test("Component is well formed, so the 'Block' element .pc-contacts should has pc-contacts class", () => {
    expect(wrapper.find(".pc-contacts").classes()).toContain("pc-contacts");
  });
});

describe("Props", () => {
  test("The component is well formed so prop sections should exist", () => {
    expect(wrapper.props()).toHaveProperty("sections");
  });
  test("The props sections was set to with two sections so two sections should be rendered", () => {
    expect(wrapper.findAll(".pc-contacts__section")).toHaveLength(2);
  });
  test("The props sections was set to with two sections with the props title so two .pc-contacts__section-title should be rendered with this values", () => {
    const firstSection = 0;
    const secondSection = 0;
    const sectionsTitles = wrapper.findAll(".pc-contacts__section-title");
    expect(sectionsTitles.at(firstSection).text()).toContain(
      wrapper.vm.$props.sections[firstSection].title
    );
    expect(sectionsTitles.at(secondSection).text()).toContain(
      wrapper.vm.$props.sections[secondSection].title
    );
  });
  test("The props sections was set to with two sections with the props contacts so two .pc-contacts__section-contact should be rendered with this values", () => {
    expect(wrapper.findAll(".pc-contacts__section-contact")).toHaveLength(4);
  });
  test("The props sections was set to with a sections with the props contacts the first objects with name so .pc-contacts__section-contact-name should be render and contain this value", () => {
    expect(wrapper.find(".pc-contacts__section-contact-name").text()).toBe(
      wrapper.vm.$props.sections[0].contacts[0].name
    );
  });
  test("The props sections was set to with a sections with the props contacts the first objects with companyName so .pc-contacts__section-contact-company-name should be render and contain this value", () => {
    expect(
      wrapper.find(".pc-contacts__section-contact-company-name").text()
    ).toBe(wrapper.vm.$props.sections[0].contacts[0].companyName);
  });
  test("The props sections was set to with a sections with the props contacts the second objects with companyName set to empty string so .pc-contacts__section-contact-company-name should NOT be render.", async () => {
    await wrapper.setProps({
      sections: [
        {
          id: 1,
          title: "FAVORITE CONTACTS",
          contacts: [
            {
              smallImageURL: "",
              defaultImage: "",
              name: "Jhon Lennon",
              id: "1",
              companyName: "",
              isFavorite: true
            }
          ]
        }
      ]
    });
    expect(
      wrapper.find(".pc-contacts__section-contact-company-name").exists()
    ).toBe(false);
  });
});
