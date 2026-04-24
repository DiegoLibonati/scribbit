import { getLocalStorage } from "@/helpers/getLocalStorage";

describe("getLocalStorage", () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("when the key does not exist", () => {
    it("should return null", () => {
      expect(getLocalStorage("nonexistent-key")).toBeNull();
    });
  });

  describe("when the key exists", () => {
    it("should return the parsed object value", () => {
      const data = { id: "1", text: "hello" };
      localStorage.setItem("key", JSON.stringify(data));
      expect(getLocalStorage("key")).toEqual(data);
    });

    it("should return the parsed array value", () => {
      const data = [{ id: "1" }, { id: "2" }];
      localStorage.setItem("key", JSON.stringify(data));
      expect(getLocalStorage("key")).toEqual(data);
    });

    it("should return the parsed string value", () => {
      localStorage.setItem("key", JSON.stringify("hello"));
      expect(getLocalStorage("key")).toBe("hello");
    });

    it("should return the parsed number value", () => {
      localStorage.setItem("key", JSON.stringify(42));
      expect(getLocalStorage("key")).toBe(42);
    });

    it("should return null when the stored value is JSON null", () => {
      localStorage.setItem("key", JSON.stringify(null));
      expect(getLocalStorage("key")).toBeNull();
    });

    it("should return the parsed boolean value", () => {
      localStorage.setItem("key", JSON.stringify(true));
      expect(getLocalStorage("key")).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("should return null for an empty string key", () => {
      expect(getLocalStorage("")).toBeNull();
    });
  });
});
