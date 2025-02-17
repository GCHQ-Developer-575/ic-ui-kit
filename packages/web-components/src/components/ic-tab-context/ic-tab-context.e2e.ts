import { newE2EPage } from "@stencil/core/testing";

const testTabs = `
<ic-tab-context>
  <ic-tab-group label="Tabs e2e label">
    <ic-tab>Tab 1</ic-tab>
    <ic-tab>Tab 2</ic-tab>
    <ic-tab>Tab 3</ic-tab>
  </ic-tab-group>
  <ic-tab-panel>Tab panel 1</ic-tab-panel>
  <ic-tab-panel>Tab panel 2</ic-tab-panel>
  <ic-tab-panel>Tab panel 3</ic-tab-panel>
</ic-tab-context>
`;

describe("ic-tab-context component", () => {
  it("should display a tab panel when its corresponding tab is clicked", async () => {
    const page = await newE2EPage({ html: testTabs });
    const tab1 = await page.find('ic-tab[tab-id="ic-tab--1-context-default"]');
    await tab1.click();
    await page.waitForChanges();
    const tabPanel1 = await page.find(
      'ic-tab-panel[panel-id="ic-tab--1-context-default"]'
    );
    expect(tabPanel1).not.toHaveAttribute("hidden");
  });

  it("should hide the other tab panels when a tab is clicked", async () => {
    const page = await newE2EPage({ html: testTabs });
    const tab1 = await page.find('ic-tab[tab-id="ic-tab--1-context-default"]');
    await tab1.click();
    await page.waitForChanges();
    const tabPanel0 = await page.find(
      'ic-tab-panel[panel-id="ic-tab--0-context-default"]'
    );
    const tabPanel2 = await page.find(
      'ic-tab-panel[panel-id="ic-tab--2-context-default"]'
    );
    expect(tabPanel0).toHaveAttribute("hidden");
    expect(tabPanel2).toHaveAttribute("hidden");
  });

  it("should move focus to the next tab when the right arrow key is pressed", async () => {
    const page = await newE2EPage({ html: testTabs });
    const tab0 = await page.find('ic-tab[tab-id="ic-tab--0-context-default"]');
    await tab0.click();
    await page.waitForChanges();
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    const activeElement = await page.evaluate(() => document.activeElement.id);
    expect(activeElement).toEqual("ic-tab-1-context-default");
  });

  it("should move focus to the previous tab when the left arrow key is pressed", async () => {
    const page = await newE2EPage({ html: testTabs });
    const tab1 = await page.find('ic-tab[tab-id="ic-tab--1-context-default"]');
    await tab1.click();
    await page.waitForChanges();
    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    const activeElement = await page.evaluate(() => document.activeElement.id);
    expect(activeElement).toEqual("ic-tab-0-context-default");
  });

  it("should move focus to the first tab when the right arrow key is pressed if currently on the last tab", async () => {
    const page = await newE2EPage({ html: testTabs });
    const tab2 = await page.find('ic-tab[tab-id="ic-tab--2-context-default"]');
    await tab2.click();
    await page.waitForChanges();
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    const activeElement = await page.evaluate(() => document.activeElement.id);
    expect(activeElement).toEqual("ic-tab-0-context-default");
  });

  it("should move focus to the last tab when the left arrow key is pressed if currently on the first tab", async () => {
    const page = await newE2EPage({ html: testTabs });
    const tab0 = await page.find('ic-tab[tab-id="ic-tab--0-context-default"]');
    await tab0.click();
    await page.waitForChanges();
    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    const activeElement = await page.evaluate(() => document.activeElement.id);
    expect(activeElement).toEqual("ic-tab-2-context-default");
  });

  it("should move focus to the first tab when the Home key is pressed", async () => {
    const page = await newE2EPage({ html: testTabs });
    const tab2 = await page.find('ic-tab[tab-id="ic-tab--2-context-default"]');
    await tab2.click();
    await page.waitForChanges();
    await page.keyboard.press("Home");
    await page.waitForChanges();
    const activeElement = await page.evaluate(() => document.activeElement.id);
    expect(activeElement).toEqual("ic-tab-0-context-default");
  });

  it("should move focus to the last tab when the End key is pressed", async () => {
    const page = await newE2EPage({ html: testTabs });
    const tab0 = await page.find('ic-tab[tab-id="ic-tab--0-context-default"]');
    await tab0.click();
    await page.waitForChanges();
    await page.keyboard.press("End");
    await page.waitForChanges();
    const activeElement = await page.evaluate(() => document.activeElement.id);
    expect(activeElement).toEqual("ic-tab-2-context-default");
  });

  it("should not allow a disabled tab to be selected", async () => {
    const page = await newE2EPage({
      html: `
    <ic-tab-context>
      <ic-tab-group label="Tabs e2e label">
        <ic-tab>Tab 1</ic-tab>
        <ic-tab disabled>Tab 2</ic-tab>
        <ic-tab>Tab 3</ic-tab>
      </ic-tab-group>
      <ic-tab-panel>Tab panel 1</ic-tab-panel>
      <ic-tab-panel>Tab panel 2</ic-tab-panel>
      <ic-tab-panel>Tab panel 3</ic-tab-panel>
    </ic-tab-context>
    `,
    });
    const tab0 = await page.find('ic-tab[tab-id="ic-tab--0-context-default"]');
    await tab0.click();
    await page.waitForChanges();
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    const activeElement = await page.evaluate(() => document.activeElement.id);
    expect(activeElement).toEqual("ic-tab-2-context-default");
  });

  it("should display the tab panels automatically using the arrow keys when using automatic activation", async () => {
    const page = await newE2EPage({ html: testTabs });
    const tab0 = await page.find('ic-tab[tab-id="ic-tab--0-context-default"]');
    await tab0.click();
    await page.waitForChanges();
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    const tabPanel0 = await page.find(
      'ic-tab-panel[panel-id="ic-tab--0-context-default"]'
    );
    const tabPanel1 = await page.find(
      'ic-tab-panel[panel-id="ic-tab--1-context-default"]'
    );
    const tabPanel2 = await page.find(
      'ic-tab-panel[panel-id="ic-tab--2-context-default"]'
    );
    expect(tabPanel0).toHaveAttribute("hidden");
    expect(tabPanel1).not.toHaveAttribute("hidden");
    expect(tabPanel2).toHaveAttribute("hidden");
  });

  it("should not display the tab panels automatically using the arrow keys when using manual activation", async () => {
    const page = await newE2EPage({
      html: `
    <ic-tab-context activation-type="manual">
      <ic-tab-group label="Tabs e2e label">
        <ic-tab>Tab 1</ic-tab>
        <ic-tab>Tab 2</ic-tab>
        <ic-tab>Tab 3</ic-tab>
      </ic-tab-group>
      <ic-tab-panel>Tab panel 1</ic-tab-panel>
      <ic-tab-panel>Tab panel 2</ic-tab-panel>
      <ic-tab-panel>Tab panel 3</ic-tab-panel>
    </ic-tab-context>
    `,
    });
    const tab0 = await page.find('ic-tab[tab-id="ic-tab--0-context-default"]');
    await tab0.click();
    await page.waitForChanges();
    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    const tabPanel0 = await page.find(
      'ic-tab-panel[panel-id="ic-tab--0-context-default"]'
    );
    const tabPanel1 = await page.find(
      'ic-tab-panel[panel-id="ic-tab--1-context-default"]'
    );
    const tabPanel2 = await page.find(
      'ic-tab-panel[panel-id="ic-tab--2-context-default"]'
    );
    expect(tabPanel0).not.toHaveAttribute("hidden");
    expect(tabPanel1).toHaveAttribute("hidden");
    expect(tabPanel2).toHaveAttribute("hidden");
  });

  it("should set the selected tab in controlled mode to be the value that is passed in", async () => {
    const page = await newE2EPage({
      html: `
    <ic-tab-context selected-tab-index="1">
      <ic-tab-group label="Tabs e2e label">
        <ic-tab>Tab 1</ic-tab>
        <ic-tab>Tab 2</ic-tab>
        <ic-tab>Tab 3</ic-tab>
      </ic-tab-group>
      <ic-tab-panel>Tab panel 1</ic-tab-panel>
      <ic-tab-panel>Tab panel 2</ic-tab-panel>
      <ic-tab-panel>Tab panel 3</ic-tab-panel>
    </ic-tab-context>
    `,
    });
    const tabPanel1 = await page.find(
      'ic-tab-panel[panel-id="ic-tab--1-context-default"]'
    );
    expect(tabPanel1).not.toHaveAttribute("hidden");
  });

  it("should call icTabSelect event in controlled mode when clicked", async () => {
    const page = await newE2EPage({
      html: `
    <ic-tab-context selected-tab-index="1">
      <ic-tab-group label="Tabs e2e label">
        <ic-tab>Tab 1</ic-tab>
        <ic-tab>Tab 2</ic-tab>
        <ic-tab>Tab 3</ic-tab>
      </ic-tab-group>
      <ic-tab-panel>Tab panel 1</ic-tab-panel>
      <ic-tab-panel>Tab panel 2</ic-tab-panel>
      <ic-tab-panel>Tab panel 3</ic-tab-panel>
    </ic-tab-context>
    `,
    });
    const tab1 = await page.find('ic-tab[tab-id="ic-tab--1-context-default"]');
    const tabSelect = await page.spyOnEvent("icTabSelect");
    await tab1.click();
    await page.waitForChanges();
    expect(tabSelect).toHaveReceivedEventDetail({
      tabIndex: 1,
    });
  });
});
