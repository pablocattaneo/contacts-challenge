import { shallowMount } from "@vue/test-utils";
import PcContacts from "@/components/PcContacts";

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(PcContacts);
});

test("Sanity test", () => {
  expect(true).toBe(true);
});

describe("Props", () => {
  test("The component is well formed so prop sections should exist", () => {
    expect(wrapper.props()).toHaveProperty("sections");
  });
});
