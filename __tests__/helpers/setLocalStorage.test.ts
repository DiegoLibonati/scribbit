import { setLocalStorage } from "@/helpers/setLocalStorage";

describe("setLocalStorage", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("should call localStorage.setItem with the key and JSON stringified object", () => {
    const data = { id: "1", text: "hello" };
    setLocalStorage("key", data);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "key",
      JSON.stringify(data)
    );
  });

  it("should call localStorage.setItem with the key and JSON stringified array", () => {
    const data = [1, 2, 3];
    setLocalStorage("key", data);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "key",
      JSON.stringify(data)
    );
  });

  it("should call localStorage.setItem with stringified null", () => {
    setLocalStorage("key", null);
    expect(localStorage.setItem).toHaveBeenCalledWith("key", "null");
  });

  it("should call localStorage.setItem with an empty array", () => {
    setLocalStorage("key", []);
    expect(localStorage.setItem).toHaveBeenCalledWith("key", "[]");
  });

  it("should persist the value so it can be retrieved", () => {
    const data = { id: "1" };
    setLocalStorage("key", data);
    expect(localStorage.getItem("key")).toBe(JSON.stringify(data));
  });
});
