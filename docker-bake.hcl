group "default" {
  targets = ["frontend", "user", "service"]
}

target "frontend" {
  context = "./Frontend"
  dockerfile = "Dockerfile"
  tags = ["sentiment-frontend:latest"]
}

target "user" {
  context = "./Backend/User"
  dockerfile = "Dockerfile"
  tags = ["sentiment-user:latest"]
}

target "service" {
  context = "./Backend/Service"
  dockerfile = "Dockerfile"
  tags = ["sentiment-service:latest"]
