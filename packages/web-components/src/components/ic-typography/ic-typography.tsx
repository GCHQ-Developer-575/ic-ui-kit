import { Component, Prop, h, Element, Host, State } from "@stencil/core";

import { IcTypographyVariants } from "../../utils/types";

@Component({
  styleUrl: "ic-typography.css",
  tag: "ic-typography",
  shadow: true,
})
export class Typography {
  @Element() el: HTMLIcTypographyElement;

  /**
   * The ICDS typography style to use.
   */
  @Prop() variant?: IcTypographyVariants = "body";

  /**
   * If `true`, appropriate top and bottom margins will be applied to the typography.
   */
  @Prop() applyVerticalMargins?: boolean = false;

  /**
   * The number of lines to display before truncating the text, only used for the 'body' variant.
   */
  @Prop() maxLines?: number;

  @State() expanded: boolean = false;
  @State() truncStyle: any;

  componentWillLoad(): void {
    this.maxLines > 0 && this.variant == "body"
      ? (this.truncStyle = {
          "max-height": this.boxHeight(this.maxLines),
          overflow: "hidden",
        })
      : null;
  }

  private boxHeight = (lines: number): any => {
    return (lines * 1.5).toString() + "rem";
  };

  private styleFunc = (expanded: boolean) => {
    if (expanded == true) {
      this.truncStyle = {
        "max-height": "fit-content",
      };
      return this.truncStyle;
    } else {
      this.truncStyle = {
        "max-height": this.boxHeight(this.maxLines),
        overflow: "hidden",
      };
      return this.truncStyle;
    }
  };

  private onClick = () => {
    if (this.expanded === false) {
      this.expanded = true;
      this.styleFunc(this.expanded);
      return;
    } else {
      this.expanded = false;
      this.styleFunc(this.expanded);
      return;
    }
  };

  render() {
    const { variant, applyVerticalMargins, maxLines, onClick, truncStyle } =
      this;

    return (
      <Host
        class={{
          [`ic-typography-${variant}`]: true,
          [`ic-typography-vertical-margins-${variant}`]: applyVerticalMargins,
        }}
      >
        {variant == "body" && maxLines > 0 ? (
          <div style={truncStyle}>
            <slot />
          </div>
        ) : (
          <slot />
        )}
        {variant == "body" && maxLines > 0 && (
          <button onClick={onClick} class="trunc-btn">
            {this.expanded ? "See less" : "See more"}
          </button>
        )}
      </Host>
    );
  }
}
