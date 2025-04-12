pipeline {
    agent any
    environment {
        NODE_VERSION = '22.12.0'
        RENDER_DEPLOY_HOOK = 'https://api.render.com/deploy/srv-cvs09g2dbo4c73fqu540?key=BEvXN5DL3LE'
        RENDER_SITE_URL = "https://gallery-zce1.onrender.com/"
    }
    tools {
        nodejs "NodeJS 23.11.0"
    }
    stages {
        stage("cloning repo") {
            steps {
                git branch: "master", url: "https://github.com/Bella-oreo/gallery"
            }
        }
        stage("installing dependencies") {
            steps {
                echo 'installing dependencies'
                sh "npm install"
            }
        }
        stage("building") {
            steps {
                echo 'No build step needed for this project'
            }
        }
        stage("testing") {
            steps {
                echo 'testing'
                sh "npm test"
            }
            post {
                failure {
                    emailext(
                        subject: "Tests Failed #${env.BUILD_ID}",
                        body: "Tests Execution Failed ${env.BUILD_URL} ",
                        to: 'bella.ndirangu@student.moringaschool.com'
                    )
                }
            }
        }
        stage("deploy") {
            steps {
                script {
                    echo 'Triggering deployment on render'
                    sh "curl -X POST ${RENDER_DEPLOY_HOOK}" 
                }
            }
            post {
                success {
                    slackSend(
                        channel: '#week-2-ip-1',
                        message: """:white_check_mark: Deployment Successful!
                        Build ID: ${env.BUILD_ID}
                        Render Site URL: ${RENDER_SITE_URL}"""
                    )
                }
            }
        }
    }
}
