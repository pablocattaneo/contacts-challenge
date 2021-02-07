import { shallowMount } from "@vue/test-utils";
import PcContacts from "@/components/PcContacts";

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(PcContacts);
});

test("Sanity test", () => {
  expect(true).toBe(true);
});
