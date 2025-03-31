pipeline {
    agent any

    environment {
        // Define any global environment variables here
        DOCKER_IMAGE = "bella-oreo/gallery:latest"
        REPO_URL = "https://github.com/Bella-oreo/gallery.git"
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    echo "Cloning the repository..."
                    git url: "${REPO_URL}"
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo "Building the project..."
                    sh 'docker build -t ${DOCKER_IMAGE} .'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo "Running tests..."
                    sh 'docker run --rm ${DOCKER_IMAGE} npm test'
                }
            }
        }

        stage('Docker Login') {
            steps {
                script {
                    echo "Logging in to DockerHub..."
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    }
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    echo "Pushing the Docker image..."
                    sh 'docker push ${DOCKER_IMAGE}'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying the application..."
                    sh '''
                        docker stop gallery || true
                        docker rm gallery || true
                        docker run -d --name gallery -p 80:80 ${DOCKER_IMAGE}
                    '''
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    echo "Cleaning up old Docker images..."
                    sh 'docker image prune -f'
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
            slackSend channel: '#deployments', message: "Deployment Successful: ${currentBuild.fullDisplayName}"
        }
        failure {
            echo "Pipeline failed!"
            slackSend channel: '#deployments', message: "Deployment Failed: ${currentBuild.fullDisplayName}"
        }
    }
}
