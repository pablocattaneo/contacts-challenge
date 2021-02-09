import { shallowMount } from "@vue/test-utils";
import PcContacts from "@/components/PcContacts";

const requiredProps = {
  defaultContactImage: { default: "@/assets/user/default.jpg" }
};
let wrapper;
beforeEach(() => {
  wrapper = shallowMount(PcContacts, {
    ...requiredProps,
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
              companyName: "Soda Stereo",
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
  describe("sections", () => {
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
    test("The props sections was set to with a sections with the props contacts the objects with name Jhon Lennon, Gustavo Cerati and B.B. King so 3 .pc-contacts__section-contact-name should be render alphabetically, ", () => {
      wrapper = shallowMount(PcContacts, {
        propsData: {
          requiredProps,
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
                },
                {
                  smallImageURL: "",
                  defaultImage: "",
                  name: "B.B. King",
                  id: "5",
                  companyName: "Blues Corp",
                  isFavorite: true
                }
              ]
            }
          ]
        }
      });
      const sectionsContactName = wrapper.findAll(
        ".pc-contacts__section-contact-name"
      );
      expect(sectionsContactName.at(0).text()).toBe("B.B. King");
      expect(sectionsContactName.at(1).text()).toBe("Gustavo Cerati");
      expect(sectionsContactName.at(2).text()).toBe("Jhon Lennon");
    });
    test("The props sections was set to with a sections with the props contacts with the first object with smallImageURL https://my-server/user-small.jpg so component .pc-contacts__section-contact-img should be rendered with img srcset attribute with that value.", () => {
      wrapper = shallowMount(PcContacts, {
        ...requiredProps,
        propsData: {
          sections: [
            {
              id: 1,
              title: "FAVORITE CONTACTS",
              contacts: [
                {
                  smallImageURL: "https://my-server/user-small.jpg",
                  defaultImage: "",
                  name: "Jhon Lennon",
                  id: "1",
                  companyName: "Apple Corps",
                  isFavorite: true
                }
              ]
            }
          ]
        }
      });
      expect(
        wrapper.find(".pc-contacts__section-contact-img").attributes("srcset")
      ).toBe(wrapper.vm.$props.sections[0].contacts[0].smallImageURL);
    });

    test("The props sections was set with a sections with the props contacts wich the first object has the property isFavorite set to true so elemnt .pc-contacts__section-contact-favorite should be rendered", () => {
      wrapper = shallowMount(PcContacts, {
        ...requiredProps,
        propsData: {
          sections: [
            {
              id: 1,
              title: "FAVORITE CONTACTS",
              contacts: [
                {
                  smallImageURL: "https://my-server/user-small.jpg",
                  defaultImage: "",
                  name: "Jhon Lennon",
                  id: "1",
                  companyName: "Apple Corps",
                  isFavorite: true
                }
              ]
            }
          ]
        }
      });
      expect(
        wrapper.find(".pc-contacts__section-contact-favorite").exists()
      ).toBe(true);
    });

    test("The props sections was set with a sections with the props contacts wich the first object has the property isFavorite set to true so elemnt .pc-contacts__section-contact-favorite should NOT be rendered", () => {
      wrapper = shallowMount(PcContacts, {
        ...requiredProps,
        propsData: {
          sections: [
            {
              id: 1,
              title: "FAVORITE CONTACTS",
              contacts: [
                {
                  smallImageURL: "https://my-server/user-small.jpg",
                  defaultImage: "",
                  name: "Jhon Lennon",
                  id: "1",
                  companyName: "Apple Corps",
                  isFavorite: false
                }
              ]
            }
          ]
        }
      });
      expect(
        wrapper.find(".pc-contacts__section-contact-favorite").exists()
      ).toBe(false);
    });

    test("The props sections was set with a sections with the props contacts wich the first object has the property isFavorite set to true so elemnt .pc-contacts__section-contact-favorite should be rendered with ⭐ as text", () => {
      wrapper = shallowMount(PcContacts, {
        ...requiredProps,
        propsData: {
          sections: [
            {
              id: 1,
              title: "FAVORITE CONTACTS",
              contacts: [
                {
                  smallImageURL: "https://my-server/user-small.jpg",
                  defaultImage: "",
                  name: "Jhon Lennon",
                  id: "1",
                  companyName: "Apple Corps",
                  isFavorite: true
                }
              ]
            }
          ]
        }
      });
      expect(
        wrapper.find(".pc-contacts__section-contact-favorite").text()
      ).toBe("⭐");
    });
  });

  describe("defaultContactImage", () => {
    test("The component is well formed so prop defaultContactImage should exist", () => {
      expect(wrapper.props()).toHaveProperty("defaultContactImage");
    });
    test('The props defaultContactImage was set to {default: "@/assets/user/default.jpg} so .pc-contacts__section-contact-img should be render with srcset attribute set to that value', async () => {
      wrapper = shallowMount(PcContacts, {
        ...requiredProps,
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
                }
              ]
            }
          ],
          defaultContactImage: {
            default: "@/assets/user/default.jpg",
            x2: "@/assets/user/default.jpg@x2",
            x3: "@/assets/user/default.jpg@x3"
          }
        }
      });
      expect(
        wrapper.find(".pc-contacts__section-contact-img").attributes("srcset")
      ).toBe(
        "@/assets/user/default.jpg,@/assets/user/default.jpg@x2,@/assets/user/default.jpg@x3"
      );
    });
  });
});

describe("Events", () => {
  test("The element .pc-contacts__section-contact trigger click event so event contactWasSelected should be trigger", async () => {
    const firstSection = 0;
    const firstContact = 0;
    await wrapper.find(".pc-contacts__section-contact").trigger("click");
    expect(wrapper.emitted("contactWasSelected")).toHaveLength(1);
    expect(wrapper.emitted("contactWasSelected")[0]).toEqual([
      wrapper.vm.$props.sections[firstSection].contacts[firstContact]
    ]);
  });
});
