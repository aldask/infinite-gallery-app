import { render, screen } from "@testing-library/react";
import FavsList from "./FavsList";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

const mockPics = [
  { id: 1, src: "pic1", alt: "pic1-txt" },
  { id: 2, src: "pic2", alt: "pic2-txt" },
];

describe("FavsList component", () => {
  it("Renders correctly", () => {
    render(
      <FavsList
        isOpen={true}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    expect(screen.getByText("Your Favorite Photos")).toBeInTheDocument();
  });
});
