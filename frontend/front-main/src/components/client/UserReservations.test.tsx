import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import UserReservations from "./UserReservation";
import { MemoryRouter } from "react-router-dom";
import { orderService } from "../../services/orderService";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock("../../services/orderService", () => ({
  orderService: {
    getUserOrders: vi.fn(),
    deleteOrder: vi.fn(),
  },
}));

const mockReservations = [
  {
    id: 1,
    services: [{ name: "Wymiana oleju" }],
    availableDate: { dateTime: "2024-06-10T10:00:00" },
    paymentStatus: "PAID",
    repairStatus: "PENDING",
  },
];

describe("UserReservations component", () => {
  it("renders title", () => {
    (orderService.getUserOrders as any).mockResolvedValue([]);
    render(<UserReservations />, { wrapper: MemoryRouter });
    expect(screen.getByText("Twoje Rezerwacje")).toBeInTheDocument();
  });

  it("shows message when no reservations exist", async () => {
    (orderService.getUserOrders as any).mockResolvedValue([]);
    render(<UserReservations />, { wrapper: MemoryRouter });
    await waitFor(() => {
      expect(screen.getByText("Brak rezerwacji.")).toBeInTheDocument();
    });
  });

  it("displays a reservation from API", async () => {
    (orderService.getUserOrders as any).mockResolvedValue(mockReservations);
    render(<UserReservations />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByText("Rezerwacja #1")).toBeInTheDocument();
      expect(screen.getByText("Wymiana oleju")).toBeInTheDocument();
      expect(screen.getByText(/Opłacone/i)).toBeInTheDocument();
      expect(screen.getByText(/Oczekujące/i)).toBeInTheDocument();
    });
  });

  it("calls deleteOrder and removes item", async () => {
    (orderService.getUserOrders as any).mockResolvedValue(mockReservations);
    (orderService.deleteOrder as any).mockResolvedValue({});

    window.confirm = vi.fn().mockReturnValue(true);

    render(<UserReservations />, { wrapper: MemoryRouter });

    await screen.findByText("Rezerwacja #1");
    const deleteButton = screen.getByRole("button", { name: /Usuń/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(orderService.deleteOrder).toHaveBeenCalledWith(1);
    });
  });
});
