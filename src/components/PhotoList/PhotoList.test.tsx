import { beforeAll, describe, expect, it, vi } from "vitest";
import fetchPexelPic from "../../api/Pexels";
import { render, screen, waitFor } from "@testing-library/react";
import PhotoList from "./PhotoList";
import "@testing-library/jest-dom/vitest";
import { mockPics } from "../../test-utils/helpers";

vi.mock("../../api/Pexels", () => ({
  default: vi.fn(),
}));

vi.mock("../../hooks/useFavorites", () => ({
  default: () => ({
    isFav: vi.fn(() => false),
    handleFavButton: vi.fn(),
  }),
}));

vi.mock("../PhotoCard/PhotoCard", () => ({
  default: ({ photo }: any) => <img src={photo.src.medium} alt={photo.alt} />,
}));

beforeAll(() => {
  globalThis.IntersectionObserver = class {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  } as any;
});

describe("PhotoList rendering", () => {
  it("renders images from mock data", async () => {
    (fetchPexelPic as any).mockResolvedValue(mockPics);
    render(<PhotoList />);
    const images = await screen.findAllByRole("img");
    expect(images.length).toBe(2);
    expect(screen.getByAltText("dummy alternative text")).toBeInTheDocument();
    expect(screen.getByAltText("dummy alternative text 2")).toBeInTheDocument();
  });

  it("calls fetchPexelPic on mount", async () => {
    (fetchPexelPic as any).mockResolvedValue(mockPics);
    render(<PhotoList />);
    await waitFor(() => {
      expect(fetchPexelPic).toHaveBeenCalled();
    });
  });
});
