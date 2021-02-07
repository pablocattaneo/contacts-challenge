import { shallowMount } from "@vue/test-utils";
import PcContacts from "@/components/PcContacts";

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(PcContacts);
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
});
