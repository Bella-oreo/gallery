pipeline {
    agent any
    stages {
        stage('Install Node.js') {
            steps {
                sh 'sudo apt-get update'
                sh 'sudo apt-get install -y nodejs'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'npm start'
            }
        }
    }
}
