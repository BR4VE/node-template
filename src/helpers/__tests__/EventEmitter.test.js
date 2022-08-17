import EventEmitter from "helpers/EventEmitter";

describe("EventEmitter", () => {
  test("Emits events and runs listeners", async () => {
    const events = {
      created: { name: "created", count: 0 },
      updated: { name: "updated", count: 0 },
    };

    const onCreated = ({ count }) => {
      events.created.count += count;
    };
    const onUpdated = ({ count }) => {
      events.onUpdated.count += count;
    };

    EventEmitter.on(events.created.name, onCreated);
    EventEmitter.on(events.created.name, onCreated);
    EventEmitter.on(events.updated.name, onUpdated);

    await EventEmitter.emit(events.created.name, { count: 1 });

    expect(events.created.count).toBe(2);
    expect(events.updated.count).toBe(0);
  });
});
