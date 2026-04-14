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
        OPENAI_API = credentials('openai_cred')
        GEO_API = credentials('geo_cred')
        DATABASE_URI = credentials('database_uri')
    }


    stages {
        stage("checkout") {
            steps {
                git branch: 'main', url: 'https://github.com/tamer98/SmartPath-AI_Application'
            }
        }


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
                dir('app') {
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
        }


        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t path-finder:latest .
                '''
            }
        }


        stage('E2E Test') {
            steps {
                sh '''

                    echo "PWD:"
                    pwd

                    echo "Check nginx folder:"
                    ls -la nginx

                    echo "Check file type:"
                    file nginx/nginx.conf || true

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


        stage('Push to ECR') {
            steps {
                sh '''
                    docker tag path-finder:latest $ECR_REPO:$IMAGE_TAG
                    docker push $ECR_REPO:$IMAGE_TAG
                '''
            }
        }   
    }

    post {
        always {
            cleanWs()
        }
    }
}