import { describe, expect, it } from "vitest";
import { WatchedList } from "./watched-list";

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b;
  }
}

describe("watched list", () => {
  it("should be able to create a watched list with initial items", async () => {
    const list = new NumberWatchedList([1, 2, 3]);

    expect(list.currentItems.length).toBe(3);
  });

  it("should be able to add items", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.add(4);

    expect(list.currentItems).toHaveLength(4);
    expect(list.new).toHaveLength(1);
    expect(list.getNewItems()).toEqual([4]);
  });

  it("should be able to remove item", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(2);

    expect(list.currentItems).toHaveLength(2);
    expect(list.getRemovedItems()).toEqual([2]);
    expect(list.exists(2)).toBe(false);
  });

  it("should be able to add a removed item", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(2);
    list.add(2);

    expect(list.currentItems).toHaveLength(3);
    expect(list.getRemovedItems()).toEqual([]);
    expect(list.getNewItems()).toEqual([]);
  });

  it("should be able to remove an added item", () => {
    const list = new NumberWatchedList([1, 3]);

    list.add(2);
    list.remove(2);

    expect(list.currentItems).toHaveLength(2);
    expect(list.getRemovedItems()).toEqual([]);
    expect(list.getNewItems()).toEqual([]);
  });

  it("should be able to update list and keep track of operations", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.update([1, 3, 5]);

    expect(list.getRemovedItems()).toEqual([2]);
    expect(list.getNewItems()).toEqual([5]);
  });
});
