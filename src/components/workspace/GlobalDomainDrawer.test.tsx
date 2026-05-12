import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GlobalDomainDrawer, GlobalDomainDrawerProps } from "./GlobalDomainDrawer";

// Mock the nested domain content components since we're only testing the drawer wrapper
vi.mock("./drawer-contents/ApprovalContent", () => ({
  ApprovalContent: () => <div data-testid="approval-content">Approval Mock</div>,
}));
vi.mock("./drawer-contents/ValidasiContent", () => ({
  ValidasiContent: () => <div data-testid="validasi-content">Validasi Mock</div>,
}));
vi.mock("./drawer-contents/KebutuhanContent", () => ({
  KebutuhanContent: () => <div data-testid="kebutuhan-content">Kebutuhan Mock</div>,
}));
vi.mock("./drawer-contents/DistribusiContent", () => ({
  DistribusiContent: () => <div data-testid="distribusi-content">Distribusi Mock</div>,
}));

describe("GlobalDomainDrawer", () => {
  const onCloseMock = vi.fn();

  it("renders correctly when not open (closed state)", () => {
    const props: GlobalDomainDrawerProps = {
      isOpen: false,
      onClose: onCloseMock,
      domain: "DISTRIBUSI",
      token: "dummy-token",
      onSuccess: vi.fn(),
    };

    render(<GlobalDomainDrawer {...props} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("translate-x-full");
    // Backdrop is not rendered
    expect(document.querySelector(".bg-black\\/5")).toBeNull();
  });

  it("renders correctly when open with DISTRIBUSI domain", () => {
    const props: GlobalDomainDrawerProps = {
      isOpen: true,
      onClose: onCloseMock,
      domain: "DISTRIBUSI",
      token: "dummy-token",
      onSuccess: vi.fn(),
    };

    render(<GlobalDomainDrawer {...props} />);

    // Check backdrop
    const backdrop = document.querySelector(".bg-black\\/5");
    expect(backdrop).toBeInTheDocument();

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("translate-x-0");
    // DISTRIBUSI should have specific layout classes
    expect(dialog).toHaveClass("top-0");
    expect(dialog).toHaveClass("pt-20");

    // Title and Subtitle check
    expect(screen.getByText("Catat Distribusi Barang")).toBeInTheDocument();
    expect(screen.getByText("Formulir alokasi barang inventaris untuk unit panti asuhan.")).toBeInTheDocument();

    // Check inner component mock
    expect(screen.getByTestId("distribusi-content")).toBeInTheDocument();
  });

  it("renders correctly when open with APPROVAL domain", () => {
    const props: GlobalDomainDrawerProps = {
      isOpen: true,
      onClose: onCloseMock,
      domain: "APPROVAL",
      data: { id: "1", status: "PENDING" } as any,
      token: "dummy-token",
      onSuccess: vi.fn(),
    };

    render(<GlobalDomainDrawer {...props} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("translate-x-0");
    // APPROVAL should have different layout classes
    expect(dialog).toHaveClass("top-20");
    expect(dialog).not.toHaveClass("pt-20");

    expect(screen.getByText("Detail Pengajuan Kunjungan")).toBeInTheDocument();
    // Subtitle should not be rendered
    expect(screen.queryByText("Formulir alokasi barang inventaris untuk unit panti asuhan.")).not.toBeInTheDocument();

    expect(screen.getByTestId("approval-content")).toBeInTheDocument();
  });

  it("renders correctly with VALIDASI domain - BARANG type", () => {
    const props: GlobalDomainDrawerProps = {
      isOpen: true,
      onClose: onCloseMock,
      domain: "VALIDASI",
      data: { type: "BARANG" } as any,
      token: "dummy-token",
      onSuccess: vi.fn(),
    };

    render(<GlobalDomainDrawer {...props} />);
    expect(screen.getByText("Inspeksi Pra-Submission")).toBeInTheDocument();
    expect(screen.getByTestId("validasi-content")).toBeInTheDocument();
  });

  it("renders correctly with VALIDASI domain - NON-BARANG type", () => {
    const props: GlobalDomainDrawerProps = {
      isOpen: true,
      onClose: onCloseMock,
      domain: "VALIDASI",
      data: { type: "UANG" } as any,
      token: "dummy-token",
      onSuccess: vi.fn(),
    };

    render(<GlobalDomainDrawer {...props} />);
    expect(screen.getByText("Detail Transaksi Sistem")).toBeInTheDocument();
  });

  it("renders correctly with KEBUTUHAN domain - Create mode", () => {
    const props: GlobalDomainDrawerProps = {
      isOpen: true,
      onClose: onCloseMock,
      domain: "KEBUTUHAN",
      data: null, // null means create mode
      onSubmit: vi.fn(),
    };

    render(<GlobalDomainDrawer {...props} />);
    expect(screen.getByText("Tambah Kebutuhan Baru")).toBeInTheDocument();
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("top-0");
    expect(dialog).toHaveClass("pt-20");
    expect(screen.getByTestId("kebutuhan-content")).toBeInTheDocument();
  });

  it("renders correctly with KEBUTUHAN domain - Edit mode", () => {
    const props: GlobalDomainDrawerProps = {
      isOpen: true,
      onClose: onCloseMock,
      domain: "KEBUTUHAN",
      data: { id: "123", name: "Beras" } as any, // non-null means edit mode
      onSubmit: vi.fn(),
    };

    render(<GlobalDomainDrawer {...props} />);
    expect(screen.getByText("Edit Kebutuhan")).toBeInTheDocument();
  });

  it("triggers onClose when clicking backdrop", () => {
    const props: GlobalDomainDrawerProps = {
      isOpen: true,
      onClose: onCloseMock,
      domain: "DISTRIBUSI",
      token: "dummy-token",
      onSuccess: vi.fn(),
    };

    const { container } = render(<GlobalDomainDrawer {...props} />);
    // Since there's no aria-label on the backdrop, query by the class or tag
    // Actually, we can use the specific class to find it or query it from container
    const backdrop = container.querySelector(".bg-black\\/5");
    expect(backdrop).toBeInTheDocument();

    if (backdrop) {
      fireEvent.click(backdrop);
    }
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("triggers onClose when clicking close button", () => {
    onCloseMock.mockClear();
    const props: GlobalDomainDrawerProps = {
      isOpen: true,
      onClose: onCloseMock,
      domain: "DISTRIBUSI",
      token: "dummy-token",
      onSuccess: vi.fn(),
    };

    render(<GlobalDomainDrawer {...props} />);
    const closeBtn = screen.getByRole("button", { name: /tutup panel/i });
    fireEvent.click(closeBtn);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
