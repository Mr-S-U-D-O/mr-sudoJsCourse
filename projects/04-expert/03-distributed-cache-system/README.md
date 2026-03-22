# Distributed Cache System

**Difficulty:** 🔴 Expert | **Time:** 16-20 hours | **Skills:** Replication, Consistency, Failover, Distributed Systems

## Project Aim

Build a distributed, multi-node cache system with data replication, consistency guarantees, and automatic failover. Master distributed system challenges: consensus, replication, consistency models, and fault tolerance.

## Visualize The Product

Imagine a cache layer powering thousands of requests per second with zero downtime:

```
Network:
  Node A (Primary) ↔ Node B (Replica) ↔ Node C (Replica)
       ↓ replicates            ↓                    ↓
     cache data            cache data         cache data

Client requests distributed across nodes with automatic
recovery if any node fails.

Operations:
- get(key) → serves from nearest node
- set(key, value) → replicates to other nodes
- Node A fails → Node B takes over automatically
- Node A recovers → syncs state and rejoins
```

## Real-World Use Cases

1. **Session Stores** - Distributed session cache for web applications
2. **Cache Layers** - Redis-like distributed caching for databases
3. **Configuration Services** - Distributed config cache with replication
4. **Message Brokers** - In-memory data sync across nodes
5. **Microservices Discovery** - Cache service locations across cluster

## What You Should Know

- **Replication Strategies**: Master-slave, peer-to-peer, eventual consistency
- **Consistency Models**: Strong consistency, eventual consistency trade-offs
- **Network Partitions**: CAP theorem, handling split-brain scenarios
- **Failover**: Detecting failures, promoting replicas, rejoining nodes
- **Synchronization**: Log-based replication, state transfer, merkle trees
- **Distributed Algorithms**: Vector clocks, heartbeats, gossip protocols

## Rules & Requirements

Your implementation should:

- ✅ Support multiple nodes in a cluster
- ✅ Replicate data across nodes automatically
- ✅ Detect node failures and promote replicas
- ✅ Handle network partitions gracefully
- ✅ Sync state when nodes rejoin
- ✅ Support consistent read operations
- ✅ Provide eventual consistency guarantees
- ✅ Implement heartbeat-based node health checks
- ✅ Handle data conflicts during merges
- ✅ Support TTL-based key expiration

## How To Run

### Test the Starter (your implementation)

```bash
node -e "const m=require('./projects/04-expert/03-distributed-cache-system/src'); const c=m.createDistributedCache(); console.log(Object.keys(c));"
```

### Test the Solution - Basic Operations

```bash
node -e "const m=require('./projects/04-expert/03-distributed-cache-system/solution/index.solution'); const c=m.createDistributedCache(); c.set('key1', 'value1'); console.log(c.get('key1')); console.log(c.getStats());"
```

### Test Multi-Node Replication

```bash
node -e "const m=require('./projects/04-expert/03-distributed-cache-system/solution/index.solution'); const c=m.createCluster({nodes:3}); c.set('key1','val1'); console.log('All replicas synced:', c.verifyConsistency());"
```

### Simulate Node Failure

```bash
node -e "const m=require('./projects/04-expert/03-distributed-cache-system/solution/index.solution'); const c=m.createCluster({nodes:3}); c.set('key','val'); c.failNode(0); console.log('Node failed, backup took over:', c.get('key')); c.recoverNode(0); console.log('Synced:', c.verifyConsistency());"
```

## Interview Talking Points

- How would you handle network partitions (CAP theorem)?
- Which consistency model do you choose and why?
- How do you prevent split-brain when nodes reconnect?
- What's your replication strategy and its failure modes?
- How would you make this eventually consistent?
- How would you scale to thousands of nodes?
- What happens to reads during node failures?
- How do you handle concurrent writes to the same key?

---

**Start with:** [guide.md](./guide.md) for step-by-step implementation  
**Reference:** [solution/index.solution.js](./solution/index.solution.js) after attempting  
**Explore:** [docs/architecture.md](./docs/architecture.md) for design decisions

**Resources:**

- [Raft Consensus Algorithm](https://raft.github.io/)
- [CAP Theorem](https://en.wikipedia.org/wiki/CAP_theorem)
- [CRDT Data Structures](https://crdt.tech/)
