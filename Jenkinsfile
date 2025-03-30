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
        //  stage('Deploy') {
        //    agent {
        //         docker {
        //             image 'node:22.14.0-alpine'
        //             reuseNode true
        //         }
        //     }
        //     steps {
        //         sh '''
        //         echo "Deploying to production server..."
        //         npm install netlify-cli
        //         node_modules/.bin/netlify --version
        //         echo "Deploying to Netlify... Site ID: $NETLIFY_SITE_ID"
        //         node_modules/.bin/netlify status
        //         node_modules/.bin/netlify deploy --prod --dir=build
        //         '''
        //     }
        // }
    }
}