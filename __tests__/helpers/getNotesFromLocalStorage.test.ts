import { getNotesFromLocalStorage } from "@/helpers/getNotesFromLocalStorage";

import { mockLocalStorage } from "@tests/__mocks__/localStorage.mock";
import { mockNotes } from "@tests/__mocks__/notes.mock";

describe("getNotesFromLocalStorage", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it("should return notes from localStorage", () => {
    mockLocalStorage.setItem("notes", JSON.stringify(mockNotes));

    const result = getNotesFromLocalStorage();

    expect(result).toEqual(mockNotes);
  });

  it("should return empty array when no notes in localStorage", () => {
    const result = getNotesFromLocalStorage();

    expect(result).toEqual([]);
  });

  it("should return empty array when localStorage has null", () => {
    mockLocalStorage.setItem("notes", "null");

    const result = getNotesFromLocalStorage();

    expect(result).toEqual([]);
  });
});
