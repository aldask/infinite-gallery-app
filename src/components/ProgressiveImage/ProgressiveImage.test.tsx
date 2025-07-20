import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ProgressiveImage from "./ProgressiveImage";

describe("Progressive image render", () => {
  it("render both low res and high res images", () => {
    render(
      <ProgressiveImage lowResSrc="lowRes" highResSrc="highRes" alt="altTxt" />
    );

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(2);
  });

  it("renders a high quality img after it loads", () => {
    render(
      <ProgressiveImage lowResSrc="lowRes" highResSrc="highRes" alt="altTxt" />
    );

    const highResImg = screen.getAllByRole("img")[1];

    // not loaded high res image
    expect(highResImg.className).not.toMatch(/loaded/);

    // triggering load
    fireEvent.load(highResImg);

    // loaded high res img
    expect(highResImg.className).toMatch(/loaded/);
  });

  it("applying lazy loading", () => {
    render(
      <ProgressiveImage lowResSrc="lowRes" highResSrc="highRes" alt="altTxt" />
    );

    const highResImg = screen.getAllByRole("img")[1];

    expect(highResImg).toHaveAttribute("loading", "lazy");
  });
});
