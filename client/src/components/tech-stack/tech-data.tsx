import { 
  Server, 
  Database, 
  Shield, 
  Zap, 
  Globe, 
  Code 
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TechComponentDetails {
  overview: string;
  features: string[];
  metrics: Record<string, string>;
}

interface TechComponent {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  details: TechComponentDetails;
}

export const techComponents: TechComponent[] = [
  {
    id: "consensus",
    icon: Shield,
    title: "Proof of Synergy",
    subtitle: "Consensus",
    description: "Revolutionary consensus mechanism combining the best of PoS and PoW while eliminating their weaknesses.",
    gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
    details: {
      overview: "Proof of Synergy (PoSyg) is PeoChain's groundbreaking consensus algorithm that achieves unprecedented security, scalability, and energy efficiency through innovative validator collaboration protocols.",
      features: [
        "Byzantine fault tolerance up to 50% malicious nodes",
        "Sub-second block finality",
        "Energy consumption 99.9% lower than Bitcoin",
        "Dynamic validator selection based on performance",
        "Quantum-resistant cryptographic signatures"
      ],
      metrics: {
        "Block Time": "0.8s",
        "Finality": "1 block",
        "Energy Use": "0.1% of PoW",
        "Fault Tolerance": "50%"
      }
    }
  },
  {
    id: "performance",
    icon: Zap,
    title: "Parallel Execution Engine",
    subtitle: "Performance",
    description: "High-throughput transaction processing with state sharding and parallel execution capabilities.",
    gradient: "bg-gradient-to-r from-yellow-500 to-orange-500",
    details: {
      overview: "Our advanced execution engine processes transactions in parallel across multiple state shards, achieving linear scalability while maintaining consistency and atomic execution guarantees.",
      features: [
        "Parallel transaction execution",
        "Dynamic state sharding",
        "Optimistic concurrency control",
        "ACID transaction guarantees",
        "Cross-shard communication protocols"
      ],
      metrics: {
        "Max TPS": "100,000+",
        "Avg Latency": "50ms",
        "Shards": "Dynamic",
        "Throughput": "Linear scaling"
      }
    }
  },
  {
    id: "storage",
    icon: Database,
    title: "Distributed Storage",
    subtitle: "Storage",
    description: "Decentralized storage system with data availability guarantees and efficient retrieval mechanisms.",
    gradient: "bg-gradient-to-r from-green-500 to-emerald-500",
    details: {
      overview: "PeoChain's storage layer provides distributed, fault-tolerant data storage with cryptographic proofs of availability and efficient content-addressed retrieval systems.",
      features: [
        "Content-addressed storage",
        "Data availability proofs",
        "Erasure coding for redundancy",
        "Compression algorithms",
        "Automated data lifecycle management"
      ],
      metrics: {
        "Availability": "99.99%",
        "Redundancy": "3x",
        "Compression": "70%",
        "Retrieval": "<100ms"
      }
    }
  },
  {
    id: "networking",
    icon: Globe,
    title: "P2P Network Layer",
    subtitle: "Networking",
    description: "Resilient peer-to-peer networking with advanced routing and discovery protocols.",
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
    details: {
      overview: "Our networking layer implements advanced gossip protocols, DHT-based peer discovery, and adaptive routing to maintain network connectivity and efficient message propagation.",
      features: [
        "Kademlia-based peer discovery",
        "Adaptive gossip protocols",
        "NAT traversal capabilities",
        "Anti-spam and DDoS protection",
        "Bandwidth optimization"
      ],
      metrics: {
        "Network Nodes": "10,000+",
        "Message Latency": "<200ms",
        "Bandwidth Usage": "Optimized",
        "Uptime": "99.9%"
      }
    }
  },
  {
    id: "virtual-machine",
    icon: Code,
    title: "Virtual Machine",
    subtitle: "Execution",
    description: "Advanced virtual machine with WebAssembly support and formal verification capabilities.",
    gradient: "bg-gradient-to-r from-indigo-500 to-blue-500",
    details: {
      overview: "PeoChain VM supports multiple programming languages through WebAssembly compilation, offering developers flexibility while maintaining security through formal verification tools.",
      features: [
        "WebAssembly execution environment",
        "Multi-language support (Rust, Go, C++)",
        "Formal verification tools",
        "Gas metering and optimization",
        "Sandboxed execution"
      ],
      metrics: {
        "Languages": "10+",
        "Gas Efficiency": "40% better",
        "Verification": "Formal proofs",
        "Security": "Sandboxed"
      }
    }
  },
  {
    id: "infrastructure",
    icon: Server,
    title: "Infrastructure Layer",
    subtitle: "Infrastructure",
    description: "Robust infrastructure services including monitoring, logging, and automated scaling.",
    gradient: "bg-gradient-to-r from-teal-500 to-cyan-500",
    details: {
      overview: "Comprehensive infrastructure layer providing monitoring, alerting, automated scaling, and operational tools for maintaining network health and performance.",
      features: [
        "Real-time monitoring and alerting",
        "Automated scaling and load balancing",
        "Comprehensive logging and analytics",
        "Health checks and diagnostics",
        "Deployment automation"
      ],
      metrics: {
        "Monitoring": "Real-time",
        "Scaling": "Automatic",
        "Uptime": "99.99%",
        "Response": "<1s"
      }
    }
  }
];