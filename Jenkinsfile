pipeline {
    agent any
    stages {
        stage('Install Node.js') {
            steps {
                sh '''
                    apt-get update
                    apt-get install -y curl
                    curl -sL https://deb.nodesource.com/setup_20.x | bash -
                    apt-get install -y nodejs
                '''
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
                echo 'Deploying application...'
            }
        }
    }
}
