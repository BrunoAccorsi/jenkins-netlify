pipeline {
    agent any
    environment {
        NETLIFY_SITE_ID = '9698b1bd-63a6-4f69-a2b2-3356f8b00b03'
        NETLIFY_AUTH_TOKEN = credentials('jenkins-app')
    }
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:22.14.0-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                ls -la
                node --version
                npm --version
                npm install
                npm run build
                ls -la
                '''
            }
        }
        stage('Test') {
            agent {
                docker {
                    image 'node:22.14.0-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                test -f build/index.html
                npm test
                '''
            }
        }
        stage('Deploy to AWS') {
           agent {
                docker {
                    image 'amazon/aws-cli'
                    reuseNode true
                    args '-u root -v /var/run/docker.sock:/var/run/docker.sock --entrypoint=""'
                }
            }
            environment {
                AWS_S3_BUCKET = 'temp-03-29-2025'
            }
            steps{
                withCredentials([usernamePassword(credentialsId: 'AWS-s3-user', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
                sh '''
                   aws --version
                   aws s3 sync build s3://$AWS_S3_BUCKET
                '''
                }
            }
        }
    }
}