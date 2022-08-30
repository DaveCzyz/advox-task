import { mount } from "@vue/test-utils";
import FormComponent from "../../src/components/FormComponent";

describe("FormComponent.vue", () => {
  it("add new album", async () => {
    const wrapper = mount(FormComponent, {
      global: {
        provide: {
          t: () => {},
        },
      },
    });

    await wrapper.find("input").setValue("abc");
    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("updateList")[0][0]).toMatchObject({
      album: "abc",
      favorite: false,
      created_at: {},
    });
  });
});
