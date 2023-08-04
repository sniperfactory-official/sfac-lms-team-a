import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ModalWrapper from "@/components/ModalWrapper";

describe("ModalWrapper", () => {
  const handleModalMock = jest.fn();
  const cleanUpMock = jest.fn();

  const renderModal = (props = {}) =>
    render(
      <ModalWrapper handleModal={handleModalMock} {...props}>
        {"Test children"}
      </ModalWrapper>,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("정상적으로 렌더링 됩니다", () => {
    renderModal();
    expect(screen.getByText("Test children")).toBeInTheDocument();
  });

  it("배경 클릭 시 handleModal 호출", () => {
    renderModal();

    const background =
      screen.getByText("Test children").parentElement!.parentElement!;
    fireEvent.click(background);

    expect(handleModalMock).toHaveBeenCalled();
  });

  it("modalTitle이 제공될 경우, Component를 children으로 넘길시", () => {
    const DummySelectBox = () => (
      <div data-testid="selectBox">
        Select Box
        <div data-testid="option">Option 1</div>
      </div>
    );

    renderModal({ modalTitle: "Test Title", children: <DummySelectBox /> });

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("언마운트 시 cleanUp 함수 호출", () => {
    const { unmount } = renderModal({ cleanUp: cleanUpMock });

    unmount();
    expect(cleanUpMock).toHaveBeenCalledTimes(1);
  });
});
