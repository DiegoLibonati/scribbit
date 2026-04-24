import { setAlert, clearAlert } from "@/helpers/setAlert";

const setupAlertElement = (): HTMLHeadingElement => {
  const alertH2 = document.createElement("h2");
  alertH2.className = "header__alert";
  document.body.appendChild(alertH2);
  return alertH2;
};

describe("setAlert", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    clearAlert();
    document.body.innerHTML = "";
    jest.useRealTimers();
  });

  describe("when .header__alert element exists", () => {
    it("should set the message as text content", () => {
      setupAlertElement();
      setAlert("Note saved ✅");
      expect(
        document.querySelector<HTMLHeadingElement>(".header__alert")
      ).toHaveTextContent("Note saved ✅");
    });

    it("should add the show class", () => {
      setupAlertElement();
      setAlert("Note saved ✅");
      expect(
        document.querySelector<HTMLHeadingElement>(".header__alert")
      ).toHaveClass("header__alert--show");
    });

    it("should clear the message after 1000ms", () => {
      setupAlertElement();
      setAlert("Note saved ✅");
      jest.advanceTimersByTime(1000);
      expect(
        document.querySelector<HTMLHeadingElement>(".header__alert")
      ).toHaveTextContent("");
    });

    it("should remove the show class after 1000ms", () => {
      setupAlertElement();
      setAlert("Note saved ✅");
      jest.advanceTimersByTime(1000);
      expect(
        document.querySelector<HTMLHeadingElement>(".header__alert")
      ).not.toHaveClass("header__alert--show");
    });

    it("should keep the message visible before 1000ms has passed", () => {
      setupAlertElement();
      setAlert("Note saved ✅");
      jest.advanceTimersByTime(999);
      expect(
        document.querySelector<HTMLHeadingElement>(".header__alert")
      ).toHaveTextContent("Note saved ✅");
    });

    it("should replace the message when called again before the timeout fires", () => {
      setupAlertElement();
      setAlert("First message");
      jest.advanceTimersByTime(500);
      setAlert("Second message");
      expect(
        document.querySelector<HTMLHeadingElement>(".header__alert")
      ).toHaveTextContent("Second message");
    });

    it("should not clear the second message when the first timeout would have fired", () => {
      setupAlertElement();
      setAlert("First message");
      jest.advanceTimersByTime(500);
      setAlert("Second message");
      jest.advanceTimersByTime(500);
      expect(
        document.querySelector<HTMLHeadingElement>(".header__alert")
      ).toHaveTextContent("Second message");
      expect(
        document.querySelector<HTMLHeadingElement>(".header__alert")
      ).toHaveClass("header__alert--show");
    });
  });

  describe("when .header__alert element does not exist", () => {
    it("should not throw", () => {
      expect(() => {
        setAlert("Test message");
      }).not.toThrow();
    });
  });
});

describe("clearAlert", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.useRealTimers();
  });

  describe("when .header__alert element exists", () => {
    it("should clear the text content", () => {
      const alertH2 = setupAlertElement();
      alertH2.textContent = "Some message";
      clearAlert();
      expect(alertH2).toHaveTextContent("");
    });

    it("should remove the show class", () => {
      const alertH2 = setupAlertElement();
      alertH2.classList.add("header__alert--show");
      clearAlert();
      expect(alertH2).not.toHaveClass("header__alert--show");
    });

    it("should cancel an active timeout so the handler does not run", () => {
      const alertH2 = setupAlertElement();
      setAlert("Test message");
      clearAlert();
      alertH2.textContent = "Manual text";
      jest.advanceTimersByTime(1000);
      expect(alertH2).toHaveTextContent("Manual text");
    });
  });

  describe("when .header__alert element does not exist", () => {
    it("should not throw", () => {
      expect(() => {
        clearAlert();
      }).not.toThrow();
    });
  });
});
