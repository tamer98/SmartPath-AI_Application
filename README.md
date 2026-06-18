# SmartPath-AI

> Cloud-native AI application deployed on AWS EKS using Terraform, Github Actions CI/CD, ArgoCD GitOps, and observability via Prometheus, Grafana.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [CI/CD Pipeline](#cicd-pipeline)
- [Acknowledgments](#acknowledgments)

## Overview

SmartPath finder AI is a production-grade cloud-native platform running on AWS EKS and managed through Terraform, GitHub Actions, and ArgoCD GitOps. The project demonstrates modern DevOps practices including Infrastructure as Code (IaC), GitOps workflows, automated CI/CD, secrets management, Kubernetes-native observability, and scalable application deployment.

Key features:

- Infrastructure provisioning with Terraform
- GitOps deployment model using ArgoCD App-of-Apps
- Automated CI/CD pipelines with GitHub Actions
- Kubernetes-native observability with Prometheus and Grafana
- External Secrets integration with AWS Secret Manager
- Persistent storage through AWS EBS CSI Driver
- Production-ready EKS architecture

## Architecture

**The platform consists of three independent repositories**

[Infrastructure Repository](https://github.com/tamer98/SmartPath-AI_Infra):

- Responsible for provisioning AWS infrastructure
- VPC networking
- Amazon EKS cluster
- IAM Policies
- IRSA Roles
- EBS CSI integration
- Storage Classes

[GitOps Repository](https://github.com/tamer98/SmartPath-AI_GitOps):

- Acts as the single source of truth for Kubernetes resources
- ArgoCD Applications
- App-of-Apps orchestration
- Infrastructure components
- Monitoring stack
- MongoDB deployment
- Application deployment

SmartPath-AI_Application:

- AI application source code
- Docker configuration
- GitHub Actions workflows

---

**3-Tier application architecture Diagram**

<img width="858" height="253" alt="Docker-diagram-p4 drawio" src="https://github.com/user-attachments/assets/1c90b3ab-4e2e-4303-89f0-e9ab39b8fabd" />

<br><br>

**AWS infrastructure architecture Diagram**

<img width="1111" height="683" alt="AWS-p4 drawio" src="https://github.com/user-attachments/assets/34ac0312-adbe-40cb-9922-0eb78f2ea0fa" />

## Technology Stack

| Category                   | Technologies                                       |
| -------------------------- | -------------------------------------------------- |
| **Cloud**                  | AWS                                                |
| **Infrastructure as Code** | Terraform                                          |
| **Containerization**       | Docker, EKS                                        |
| **GitOps**                 | ArgoCD                                             |
| **CI/CD**                  | Github Actions                                     |
| **Version Control**        | GitHub                                             |
| **Database**               | MongoDB                                            |
| **Storage**                | AWS EBS CSI Driver                                 |
| **Secrets Management**     | External Secrets Operator                          |
| **Security**               | IAM, IRSA, RBAC                                    |
| **Networking**             | Ingress NGINX                                      |
| **Application**            | Java Script, HTML, CSS, Express.js, Bootstrap, EJS |
| **Observability**          | Prometheus, Grafana                                |

## Repository Structure

Infrastructure Repository

```
SmartPath-AI_Infra/
├── main.tf
├── providers.tf
├── variables.tf
├── terraform.tfvars
├── iam-policy.json
├── iam_policy.tf
└── modules/
    ├── network/
    │   ├── main.tf
    │   ├── outputs.tf
    │   └── variables.tf
    └── ebs-csi-storageclass/
        ├── main.tf
        ├── outputs.tf
        ├── provider.tf
        └── variables.tf
```

GitOps Repository

```
SmartPath-AI_GitOps/
├── apps/
│   ├── app-of-apps.yaml
│   ├── infra.yaml
│   ├── database.yaml
│   └── application.yaml
│
├── infra/
│   ├── ingress-nginx/
│   ├── ingress.yaml
│   ├── secretstore.yaml
│   └── sc-ebs-csi-gp3.yaml
│
├── database/
│   └── mongodb/
│
├── path-finder-ai/
│   ├── templates/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── config.yaml
│   │   └── external-secrets.yaml
│   └── values.yaml
│
├── monitoring/
├── app-servicemonitor.yaml
└── prometheus-stack-values.yaml
```

## Acknowledgments

- [Infrastructure Repository](https://github.com/tamer98/SmartPath-AI_Infra)
- [GitOps Repository](https://github.com/tamer98/SmartPath-AI_GitOps)
- [Application Repository](https://github.com/tamer98/Smart_Path_Finder-AI)

## Note

> The project is in progress, more to be updated.
