import { setLocalStorage } from "@/helpers/setLocalStorage";

describe("setLocalStorage", () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("valid inputs", () => {
    it("should store the JSON stringified object value", () => {
      const data = { id: "1", text: "hello" };
      setLocalStorage("key", data);
      expect(localStorage.getItem("key")).toBe(JSON.stringify(data));
    });

    it("should store the JSON stringified array value", () => {
      const data = [1, 2, 3];
      setLocalStorage("key", data);
      expect(localStorage.getItem("key")).toBe(JSON.stringify(data));
    });
  });

  describe("edge cases", () => {
    it("should store stringified null", () => {
      setLocalStorage("key", null);
      expect(localStorage.getItem("key")).toBe("null");
    });

    it("should store an empty array", () => {
      setLocalStorage("key", []);
      expect(localStorage.getItem("key")).toBe("[]");
    });
  });
});
