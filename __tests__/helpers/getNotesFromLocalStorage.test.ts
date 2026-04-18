import { getNotesFromLocalStorage } from "@/helpers/getNotesFromLocalStorage";

import { mockNotes } from "@tests/__mocks__/notes.mock";

describe("getNotesFromLocalStorage", () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe("when localStorage has no notes", () => {
    it("should return an empty array", () => {
      expect(getNotesFromLocalStorage()).toEqual([]);
    });
  });

  describe("when localStorage has an empty notes array", () => {
    it("should return an empty array", () => {
      localStorage.setItem("notes", JSON.stringify([]));
      expect(getNotesFromLocalStorage()).toEqual([]);
    });
  });

  describe("when localStorage has notes", () => {
    beforeEach(() => {
      localStorage.setItem("notes", JSON.stringify(mockNotes));
    });

    it("should return the stored notes", () => {
      expect(getNotesFromLocalStorage()).toEqual(mockNotes);
    });

    it("should return an array with the correct length", () => {
      expect(getNotesFromLocalStorage()).toHaveLength(mockNotes.length);
    });
  });
});
