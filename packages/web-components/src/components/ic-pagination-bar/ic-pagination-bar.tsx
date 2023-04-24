import {
  Component,
  Prop,
  Element,
  Event,
  EventEmitter,
  State,
  Listen,
  h,
} from "@stencil/core";
import { IcThemeForeground } from "../../interface";

@Component({
  tag: "ic-pagination-bar",
  styleUrl: "ic-pagination-bar.css",
  shadow: true,
})
export class PaginationBar {
  @Element() el: HTMLIcPaginationBarElement;

  /**
   * Emitted when a page is navigated to via the 'go to' input.
   */
  @Event() icPageChange: EventEmitter<{ value: number }>;

  /**
   * Emitted when the items per page option is changed.
   */
  @Event() icItemsPerPageChange: EventEmitter<{ value: number }>;

  private setDefaultItemsPerPageOptions = () => {
    this.itemsPerPageOptions =
      this.totalItems <= 100
        ? [
            { label: "10", value: "10" },
            { label: "25", value: "25" },
            { label: "50", value: "50" },
            { label: "All", value: String(this.totalItems) },
          ]
        : [
            { label: "25", value: "25" },
            { label: "100", value: "100" },
            { label: "1000", value: "1000" },
            { label: "All", value: String(this.totalItems) },
          ];
  };

  private trimItemsPerPageOptions = () => {
    if (
      this.itemsPerPageOptions === undefined ||
      this.itemsPerPageOptions === null
    ) {
      this.itemsPerPageOptions = this.itemsPerPageOptions.slice(0, 3);
      this.itemsPerPageOptions.push({
        label: "All",
        value: String(this.totalItems),
      });
    }

    for (let i = 0; i < this.itemsPerPageOptions.length - 1; i++) {
      if (this.totalItems < Number(this.itemsPerPageOptions[i].value)) {
        this.itemsPerPageOptions.splice(
          i,
          this.itemsPerPageOptions.length - (i + 1)
        );
      }
    }
  };

  private setDefaultItemsPerPage = () => {
    this.itemsPerPage = this.itemsPerPageOptions[0].value;
  };

  private setNumberPages = () => {
    this.totalPages = Math.ceil(this.totalItems / Number(this.itemsPerPage));
  };

  private setUpperBound = () => {
    this.upperBound = Math.min(
      this.lowerBound + Number(this.itemsPerPage) - 1,
      this.totalItems
    );
  };

  private changeItemsPerPage = () => {
    const select = this.el.shadowRoot.querySelector("ic-select");
    const value = select.value;
    this.itemsPerPage = value;
    this.setNumberPages();
    this.lowerBound = 1;
    this.setUpperBound();
    const pagination = this.el.shadowRoot.querySelector("ic-pagination");
    pagination.setCurrentPage(1);
    this.currentPage = 1;
    this.icPageChange.emit({ value: 1 });
    this.icItemsPerPageChange.emit({ value: Number(this.itemsPerPage) });
  };

  private changePage = (page: number) => {
    if (page === 1) {
      this.currentPage = 1;
      this.lowerBound = 1;
      this.setUpperBound();
    } else {
      this.currentPage = page;
      this.lowerBound = (page - 1) * Number(this.itemsPerPage) + 1;
      this.setUpperBound();
    }
  };

  private goToPage = () => {
    const input = this.el.shadowRoot.querySelector("ic-text-field");
    const page = Number(input.value);
    if (page <= this.totalPages && page > 0) {
      this.changePage(page);
      const pagination = this.el.shadowRoot.querySelector("ic-pagination");
      pagination.setCurrentPage(page);
      this.currentPage = page;
      input.value = "";
      this.icPageChange.emit({ value: page });
    }
  };

  private handleKeydown = (ev: KeyboardEvent) => {
    if (ev.key === "Enter") {
      this.goToPage();
    }
  };

  private setGoToPageInputStyles = () => {
    const textField = this.el.shadowRoot?.querySelector(".go-to-page-input");
    if (textField !== undefined) {
      const input = textField?.shadowRoot?.querySelector("input");
      if (input !== undefined) {
        input.style.textAlign = "center";
        input.style.padding = "0";
      }
    }
  };

  /**
   * Total number of items to be displayed across all pages.
   */
  @Prop() totalItems!: number;

  /**
   * Whether total number of items and current item range or total number of pages and current page is displayed.
   */
  @Prop() paginationType?: "data" | "page" = "page";

  /**
   * Whether the displayed pagination is simple or complex.
   */
  @Prop() paginationControl?: "simple" | "complex" = "simple";

  /**
   * What label will be used in place of 'items' if paginationType is data, should be capitalised.
   */
  @Prop() itemLabel?: string = "Item";

  /**
   * What label will be used in place of 'Page' if paginationType is page, should be capitalised.
   */
  @Prop() pageLabel?: string = "Page";

  /**
   * What options will be displayed for 'items per page' select input, maximum of 4 options including a required 'All' option with value equal to total number of items.
   */
  @Prop({ mutable: true }) itemsPerPageOptions?: {
    label: string;
    value: string;
  }[];

  /**
   * Whether the select input to control 'items per page' should be displayed.
   */
  @Prop() showItemsPerPageControl?: boolean = false;

  /**
   * Whether the number of total items and current item range or number of total pages and current page should be displayed.
   */
  @Prop() showItemsPerPage?: boolean = true;

  /**
   * Whether the 'go to page' control should be displayed.
   */
  @Prop() showGoToPageControl?: boolean = false;

  /**
   * Sets the alignment of the items in the pagination bar.
   */
  @Prop() alignment?: "left" | "right" | "space-between" = "right";

  /**
   * Sets the styling for the items in the pagination bar.
   */
  @Prop() appearance?: IcThemeForeground = "default";

  @Listen("icPageChange")
  pageChangeHandler(ev: CustomEvent) {
    const page = ev.detail.value;
    this.changePage(page);
  }

  @State() itemsPerPage: string;

  @State() totalPages: number;

  @State() currentPage: number = 1;

  @State() lowerBound: number = 1;

  @State() upperBound: number;

  componentWillLoad(): void {
    if (
      this.itemsPerPageOptions === undefined ||
      this.itemsPerPageOptions === null
    ) {
      this.setDefaultItemsPerPageOptions();
    }
    this.trimItemsPerPageOptions();
    this.setDefaultItemsPerPage();
    this.setNumberPages();
    this.setUpperBound();
  }

  componentDidLoad(): void {
    this.setGoToPageInputStyles();
  }

  render() {
    const {
      appearance,
      alignment,
      itemsPerPageOptions,
      paginationControl,
      paginationType,
      showItemsPerPage,
      showItemsPerPageControl,
      showGoToPageControl,
    } = this;

    return (
      <div
        class={{
          ["pagination-bar"]: true,
          [`pagination-bar-${alignment}`]: true,
        }}
      >
        {showItemsPerPage || showItemsPerPageControl ? (
          <div class="item-controls">
            {showItemsPerPageControl ? (
              <div class="items-per-page-holder">
                <ic-typography
                  class={{
                    [`pagination-text-${appearance}`]: true,
                    ["items-per-page-control-label"]: true,
                  }}
                  variant="label"
                >
                  {this.itemLabel}s per {this.pageLabel.toLowerCase()}
                </ic-typography>
                <ic-select
                  small
                  label="items-per-page-input"
                  class="items-per-page-input"
                  hideLabel
                  options={itemsPerPageOptions}
                  value={this.itemsPerPage}
                  onIcChange={() => this.changeItemsPerPage()}
                ></ic-select>
              </div>
            ) : null}
            {showItemsPerPage && paginationType === "data" ? (
              <ic-typography
                class={{
                  [`pagination-text-${appearance}`]: true,
                  ["item-pagination-label"]: true,
                }}
                variant="label"
              >
                {this.lowerBound} - {this.upperBound} of {this.totalItems}{" "}
                {this.itemLabel.toLowerCase()}s
              </ic-typography>
            ) : showItemsPerPage ? (
              <ic-typography
                class={{
                  [`pagination-text-${appearance}`]: true,
                  ["page-pagination-label"]: true,
                }}
                variant="label"
              >
                {this.pageLabel} {this.currentPage} of {this.totalPages}
              </ic-typography>
            ) : null}
          </div>
        ) : null}
        <div class="pagination-controls">
          <div class="pagination-holder">
            <ic-pagination
              appearance={appearance}
              type={paginationControl}
              pages={this.totalPages}
            ></ic-pagination>
          </div>
          {showGoToPageControl ? (
            <div class="go-to-page-holder">
              <ic-typography
                class={{ [`pagination-text-${appearance}`]: true }}
                variant="label"
              >
                Go to {this.pageLabel.toLowerCase()}
              </ic-typography>
              <ic-text-field
                type="number"
                small
                label="go-to-page-input"
                class="go-to-page-input"
                hideLabel
                onKeyDown={(ev) => this.handleKeydown(ev)}
              ></ic-text-field>
              <ic-button
                appearance={appearance}
                variant="secondary"
                onClick={() => this.goToPage()}
                size="small"
              >
                Go
              </ic-button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
