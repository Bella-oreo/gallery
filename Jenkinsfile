pipeline {
    agent any

    stages {

        stage('Install Node.js') {
            steps {
                sh 'curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -'
                sh 'sudo apt-get install -y nodejs'
            }
        }

        stage('Checkout') {
            steps {
                echo 'Cloning the repository...'
                git branch: 'master', url: 'https://github.com/Bella-oreo/gallery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh '/usr/bin/npm install'

            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to Render...'
                sh 'node server.js'
                // Add your actual deployment script here if needed
            }
        }

        stage('Verify Node.js') {
           steps {
             sh 'node -v'
               sh 'npm -v'
    }
}

    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
