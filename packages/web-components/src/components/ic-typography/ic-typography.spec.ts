import { newSpecPage } from "@stencil/core/testing";
import { Typography } from "./ic-typography";

describe("ic-typography component", () => {
  it("should render with default body styles", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography>IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render h1 with h1 variant", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography variant="h1">IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render h2 with h2 variant", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography variant="h2">IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render h3 with h3 variant", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography variant="h3">IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render h4 with h4 variant", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography variant="h4">IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render h5 with subtitle-large variant", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography variant="subtitle-large">IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render h6 with subtitle-small variant", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography variant="subtitle-small">IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render with body variant", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography variant="body">IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render caption variant", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography variant="caption">IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render caption uppercase variant", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography variant="caption-uppercase">IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render label with label variant", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography variant="label">IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render label uppercase with label-uppercase variant", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography variant="label-uppercase">IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render code large with code-large variant", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography variant="code-large">IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render code small with code-small variant", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography variant="code-small">IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render code extra small with code-extra-small variant", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography variant="code-extra-small">IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should allow semantic component to be passed in and variant styling applied", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography variant="h1"><h3>IC Typography Test</h3></ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should apply vertical margins class if vertical margins prop true", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography apply-vertical-margins>IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should apply className provided to root element to typography element", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography class="test-class">IC Typography Test</ic-typography>`,
    });

    expect(page.root).toMatchSnapshot();
  });
  it("should render the typography with truncation and click the button twice", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography max-lines="2">IC Typography Test</ic-typography>`,
    });

    const btn = await page.root.shadowRoot.querySelector("button");

    btn.click();

    page.waitForChanges();

    btn.click();

    page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it("should render the typography with truncation and click the button once", async () => {
    const page = await newSpecPage({
      components: [Typography],
      html: `<ic-typography max-lines="2">IC Typography Test</ic-typography>`,
      autoApplyChanges: true,
    });

    const btn = page.root.shadowRoot.querySelector(".trunc-btn") as HTMLElement;

    btn.click();

    expect(page.rootInstance.expanded).toBeTruthy();
  });
});
