import { act, cleanup, renderHook } from "@testing-library/react";
import { Events } from "../../components/@types";
import { useQueueState } from "../useQueueState";

afterEach(cleanup);

describe("Testing  useQueueState", () => {
  const { result } = renderHook(() => useQueueState<Events>([]));
  const list: Events[] = result.current[0];
  const constrols = result.current[1];

  it("Is empty array", () => {
    expect(list).toEqual([]);
  });

  it("Queue has length 0", () => {
    expect(constrols.length).toEqual(0);
  });

  act(() => {
    result.current[1].enqueue([
      { cpu: 0.57483, memory: 0.06347, uptime: 5000 },
    ]);
  });

  it("Queue has new value", () => {
    expect(result.current[0]).toEqual([
      { cpu: 0.57483, memory: 0.06347, uptime: 5000 },
    ]);
    expect(result.current[1].length).toEqual(1);
  });

  it("Peek first value", () => {
    expect(result.current[1].peek()).toEqual({
      cpu: 0.57483,
      memory: 0.06347,
      uptime: 5000,
    });
  });
});

describe("Testing dequeue", () => {
  const { result } = renderHook(() =>
    useQueueState<Events>([{ cpu: 0.57483, memory: 0.06347, uptime: 5000 }])
  );

  act(() => {
    result.current[1].dequeue();
  });

  it("Dequeue", () => {
    expect(result.current[0]).toEqual([]);
    expect(result.current[1].length).toEqual(0);
    expect(result.current[1].peek()).toEqual(undefined);
  });
});

describe("Testing enqueue multiple values", () => {
  const { result } = renderHook(() =>
    useQueueState<Events>([{ cpu: 0.57483, memory: 0.06347, uptime: 5000 }])
  );

  act(() => {
    result.current[1].enqueue([
      { cpu: 0.42354, memory: 0.0023782, uptime: 23892 },
      { cpu: 0.17287, memory: 0.001829, uptime: 53622 },
    ]);
  });

  it("Test lenght after enqueue", () => {
    expect(result.current[1].length).toEqual(3);
  });

  it("Test peek should be first value", () => {
    expect(result.current[1].peek()).toEqual({
      cpu: 0.57483,
      memory: 0.06347,
      uptime: 5000,
    });
  });

  it("Test order", () => {
    expect(result.current[0][1]).toEqual({
      cpu: 0.42354,
      memory: 0.0023782,
      uptime: 23892,
    });
    expect(result.current[0][2]).toEqual({
      cpu: 0.17287,
      memory: 0.001829,
      uptime: 53622,
    });
  });
});
