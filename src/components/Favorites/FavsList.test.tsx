import { render, screen, cleanup } from "@testing-library/react";
import FavsList from "./FavsList";
import { describe, it, expect, vi, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { displayFavPics } from "../../hooks/useLocalStorage";
import { mockPics } from "../../test-utils/helpers";

vi.mock("../../hooks/useLocalStorage", () => ({
  displayFavPics: vi.fn(),
  removeFavPic: vi.fn(),
}));

vi.mock("../PhotoCard/PhotoCard", () => ({
  default: ({ photo }: any) => <img src={photo.src.large2x} alt={photo.alt} />,
}));

afterEach(() => {
  cleanup();
});

describe("FavsList component", () => {
  it("renders header", () => {
    (displayFavPics as any).mockReturnValueOnce([]);
    render(<FavsList isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText("Your Favorite Photos")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(<FavsList isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByText("Your Favorite Photos")).not.toBeInTheDocument();
  });

  it("renders 'No favorites yet.' message", () => {
    (displayFavPics as any).mockReturnValueOnce([]);
    render(<FavsList isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText("No favorites yet.")).toBeInTheDocument();
  });

  it("renders favorite images", () => {
    (displayFavPics as any).mockReturnValueOnce(mockPics);
    render(<FavsList isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByAltText("dummy alternative text")).toBeInTheDocument();
    expect(screen.getByAltText("dummy alternative text 2")).toBeInTheDocument();
  });
});
