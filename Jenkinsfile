@Library('Shared') _
pipeline{
    agent { label 'hunt'}
    
    stages{
        stage("hello"){
            steps{
                hello()
            }
        }
        stage("Code clone"){
            steps{
                sh "whoami"
                clone("https://github.com/sainathPatil09/PasswordManager.git","main")
            }
        }
        stage("Code Build"){
            steps{
                echo "Building the code"
                echo "Building Frontend Image"
                sh "docker build -t passopfrontend:latest frontend/"
                echo "Building Backend Image"
                sh "docker build -t passopbackend:latest backend/"
            }
        }
        stage("Push to DockerHub"){
            steps{
                echo "Pushing Images"
                withCredentials([usernamePassword(credentialsId: 'dockerHubCred', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                    sh "docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD"
                }
                echo "Tagging images.."
                sh "docker tag passopfrontend:latest wiings09/passopfrontend:latest"
                sh "docker tag passopbackend:latest wiings09/passopbackend:latest"
                sh "docker push wiings09/passopfrontend:latest"
                sh "docker push wiings09/passopbackend:latest"
                sh "docker images"
            }
        }
        stage("Deploy"){
            steps{
                echo "Deploying the application"
                sh "docker compose up -d --build"
            }
        }
        
    }
}