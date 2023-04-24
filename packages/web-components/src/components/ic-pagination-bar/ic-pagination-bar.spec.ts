import { PaginationBar } from "./ic-pagination-bar";
import { Pagination } from "../ic-pagination/ic-pagination";
import { Button } from "../ic-button/ic-button";
import { newSpecPage } from "@stencil/core/testing";

describe("ic-pagination-bar", () => {
  it("should render", async () => {
    const page = await newSpecPage({
      components: [PaginationBar],
      html: `<ic-pagination-bar total-items="100"></ic-pagination-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render with items per page controls", async () => {
    const page = await newSpecPage({
      components: [PaginationBar],
      html: `<ic-pagination-bar total-items="100" show-items-per-page-control="true"></ic-pagination-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render with go to page controls", async () => {
    const page = await newSpecPage({
      components: [PaginationBar],
      html: `<ic-pagination-bar total-items="100" show-go-to-page-control="true"></ic-pagination-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render with data pagination type", async () => {
    const page = await newSpecPage({
      components: [PaginationBar],
      html: `<ic-pagination-bar total-items="100" pagination-type="data"></ic-pagination-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render with complex pagination controls", async () => {
    const page = await newSpecPage({
      components: [PaginationBar],
      html: `<ic-pagination-bar total-items="100" pagination-controls="complex"></ic-pagination-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render with a custom page label", async () => {
    const page = await newSpecPage({
      components: [PaginationBar],
      html: `<ic-pagination-bar total-items="100" page-label="Sheets"></ic-pagination-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render with a custom item label", async () => {
    const page = await newSpecPage({
      components: [PaginationBar],
      html: `<ic-pagination-bar total-items="100" pagination-type="data" item-label="Rows"></ic-pagination-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render with left alignment", async () => {
    const page = await newSpecPage({
      components: [PaginationBar],
      html: `<ic-pagination-bar total-items="100" alignment="left"></ic-pagination-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render with space between alignment", async () => {
    const page = await newSpecPage({
      components: [PaginationBar],
      html: `<ic-pagination-bar total-items="100" alignment="space-between"></ic-pagination-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render with light appearance", async () => {
    const page = await newSpecPage({
      components: [PaginationBar],
      html: `<ic-pagination-bar total-items="100" appearance="light"></ic-pagination-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render with dark appearance", async () => {
    const page = await newSpecPage({
      components: [PaginationBar],
      html: `<ic-pagination-bar total-items="100" apperance="dark"></ic-pagination-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it("should render with custom items per page options", async () => {
    const page = await newSpecPage({
      components: [PaginationBar],
      html: `<ic-pagination-bar total-items="100" show-items-per-page-control="true"></ic-pagination-bar>`,
    });

    const paginationBar = document.querySelector("ic-pagination-bar");

    paginationBar.itemsPerPageOptions = [
      { label: "15", value: "15" },
      { label: "30", value: "30" },
      { label: "60", value: "60" },
      { label: "All", value: "100" },
    ];

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  it("should only allow a maximum of 4 custom items per page options", async () => {
    const page = await newSpecPage({
      components: [PaginationBar],
      html: `<ic-pagination-bar total-items="150" show-items-per-page-control="true"></ic-pagination-bar>`,
    });

    const paginationBar = document.querySelector("ic-pagination-bar");

    paginationBar.itemsPerPageOptions = [
      { label: "25", value: "25" },
      { label: "50", value: "50" },
      { label: "75", value: "75" },
      { label: "100", value: "100" },
      { label: "All", value: "150" },
    ];

    page.rootInstance.trimItemsPerPageOptions();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  it("should remove items per page options larger than the maximum number of items", async () => {
    const page = await newSpecPage({
      components: [PaginationBar],
      html: `<ic-pagination-bar total-items="100" show-items-per-page-control="true"></ic-pagination-bar>`,
    });

    const paginationBar = document.querySelector("ic-pagination-bar");

    paginationBar.itemsPerPageOptions = [
      { label: "25", value: "25" },
      { label: "50", value: "50" },
      { label: "150", value: "150" },
      { label: "All", value: "100" },
    ];

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  it("should adjust the total page count when items per page is changed", async () => {
    const page = await newSpecPage({
      components: [PaginationBar, Pagination],
      html: `<ic-pagination-bar total-items="100" show-items-per-page-control="true"></ic-pagination-bar>`,
    });

    const paginationBar = document.querySelector("ic-pagination-bar");

    const select = paginationBar.shadowRoot.querySelector("ic-select");

    const text = paginationBar.shadowRoot.querySelector(
      ".page-pagination-label"
    );

    expect(text.textContent).toEqual("Page 1 of 10");

    select.value = "25";

    page.rootInstance.changeItemsPerPage();

    page.rootInstance.setNumberPages();

    await page.waitForChanges();

    expect(select.value).toEqual("25");

    expect(text.textContent).toEqual("Page 1 of 4");
  });

  it("should change page when the pagination controls are clicked", async () => {
    const page = await newSpecPage({
      components: [PaginationBar, Pagination, Button],
      html: `<ic-pagination-bar total-items="100"></ic-pagination-bar>`,
    });

    const paginationBar = document.querySelector("ic-pagination-bar");

    const pagination = paginationBar.shadowRoot.querySelector("ic-pagination");

    const nextButton = pagination.shadowRoot.querySelector(
      "#next-page-button"
    ) as HTMLElement;

    const text = paginationBar.shadowRoot.querySelector(
      ".page-pagination-label"
    );

    expect(text.textContent).toEqual("Page 1 of 10");

    await nextButton.click();

    page.rootInstance.changePage(2);

    await page.waitForChanges();

    expect(text.textContent).toEqual("Page 2 of 10");
  });

  it("should change page when the go to page button is clicked", async () => {
    const page = await newSpecPage({
      components: [PaginationBar, Pagination],
      html: `<ic-pagination-bar total-items="100" show-go-to-page-control="true"></ic-pagination-bar>`,
    });

    const paginationBar = document.querySelector("ic-pagination-bar");

    const input = paginationBar.shadowRoot.querySelector("ic-text-field");

    const button = paginationBar.shadowRoot.querySelector("ic-button");

    const text = paginationBar.shadowRoot.querySelector(
      ".page-pagination-label"
    );

    const currentPage = page.rootInstance.currentPage;

    expect(text.textContent).toEqual("Page 1 of 10");

    expect(currentPage).toEqual(1);

    input.value = "3";

    button.click();

    await page.waitForChanges();

    expect(text.textContent).toEqual("Page 3 of 10");
  });

  it("should change page when enter is pressed on the go to page input", async () => {
    const page = await newSpecPage({
      components: [PaginationBar, Pagination],
      html: `<ic-pagination-bar total-items="100" show-go-to-page-control="true"></ic-pagination-bar>`,
    });

    const paginationBar = document.querySelector("ic-pagination-bar");

    const input = paginationBar.shadowRoot.querySelector("ic-text-field");

    const text = paginationBar.shadowRoot.querySelector(
      ".page-pagination-label"
    );

    const currentPage = page.rootInstance.currentPage;

    const event = new KeyboardEvent("keydown", { key: "Enter" });

    expect(text.textContent).toEqual("Page 1 of 10");

    expect(currentPage).toEqual(1);

    input.value = "3";

    input.focus();

    page.rootInstance.handleKeydown(event);

    await page.waitForChanges();

    expect(text.textContent).toEqual("Page 3 of 10");
  });
});
