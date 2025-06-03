import {
  Workflow,
  ShieldCheck,
  KeyRound,
  AlertTriangle,
  Brain,
  HardDrive,
  Layers3,
  Lock,
} from "lucide-react";

export interface TechComponentDetails {
  overview: string;
  features: string[];
  metrics: Record<string, string>;
}

export interface TechComponent {
  id: string;
  icon: typeof Workflow;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  details: TechComponentDetails;
}

export const techComponents: TechComponent[] = [
  {
    id: "subnet",
    icon: Workflow,
    title: "Subnet Validator Network",
    subtitle: "Distributed Architecture",
    description:
      "Hierarchical validator network with specialized subnets for optimal performance and security",
    gradient: "gradient-sage-forest",
    details: {
      overview:
        "Multi-layered validator architecture that enables horizontal scaling while maintaining security",
      features: [
        "Dynamic subnet allocation based on transaction volume",
        "Cross-subnet communication via secure message passing",
        "Automatic load balancing across validator pools",
        "Fault-tolerant consensus with Byzantine resistance",
      ],
      metrics: {
        "Active Subnets": "24",
        "Validators per Subnet": "~340",
        "Cross-subnet Latency": "<50ms",
        "Fault Tolerance": "33%",
      },
    },
  },
  {
    id: "zkproofs",
    icon: ShieldCheck,
    title: "Zero-Knowledge Proofs",
    subtitle: "Privacy & Verification",
    description:
      "Advanced ZK-STARK implementation for transaction privacy and computational integrity",
    gradient: "bg-medium-forest",
    details: {
      overview:
        "Cutting-edge zero-knowledge proof system ensuring privacy without sacrificing transparency",
      features: [
        "ZK-STARK proofs for scalable verification",
        "Recursive proof composition for batch processing",
        "Privacy-preserving smart contract execution",
        "Selective disclosure for regulatory compliance",
      ],
      metrics: {
        "Proof Generation": "~2.3s",
        "Verification Time": "<100ms",
        "Privacy Level": "Complete",
        Throughput: "15K proofs/sec",
      },
    },
  },
  {
    id: "quantum",
    icon: KeyRound,
    title: "Quantum-Resistant Cryptography",
    subtitle: "Future-Proof Security",
    description:
      "Post-quantum cryptographic algorithms protecting against quantum computing threats",
    gradient: "bg-dark-forest",
    details: {
      overview:
        "Implementation of NIST-approved post-quantum cryptographic standards for long-term security",
      features: [
        "Lattice-based key exchange mechanisms",
        "Hash-based digital signatures",
        "Code-based encryption for data protection",
        "Hybrid classical-quantum key management",
      ],
      metrics: {
        "Algorithm Suite": "CRYSTALS-Kyber",
        "Key Size": "1568 bytes",
        "Signature Size": "2420 bytes",
        "Security Level": "128-bit equivalent",
      },
    },
  },
  {
    id: "resilience",
    icon: AlertTriangle,
    title: "Fault Tolerance & Recovery",
    subtitle: "System Resilience",
    description:
      "Advanced fault detection and automatic recovery mechanisms for 99.99% uptime",
    gradient: "bg-sage",
    details: {
      overview:
        "Multi-layered resilience system with predictive failure detection and automated recovery protocols",
      features: [
        "Real-time health monitoring and alerting",
        "Automatic failover with zero data loss",
        "Distributed backup and recovery systems",
        "Predictive maintenance using AI analysis",
      ],
      metrics: {
        "Uptime SLA": "99.99%",
        "Recovery Time": "<30s",
        "Data Replication": "3x minimum",
        "Monitoring Points": "2000+",
      },
    },
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI-Powered Optimization",
    subtitle: "Intelligent Operations",
    description:
      "Machine learning algorithms optimizing network performance and resource allocation",
    gradient: "bg-medium-forest",
    details: {
      overview:
        "Advanced AI systems continuously optimizing network parameters for peak performance",
      features: [
        "Dynamic load balancing using ML predictions",
        "Automated gas fee optimization",
        "Intelligent routing for transaction processing",
        "Anomaly detection for security monitoring",
      ],
      metrics: {
        "Performance Gain": "34%",
        "Prediction Accuracy": "97.2%",
        "Response Time": "<10ms",
        "Learning Rate": "Real-time",
      },
    },
  },
  {
    id: "storage",
    icon: HardDrive,
    title: "Distributed Storage System",
    subtitle: "Data Management",
    description:
      "Efficient distributed storage with content-addressing and automatic redundancy",
    gradient: "bg-dark-forest",
    details: {
      overview:
        "Decentralized storage architecture ensuring data availability and integrity across the network",
      features: [
        "Content-addressed storage with deduplication",
        "Automatic data replication and healing",
        "Efficient pruning and garbage collection",
        "Cross-subnet data synchronization",
      ],
      metrics: {
        "Storage Efficiency": "89%",
        "Replication Factor": "3-7x",
        "Access Latency": "<200ms",
        Throughput: "500 MB/s",
      },
    },
  },
  {
    id: "consensus",
    icon: Layers3,
    title: "Proof of Synergy Consensus",
    subtitle: "Novel Consensus",
    description:
      "Revolutionary consensus mechanism balancing speed, security, and energy efficiency",
    gradient: "bg-sage",
    details: {
      overview:
        "Innovative consensus protocol that achieves the optimal balance of the blockchain trilemma",
      features: [
        "Energy-efficient validator selection",
        "Dynamic difficulty adjustment",
        "Cross-chain consensus participation",
        "Stake-weighted voting mechanisms",
      ],
      metrics: {
        "Block Time": "2.1s",
        "Energy Usage": "99.5% less than PoW",
        Finality: "Single block",
        "Validator Count": "8100+",
      },
    },
  },
  {
    id: "security",
    icon: Lock,
    title: "Multi-Layer Security",
    subtitle: "Defense Systems",
    description:
      "Comprehensive security framework with real-time threat detection and response",
    gradient: "bg-medium-forest",
    details: {
      overview:
        "Enterprise-grade security architecture protecting against all known attack vectors",
      features: [
        "Multi-signature transaction authorization",
        "Real-time threat intelligence integration",
        "Automated incident response protocols",
        "Hardware security module integration",
      ],
      metrics: {
        "Attack Detection": "<1s",
        "False Positive Rate": "0.03%",
        "Security Score": "A+",
        "Incident Response": "Automated",
      },
    },
  },
];
