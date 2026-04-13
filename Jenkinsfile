pipeline {
    agent any

    triggers {
        pollSCM("* * * * *")
    }


    options {
        timeout(time: 5, unit: "MINUTES")
        timestamps()
    }

   tools {
        nodejs "NodeJS"
    }

    environment {
        AWS_REGION = "ap-south-1"
        ECR_REPO = "development/path-finder"
        IMAGE_TAG = "${env.GIT_COMMIT}"
        // AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        // AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
    }


    stages {
        // stage("Cleanup Workspace"){
        //     steps {
        //         cleanWs()
        //     }

        // }
        // ========================
        // 1. CHECKOUT
        // ========================

        stage("checkout") {
            steps {
                git branch: 'main', url: 'https://github.com/tamer98/SmartPath-AI_Application'
            }
        }

        // ========================
        // 2. BUILD + UNIT TEST
        // ========================
        stage('Build Application') {
            steps {
                dir('app') {
                    sh '''
                        npm install
                    '''
                }
            }
        }

        stage("Test Application"){
            steps {
                sh '''
                    echo "Starting app..."
                    node index.js & 
                    echo $! > app.pid
                    sleep 5

                    echo "Running unit test (HTTP check)"
                    curl -f http://localhost:3000
                    sleep 5

                    echo "Stopping app..."
                    kill $(cat app.pid) || true
                '''
            }
        }

        // ========================
        // 4. DOCKER BUILD
        // ========================
        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t path-finder:latest .
                '''
            }
        }


        // ========================
        // 5. E2E TEST (DOCKER COMPOSE)
        // ========================
        stage('E2E Test') {
            steps {
                sh '''
                    docker compose up -d

                    docker ps -a
                    docker images

                    sleep 15

                    echo "Running E2E test"
                    curl -f http://localhost:80

                    sleep 10
                    docker compose down -v || true
                '''
            }
        }


        // ========================
        // 6. LOGIN TO ECR (IAM ROLE)
        // ========================
        stage('Login to ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credential',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh """
                    aws ecr get-login-password --region $AWS_REGION \
                    | docker login --username AWS --password-stdin $ECR_REPO
                    """
                }
            
            }
        }

        // ========================
        // 7. PUSH IMAGE
        // ========================
        stage('Push to ECR') {
            steps {
                sh '''
                    docker tag path-finder:latest $ECR_REPO:$IMAGE_TAG
                    docker push $ECR_REPO:$IMAGE_TAG
                '''
            }
        }



        //     stage("Publish") {
        //         steps {
        //             // Publish steps go here
        //         }
        //     }


        //     stage("Deploy") {
        //         steps {
        //             // Deployment steps go here
        //         }
        //     }
        // }


        
    }

    post {
            always {
                cleanWs()
            }
            // failure {
            //     emailext(
            //         recipientProviders: [culprits()],
            //         subject: "Build Failed #${env.BUILD_NUMBER}",
            //         body: "Build failed.\nCheck details: ${env.BUILD_URL}",
            //         attachLog: true
            //     )
            // }

            // success {
            //     emailext(
            //         to: 'tamer.taji@gmail.com',
            //         subject: "B