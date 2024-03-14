pipeline {
    agent any
    
    environment {
        registryCredentials = "nexus"
        registry = "192.168.1.47:8083"
    }
    stages {
        stage('Install dependencies') {
            steps {
                script {
                    sh('npm install')
                }
            }
        }
        stage('Unit Test') {
            steps {
                script {
                    sh('npm test')
                }
            }
        }
        

        stage('Build application') {
            steps {
                script {
                    sh('npm run build-dev')
                }
            }
        }
        stage('Building images (node and mongo)') {
            steps {
                script {
                    sh('docker-compose build')
                }
            }
        }
        stage('Deploy  to Nexus') {
     steps{  
         script {

             docker.withRegistry("http://"+registry, registryCredentials ) {
            sh('docker push $registry/nodemongoapp:6.0 ')
          }
        }
      }
    }
    }
}
