pipeline {
    
    agent any

    tools {
        nodejs 'nodejs-22'
    }

    environment {
        SCANNER_HOME = tool 'sonarqube-scanner'
        SLACK_CHANNEL = "#todo-foliacotest"
    }
    
    stages {

        stage("Clean workspace"){
            steps {
                cleanWs()
            }
        }

        stage('Clone project') {
        
            steps {
                
                withCredentials([usernamePassword(usernameVariable:"USERNAME_GITHUB", passwordVariable:"PASSWORD_GITHUB", credentialsId:"GITHUB_CREDENTIALS")]){
                    sh "git clone https://${USERNAME_GITHUB}:${PASSWORD_GITHUB}@github.com/stevengodev/apirest-nest-with-cicd-in-jenkins.git"
                }

            }    

        }

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