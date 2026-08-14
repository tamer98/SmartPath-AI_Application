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

```
├── Application
│   ├── Dockerfile
│   ├── README.md
│   ├── app
│   │   ├── db.js
│   │   ├── index.html
│   │   ├── index.js
│   │   ├── node_modules
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── public
│   │   └── views
│   ├── docker-compose.yaml
│   ├── mongo-init.js
│   └── nginx
│       ├── errors.txt
│       ├── logs.txt
│       └── nginx.conf
├── GitOps
│   ├── app-servicemonitor.yaml
│   ├── apps
│   │   ├── app-of-apps.yaml
│   │   ├── application.yaml
│   │   ├── database.yaml
│   │   └── infra.yaml
│   ├── database
│   │   ├── dbvalues.yaml
│   │   └── mongodb
│   ├── infra
│   │   ├── ingress-nginx
│   │   ├── ingress.yaml
│   │   ├── sc-ebs-csi-gp3.yaml
│   │   └── secretstore.yaml
│   ├── mongodb-values.yaml
│   ├── monitoring
│   ├── nginx-controller-values.yaml
│   ├── path-finder-ai
│   │   ├── Chart.yaml
│   │   ├── charts
│   │   ├── templates
│   │   └── values.yaml
│   └── prometheus-stack-values.yaml
├── Infrastructure
│   ├── README.md
│   ├── iam-policy.json
│   ├── iam_policy.tf
│   ├── main.tf
│   ├── modules
│   │   ├── ebs-csi-storageclass
│   │   └── network
│   ├── providers.tf
│   ├── terraform.tfvars
│   └── variables.tf
```

## Getting Started

### 📊Observability

**Monitoring**

- Prometheus: Metrics collection from application and infrastructure
- Grafana: Custom dashboards for application performance and node monitoring
- Endpoints: /metrics for application monitoring

**Dashboards**

- Node monitoring and resource utilization
- Application-specific metrics and performance

<img width="1536" height="880" alt="Screenshot 2026-08-12 at 20 59 55" src="https://github.com/user-attachments/assets/a76a5e4b-4ef2-4817-881a-2a918ce92c47" />

<img width="1531" height="387" alt="Screenshot 2026-08-12 at 20 34 18" src="https://github.com/user-attachments/assets/18a6e9df-1e2c-4d8c-bddf-2ac1adad5120" />

<br>
<br>

<img width="1536" height="744" alt="Screenshot 2026-08-12 at 20 56 22" src="https://github.com/user-attachments/assets/f6be9265-e8af-4ac5-a3cf-3eb813e8c87e" />

<img width="1536" height="744" alt="Screenshot 2026-08-12 at 20 56 36" src="https://github.com/user-attachments/assets/55098e3d-8135-4258-b8cc-8859c5ae3b32" />

## Acknowledgments

- [Infrastructure Repository](https://github.com/tamer98/SmartPath-AI_Infra)
- [GitOps Repository](https://github.com/tamer98/SmartPath-AI_GitOps)
- [Application Repository](https://github.com/tamer98/Smart_Path_Finder-AI)

## Note

> The project is in progress, more to be updated.
