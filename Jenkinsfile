pipeline {
    agent any

    stages {
        stage('Install Node.js') {
            steps {
                sh '''
                sudo apt-get update
                curl -sL https://deb.nodesource.com/setup_20.x | sudo bash -
                sudo apt-get install -y nodejs
                node -v
                '''
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh '''
                npm install
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                npm run build
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                node server.js
                '''
            }
        }
    }

    post {
        failure {
            echo "Pipeline failed!"
        }
    }
}
