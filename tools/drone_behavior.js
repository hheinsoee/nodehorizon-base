/**
 * drone_behavior.js — Sub-Processor Bot Script
 *
 * This script runs inside a Web Worker (sandboxed).
 * The drone executes this logic on every tick.
 *
 * Available API (injected by the game engine):
 *   self.getNodes()        → array of your nodes
 *   self.getDataStreams()  → array of active data streams
 *   self.sendSignal(fromNodeId, toNodeId)  → activate a data stream
 *   self.log(message)      → debug output visible in your base
 */

self.onmessage = function (event) {
  const { tick, nodes, dataStreams } = event.data;

  // Example: pulse a signal from storage to firewall every 5 ticks
  if (tick % 5 === 0) {
    const storage = nodes.find((n) => n.nodeType === "storage");
    const firewall = nodes.find((n) => n.nodeType === "firewall");

    if (storage && firewall) {
      self.postMessage({
        action: "sendSignal",
        fromNodeId: storage.nodeId,
        toNodeId: firewall.nodeId,
      });
    }
  }

  // Example: log every 10 ticks
  if (tick % 10 === 0) {
    self.postMessage({
      action: "log",
      message: `Drone tick ${tick} — systems nominal`,
    });
  }
};
