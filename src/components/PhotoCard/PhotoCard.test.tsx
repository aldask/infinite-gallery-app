import { render, screen } from "@testing-library/react";
import PhotoCard from "./PhotoCard";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("PhotoCard rendering", () => {
  vi.mock("..ProgressiveImage/ProgressiveImage", () => ({
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

  it("It should render the PhotoCard component", () => {
    const mockPic = {
      id: 0,
      photographer: "mock photographer",
      alt: "mock pic txt",
      src: {
        original: "mockOriginalImg",
        portrait: "mockPortraitImg",
        medium: "mockMediumImg",
        small: "mockSmallImg",
      },
    };
    render(
      <PhotoCard photo={mockPic} isFavorite={true} onFavToggle={vi.fn()} />
    );

    expect(screen.getByText("mock pic txt")).toBeInTheDocument();
    expect(screen.getByText("mock photographer")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Unfavourite" })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("img").length).toBeGreaterThan(0);
  });
});
