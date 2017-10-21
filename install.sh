#!/bin/bash

clear

yum update -y

yum install git -y

wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u141-b15/336fa29ff2bb4ef291e347e091f7f4a7/jdk-8u141-linux-x64.rpm

rpm -i jdk-8u144-linux-x64.rpm

java -version

export JAVA_HOME=/usr/java/default

wget http://www-us.apache.org/dist/maven/maven-3/3.5.0/binaries/apache-maven-3.5.0-bin.tar.gz

tar -xvzf apache-maven-3.5.0-bin.tar.gz

mkdir /usr/apache/
mv /tmp/apache-maven-3.5.0 /usr/apache/apache-maven-3.5.0
chown -R ec2-user:ec2-user /usr/apache/apache-maven-3.5.0

cd /tmp/
git clone https://github.com/joao-emilio/aws-elb-tutorial-java-spring-boot-rest-api.git

chown -R ec2-user:ec2-user /tmp/aws-elb-tutorial-java-spring-boot-rest-api

echo ""
echo "******************************************"
echo "run these commands now or include them on you .bash_profile"
echo "******************************************"
echo ""
echo "export M2_HOME=/usr/apache/apache-maven-3.5.0"
echo "export JAVA_HOME=/usr/java/jdk1.8.0_144/"
echo "export PATH=$PATH:\$M2_HOME/bin"
echo "mvn -version | git --version | java -version"
echo "cd aws-elb-tutorial-java-spring-boot-rest-api;mvn package"
echo "java -jar target/pessoa-1.0.0.jar"
