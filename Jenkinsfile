pipeline {
    
    agent any

    tools {
        nodejs 'nodejs-22'
    }

    environment {
        SCANNER_HOME = tool 'sonarqube-scanner'
        SLACK_CHANNEL = "#todo-foliacotest"
        DOCKERHUB_CREDENTIALS = credentials('TOKEN_DOCKER')
    }
    
    stages {

        stage("Install"){
            steps {
                slackSend(channel: "${SLACK_CHANNEL}", color: '#00ff37', message: "Install Started: ${env.JOB_NAME} ${env.BUILD_NUMBER}")
                echo "Install project"
                sh 'npm install'
            }
        }

        stage("Package"){
            steps {
                echo "Package project"
                sh 'npm run build'
            }
        }

        stage("SonarQube analysis"){
            steps {
                slackSend(channel: "${SLACK_CHANNEL}", color: '#00ff37', message: "Analysis Started: ${env.JOB_NAME} ${env.BUILD_NUMBER}")

                withSonarQubeEnv("sonarqube-server"){
                    sh """
                      ${SCANNER_HOME}/bin/sonar-scanner \
                      -Dsonar.projectKey=sonarqube-nest-project \
                      -Dsonar.sources=.
                    """
                }
            }
        }

        stage("Quality Gate"){
            steps {
                timeout(time: 1, unit: 'HOURS'){
                    script {
                        def qg = waitForQualityGate()

                        if (qg.status != 'OK') {
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
                        echo 'Quality Gate Passed'

                    }
                }
            }
        }

        // No funciona en este momento
        // stage("Docker Build and Push"){
        //     steps {
        //         script {
        //             withCredentials([usernamePassword(usernameVariable: "DOCKER_USER", passwordVariable: "DOCKER_PASSWORD", credentialsId: "TOKEN_DOCKER")]){
        //                 sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}"

        //                 def imageTag = "${DOCKER_USER}/product-user:${env.BUILD_NUMBER}"
        //                 sh "docker build -t ${imageTag} ."
        //                 sh "docker push ${imageTag}"

        //             }
                    
        //         }
        //     }
        // }
    
    }

    post {
        success {
            slackSend(channel: "#todo-foliacotest", color: '#00ff37', message: "Analysis succeeded: ${env.JOB_NAME} ${env.BUILD_NUMBER}")
        }
        failure {
            slackSend(channel: "#todo-foliacotest", color: '#FF0000', message: "Analysis failed: ${env.JOB_NAME} ${env.BUILD_NUMBER}")
        }
    }

}