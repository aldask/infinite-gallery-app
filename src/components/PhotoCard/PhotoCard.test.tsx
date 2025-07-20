import { render, screen } from "@testing-library/react";
import PhotoCard from "./PhotoCard";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { mockPic } from "../../test-utils/helpers";

vi.mock("../ProgressiveImage/ProgressiveImage", () => ({
  default: ({
    lowResSrc,
    highResSrc,
    alt,
  }: {
    lowResSrc: string;
    highResSrc: string;
    alt: string;
  }) => (
    <>
      <img src={lowResSrc} alt={alt} />
      <img src={highResSrc} alt={alt} />
    </>
  ),
}));

describe("PhotoCard component", () => {
  it("renders with favorite state", () => {
    render(
      <PhotoCard photo={mockPic} isFavorite={true} onFavToggle={vi.fn()} />
    );

    expect(screen.getByText(mockPic.alt)).toBeInTheDocument();
    expect(screen.getByText(mockPic.photographer)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Unfavorite" })
    ).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(2);
    images.forEach((img) => {
      expect(img).toHaveAttribute("alt", mockPic.alt);
    });
  });

  it("renders with non-favorite state", () => {
    render(
      <PhotoCard photo={mockPic} isFavorite={false} onFavToggle={vi.fn()} />
    );

    expect(
      screen.getByRole("button", { name: "Favorite" })
    ).toBeInTheDocument();
  });
});
