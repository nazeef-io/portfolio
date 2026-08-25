pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t portfolio:latest .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker stop portfolio || true
                    docker rm portfolio || true

                    docker run -d \
                        --name portfolio \
                        -p 8080:80 \
                        portfolio:latest
                '''
            }
        }
    }
}
