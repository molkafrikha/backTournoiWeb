pipeline {
    agent any
    
    environment {
        registryCredentials = "nexus"
        registry = "172.20.10.5:8083"
    }
    stages {
        stage('Install dependencies') {
            steps {
                script {
                    sh "npm install"
                }
            }
        }
        
        stage('Build application') {
            steps {
                script {
                    sh "npm run build-dev"
                }
            }
        }
        stage('Building images (node and mongo)') {
            steps {
                script {
                    sh "docker-compose build"
                }
            }
        }
        stage('Deploy  to Nexus') {
            steps {  
                script {
                    docker.withRegistry("http://${registry}", registryCredentials) {
                        sh "docker push ${registry}/nodemongoapp:6.0"
                    }
                }
            }
        }
        stage('Run application') {
            steps {  
                script {
                    docker.withRegistry("http://${registry}", registryCredentials) {
                        sh "docker pull ${registry}/nodemongoapp:6.0"
                        sh "docker-compose up -d"
                    }
                }
            }
        }
    }
}
