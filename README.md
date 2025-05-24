# Password Manager - Multi-Stage Docker Deployment

This project uses a multi-stage Docker deployment with NGINX as a reverse proxy and includes multiple services: **frontend**, **backend**, and **MongoDB**.

## Deployment Steps on AWS EC2

### 1. Launch an EC2 Instance
- Go to the AWS Management Console.
- Launch a new EC2 instance (Ubuntu recommended).
- Configure security group to allow ports `22` (SSH), `80` (HTTP), and `443` (HTTPS).

### 2. Connect to Your EC2 Instance
```sh
ssh -i your-key.pem ubuntu@your-ec2-public-dns
```

### 3. Install Docker and Docker Compose
```sh
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
```

### 4. Clone the Project Repository
```sh
git clone https://github.com/your-username/passOpMongo.git
cd passOpMongo
```

### 5. Run Docker Compose
```sh
sudo docker-compose up -d
```

### 6. Access the Application
- Open your browser and navigate to `http://<your-ec2-public-dns>/`

## Project Structure

```
passOpMongo/
├── frontend/
├── backend/
├── docker-compose.yml
└── README.md
```

## Notes

- NGINX handles routing between frontend and backend.
- MongoDB is used as the database service.
- Make sure your security group allows necessary ports.

---

**Enjoy your password manager deployment!**